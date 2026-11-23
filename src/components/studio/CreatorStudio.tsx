import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Save, 
  Sparkles, 
  Image as ImageIcon, 
  Code2, 
  FileCheck, 
  Tags, 
  Layers,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Post, StepItem, TechCategory } from '../../types';
import { CATEGORIES_LIST, CREATORS } from '../../data/mockData';
import { useStore } from '../../lib/store';

interface CreatorStudioProps {
  onClose: () => void;
  onPublished?: (post: Post) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({ onClose, onPublished }) => {
  const { publishPost, saveDraft, activeDraft } = useStore();

  // Story Metadata
  const [title, setTitle] = useState(activeDraft?.title || '');
  const [summary, setSummary] = useState(activeDraft?.summary || '');
  const [category, setCategory] = useState<TechCategory>(
    activeDraft?.category || 'System Design'
  );
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(
    activeDraft?.tags || ['Architecture', 'Distributed Systems']
  );
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(
    activeDraft?.difficulty || 'Intermediate'
  );
  const [coverImage, setCoverImage] = useState(
    activeDraft?.coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  );

  // Steps Sequence
  const [steps, setSteps] = useState<StepItem[]>(
    activeDraft?.steps && activeDraft.steps.length > 0
      ? activeDraft.steps
      : [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'High-Level Architecture & Problem Statement',
            explanation: 'Begin with the core problem: How does the system handle horizontal scaling under peak throughput while maintaining sub-50ms p99 latency?',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
            codeSnippet: `// API Gateway Ingress Routing rule
app.use('/v2/*', loadBalancer.distributeTraffic());`,
            codeLanguage: 'typescript',
            keyTakeaway: 'Decouple ingestion from processing using asynchronous backpressure queues.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'The Data Ingestion & Stream Processing Pipeline',
            explanation: 'Incoming events pass through partitioned message logs where distributed consumer groups process messages idempotently.',
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
            codeSnippet: `const consumer = kafka.consumer({ groupId: 'order-processors' });
await consumer.run({ eachMessage: async ({ message }) => processEvent(message) });`,
            codeLanguage: 'typescript',
            keyTakeaway: 'Partition keys ensure strict ordering per entity without global locks.',
          }
        ]
  );

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const currentStep = steps[activeStepIdx] || steps[0];

  // Step editing handlers
  const updateCurrentStep = (updates: Partial<StepItem>) => {
    setSteps((prev) =>
      prev.map((step, idx) => (idx === activeStepIdx ? { ...step, ...updates } : step))
    );
  };

  const handleAddStep = () => {
    const nextNumber = steps.length + 1;
    const newStep: StepItem = {
      id: `step-${Date.now()}`,
      stepNumber: nextNumber,
      title: `Step ${nextNumber}: New Visual Phase`,
      explanation: 'Describe what this diagram illustrates and why this step matters.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      keyTakeaway: '',
    };
    setSteps([...steps, newStep]);
    setActiveStepIdx(steps.length);
  };

  const handleDeleteStep = (idx: number) => {
    if (steps.length <= 1) return;
    const filtered = steps.filter((_, i) => i !== idx);
    const reindexed = filtered.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setSteps(reindexed);
    setActiveStepIdx((prev) => Math.min(prev, reindexed.length - 1));
  };

  const handleMoveStep = (idx: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === steps.length - 1)) {
      return;
    }
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const copy = [...steps];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    const reindexed = copy.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setSteps(reindexed);
    setActiveStepIdx(targetIdx);
  };

  // Tag handlers
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^#/, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((x) => x !== t));
  };

  // Image Upload handler (supports real file reading)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'step' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === 'step') {
        updateCurrentStep({ imageUrl: dataUrl });
      } else {
        setCoverImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Draft
  const handleSaveDraft = () => {
    saveDraft({
      title: title || 'Untitled Visual Lesson',
      summary,
      category,
      tags,
      difficulty,
      coverImage,
      steps,
    });
    setStatusMessage('Draft saved locally!');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Publish
  const handlePublish = () => {
    if (!title.trim()) {
      setStatusMessage('Please enter a lesson title.');
      return;
    }

    setIsPublishing(true);

    setTimeout(() => {
      const published = publishPost({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary: summary || 'Visual exploration of complex technical concepts.',
        coverImage,
        category,
        tags,
        difficulty,
        readTimeMinutes: Math.max(3, steps.length * 2),
        creator: CREATORS.alex,
        stepsCount: steps.length,
        steps,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C5CFC', '#20D9E8', '#B5F36A', '#FF8C66'],
      });

      setIsPublishing(false);
      onPublished?.(published);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1020] flex flex-col text-content-primary overflow-hidden">
      {/* Studio Header Bar */}
      <header className="px-4 py-3 sm:px-6 bg-surface-card/90 border-b border-border flex items-center justify-between backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-surface-elevated hover:bg-brand/20 border border-border text-content-secondary hover:text-content-primary transition-all"
            title="Close studio"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm sm:text-base text-content-primary">
                NEXORA Creator Studio
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-electric/15 border border-cyan-electric/30 text-cyan-electric font-mono text-[10px]">
                VISUAL STORYTELLER
              </span>
            </div>
            <p className="text-[11px] font-mono text-content-secondary hidden sm:block">
              Transform difficult engineering concepts into structured visual learning experiences
            </p>
          </div>
        </div>

        {/* Top Actions: Preview Toggle, Save Draft, Publish */}
        <div className="flex items-center gap-2 sm:gap-3">
          {statusMessage && (
            <span className="text-xs font-mono text-accent-lime animate-pulse hidden md:inline">
              {statusMessage}
            </span>
          )}

          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
              isPreviewMode
                ? 'bg-cyan-electric/20 border-cyan-electric text-cyan-electric'
                : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-card border border-border text-xs font-mono text-content-secondary hover:text-content-primary transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand via-brand-light to-cyan-electric hover:shadow-glow-brand text-content-primary text-xs font-heading font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Knowledge'}</span>
          </button>
        </div>
      </header>

      {/* Main Studio 3-Column Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Visual Step Sequence Timeline */}
        <aside className="w-full lg:w-64 xl:w-72 bg-surface-card border-b lg:border-b-0 lg:border-r border-border flex flex-col max-h-48 lg:max-h-full">
          <div className="p-3.5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-electric" />
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-content-primary">
                Steps Timeline ({steps.length})
              </span>
            </div>
            <button
              onClick={handleAddStep}
              className="p-1 rounded bg-brand/20 hover:bg-brand border border-brand/40 text-cyan-electric hover:text-content-primary text-xs flex items-center gap-1 px-2 font-mono transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

          {/* Sequence List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                  activeStepIdx === idx
                    ? 'bg-brand/20 border-brand shadow-glow-brand'
                    : 'bg-surface-elevated/70 border-border hover:border-brand/40 hover:bg-surface-elevated'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                    activeStepIdx === idx ? 'bg-cyan-electric text-background' : 'bg-surface-card text-content-secondary'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="font-heading font-medium text-xs text-content-primary truncate">
                      {step.title}
                    </p>
                    <span className="font-mono text-[10px] text-content-secondary">
                      {step.codeSnippet ? 'Includes code snippet' : 'Diagram visual'}
                    </span>
                  </div>
                </div>

                {/* Move & Delete Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveStep(idx, 'up');
                    }}
                    disabled={idx === 0}
                    className="p-1 hover:text-cyan-electric disabled:opacity-20"
                    title="Move up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveStep(idx, 'down');
                    }}
                    disabled={idx === steps.length - 1}
                    className="p-1 hover:text-cyan-electric disabled:opacity-20"
                    title="Move down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  {steps.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStep(idx);
                      }}
                      className="p-1 hover:text-accent-coral"
                      title="Delete step"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Column: Step Canvas & Narrative Editor */}
        <main className="flex-1 bg-[#070B16] flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Active Step Canvas / Diagram Preview */}
          <div className="rounded-2xl border border-border bg-surface-card p-5 sm:p-6 relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-electric animate-pulse" />
                <span className="font-mono text-xs text-cyan-electric font-semibold">
                  STEP {activeStepIdx + 1} VISUAL DIAGRAM
                </span>
              </div>

              {/* Upload image for step */}
              <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-brand/20 border border-border hover:border-brand text-xs font-mono text-content-secondary hover:text-content-primary flex items-center gap-1.5 transition-all">
                <Upload className="w-3.5 h-3.5 text-cyan-electric" />
                <span>Upload Custom Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'step')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Visual Display Box */}
            <div className="w-full aspect-[16/9] max-h-[380px] rounded-xl overflow-hidden bg-[#090D1A] border border-border/80 flex items-center justify-center relative p-3">
              {currentStep.imageUrl ? (
                <img src={currentStep.imageUrl} alt={currentStep.title} className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="text-xs font-mono text-content-secondary">
                  No image uploaded yet
                </div>
              )}
              
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/80 border border-border text-[11px] font-mono text-content-primary">
                {currentStep.imageUrl ? `Step ${activeStepIdx + 1} Image` : `Upload diagram for ${category}`}
              </div>
            </div>
          </div>

          {/* Step Narrative Input Form */}
          <div className="rounded-2xl border border-border bg-surface-card p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
                Step Title
              </label>
              <input
                type="text"
                value={currentStep.title}
                onChange={(e) => updateCurrentStep({ title: e.target.value })}
                placeholder="e.g. Memory Layout & Page Table Translation"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-content-primary focus:outline-none focus:border-cyan-electric font-heading font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
                Technical Explanation & Breakdown
              </label>
              <textarea
                rows={4}
                value={currentStep.explanation}
                onChange={(e) => updateCurrentStep({ explanation: e.target.value })}
                placeholder="Explain the mechanism clearly. What does the diagram show? What happens under the hood?"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-content-primary focus:outline-none focus:border-cyan-electric font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-accent-lime uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Key Architectural Takeaway</span>
              </label>
              <input
                type="text"
                value={currentStep.keyTakeaway || ''}
                onChange={(e) => updateCurrentStep({ keyTakeaway: e.target.value })}
                placeholder="e.g. Namespaces isolate visibility; cgroups enforce resource quotas."
                className="w-full px-4 py-2 rounded-xl bg-surface-elevated border border-accent-lime/30 text-xs text-content-primary focus:outline-none focus:border-accent-lime"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-electric" />
                <span>Optional Code / Terminal Snippet</span>
              </label>
              <textarea
                rows={3}
                value={currentStep.codeSnippet || ''}
                onChange={(e) => updateCurrentStep({ codeSnippet: e.target.value })}
                placeholder="docker run -d --memory='512m' nginx"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1020] border border-border text-xs font-mono text-cyan-glow focus:outline-none focus:border-cyan-electric"
              />
            </div>
          </div>
        </main>

        {/* Right Column: Publishing Meta & Category Settings */}
        <aside className="w-full lg:w-80 xl:w-88 bg-surface-card border-t lg:border-t-0 lg:border-l border-border p-5 sm:p-6 overflow-y-auto space-y-6">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-brand-light" />
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-content-primary">
              Lesson Metadata
            </h3>
          </div>

          {/* Lesson Title */}
          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
              Lesson Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How Kubernetes Ingress Actually Works"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-content-primary focus:outline-none focus:border-brand font-heading font-semibold"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
              Hook / Short Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A concise, compelling overview of the visual story."
              className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-brand font-sans"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TechCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-brand font-mono"
            >
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat.name} value={cat.name} className="bg-surface-elevated text-content-primary">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`py-1.5 rounded-lg border text-xs font-mono transition-all ${
                    difficulty === lvl
                      ? 'bg-brand/20 border-brand text-cyan-electric font-semibold'
                      : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
              Tags (Press Enter)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-[11px] font-mono text-cyan-electric flex items-center gap-1"
                >
                  #{t}
                  <button onClick={() => handleRemoveTag(t)} className="hover:text-accent-coral">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tag and press Enter..."
              className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-brand font-mono"
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase tracking-wider mb-1.5">
              Cover Image URL or File
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary font-mono truncate"
              />
              <label className="cursor-pointer p-2 rounded-xl bg-surface-elevated hover:bg-brand/20 border border-border hover:border-brand flex items-center justify-center shrink-0">
                <Upload className="w-4 h-4 text-cyan-electric" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'cover')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
