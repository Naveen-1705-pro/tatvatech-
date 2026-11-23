import React, { useState } from 'react';
import { 
  MessageSquarePlus, 
  X, 
  Star, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore, OWNER_EMAIL } from '../../lib/store';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen, addFeedback } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'general' | 'topic_request' | 'clarification' | 'appreciation'>('topic_request');
  const [targetPostTitle, setTargetPostTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lastMailtoUrl, setLastMailtoUrl] = useState('');

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // 1. Record feedback in platform store
    addFeedback({
      name: name.trim() || 'Curious Visitor',
      email: email.trim(),
      type,
      targetPostTitle: targetPostTitle.trim() || undefined,
      message: message.trim(),
      rating,
    });

    // 2. Build direct email dispatch to suman0383solanki@gmail.com
    const subject = `[TatvaTech Feedback] ${type.toUpperCase()}: ${targetPostTitle || 'Visitor Suggestion'}`;
    const body = `Hi Naveen,\n\nA new feedback message was submitted on your TatvaTech platform:\n\n• From: ${name.trim() || 'Curious Visitor'}\n• Reply Email: ${email.trim() || 'Not provided'}\n• Category: ${type}\n• Topic / Concept: ${targetPostTitle.trim() || 'General'}\n• Visual Clarity Rating: ${rating}/5 Stars\n\n--- Message ---\n${message.trim()}\n\n---\nPlatform Destination: ${OWNER_EMAIL}\nSent via TatvaTech Visual Knowledge Platform`;

    const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setLastMailtoUrl(mailto);

    // Try to trigger email client automatically
    try {
      const link = document.createElement('a');
      link.href = mailto;
      link.target = '_blank';
      link.rel = 'noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {}

    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OWNER_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setIsFeedbackModalOpen(false);
    setMessage('');
    setTargetPostTitle('');
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full bg-surface-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-electric/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-brand/15 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-surface-elevated text-content-secondary hover:text-content-primary transition-colors z-10"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* =========================================================================
             SUCCESS STATE: CONFIRMATION & DIRECT DISPATCH TO AUTHOR
             ========================================================================= */
          <div className="py-6 text-center space-y-5 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-accent-lime/15 border border-accent-lime/40 mx-auto flex items-center justify-center text-accent-lime shadow-[0_0_30px_rgba(181,243,106,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-2xl text-content-primary">
                Feedback Dispatched!
              </h3>
              <p className="font-sans text-xs text-content-secondary max-w-sm mx-auto leading-relaxed">
                Your message has been recorded and addressed directly to Naveen Solanki.
              </p>
            </div>

            {/* Direct Delivery Receipt */}
            <div className="p-4 rounded-2xl bg-surface-elevated border border-border text-left font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="text-content-muted flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-electric" />
                  <span>Author Destination:</span>
                </span>
                <span className="text-cyan-electric font-bold truncate max-w-[200px]">
                  {OWNER_EMAIL}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div>
                  <span className="text-content-muted block">Category:</span>
                  <span className="text-content-primary font-semibold uppercase">{type.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-content-muted block">Clarity Rating:</span>
                  <span className="text-accent-lime font-bold">{rating}/5 Stars</span>
                </div>
              </div>

              {targetPostTitle && (
                <div className="pt-1 text-[11px]">
                  <span className="text-content-muted block">Target Topic:</span>
                  <span className="text-content-primary truncate block">{targetPostTitle}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={lastMailtoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand to-cyan-electric hover:opacity-95 text-background font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-glow-brand transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Copy via Email App</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="py-2.5 px-4 rounded-xl bg-surface-elevated hover:bg-surface-card border border-border text-xs font-mono text-content-primary flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-accent-lime" /> : <Copy className="w-3.5 h-3.5 text-cyan-electric" />}
                <span>{copiedEmail ? 'Copied Email' : 'Copy Email ID'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="text-xs font-mono text-content-muted hover:text-content-primary transition-colors block mx-auto pt-2"
            >
              Done & Return to Platform
            </button>
          </div>
        ) : (
          /* =========================================================================
             FEEDBACK INPUT FORM
             ========================================================================= */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-electric/20 border border-cyan-electric/40 flex items-center justify-center text-cyan-electric shrink-0 shadow-[0_0_15px_rgba(32,217,232,0.25)]">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-extrabold text-xl text-content-primary leading-tight">
                  Leave Feedback or Request a Topic
                </h3>
                <p className="font-mono text-xs text-content-secondary mt-0.5">
                  Direct line to Platform Author Naveen Solanki
                </p>
              </div>
            </div>

            {/* Author Destination Banner */}
            <div className="p-3 rounded-2xl bg-surface-elevated/90 border border-cyan-electric/30 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse shrink-0" />
                <span className="text-content-secondary text-[11px] truncate">
                  Sending to Author ID: <strong className="text-cyan-electric">{OWNER_EMAIL}</strong>
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-accent-lime/15 text-accent-lime border border-accent-lime/30 font-bold shrink-0">
                ACTIVE
              </span>
            </div>

            {/* Type selector */}
            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1.5">
                Feedback Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-mono">
                {[
                  { id: 'topic_request', label: 'Topic Request' },
                  { id: 'clarification', label: 'Clarification' },
                  { id: 'appreciation', label: 'Appreciation' },
                  { id: 'general', label: 'General' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id as any)}
                    className={`py-1.5 px-2 rounded-xl border text-center transition-all ${
                      type === item.id
                        ? 'bg-brand/20 border-cyan-electric text-cyan-electric font-semibold shadow-[0_0_10px_rgba(32,217,232,0.2)]'
                        : 'bg-surface-elevated border-border text-content-secondary hover:text-content-primary hover:border-border/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic suggestion input */}
            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                {type === 'topic_request' ? 'Concept / Architecture You Want Visualized' : 'Relevant Topic / Lesson'}
              </label>
              <input
                type="text"
                value={targetPostTitle}
                onChange={(e) => setTargetPostTitle(e.target.value)}
                placeholder="e.g. Raft Consensus vs Paxos, Kubernetes CNI, or GraphQL vs REST"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric font-mono transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                Your Note or Feedback *
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what worked, what you'd love to see explained visually, or any architectural questions..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric font-sans leading-relaxed transition-colors"
                required
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                Visual Explanation Clarity Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    title={`${star} Star`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'fill-accent-lime text-accent-lime'
                          : 'text-content-muted'
                      }`}
                    />
                  </button>
                ))}
                <span className="font-mono text-xs text-cyan-electric ml-2 font-semibold">
                  {rating === 5 ? 'Exceptional Clarity (5/5)' : `${rating}/5 Stars`}
                </span>
              </div>
            </div>

            {/* Optional Name / Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono text-content-muted mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya"
                  className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-content-muted mb-1">
                  Your Email (Optional for replies)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-xl bg-surface-elevated text-xs font-mono text-content-secondary hover:text-content-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand to-cyan-electric hover:opacity-95 text-background text-xs font-heading font-bold flex items-center gap-1.5 shadow-glow-brand transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Author ({OWNER_EMAIL})</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
