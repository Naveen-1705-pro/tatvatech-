import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin,
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Layers, 
  Network, 
  Database, 
  Container, 
  Code2, 
  ArrowRight, 
  Compass, 
  Eye, 
  ShieldCheck, 
  Award, 
  Send,
  Heart,
  Briefcase,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  FileText,
  Binary,
  Flame,
  Globe,
  Bot
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Post } from '../../types';
import { AnimatedAuthorAvatar } from './AnimatedAuthorAvatar';

interface AuthorProfilePageProps {
  onOpenPost: (post: Post) => void;
  onExploreFeed: () => void;
}

export const AuthorProfilePage: React.FC<AuthorProfilePageProps> = ({ onOpenPost, onExploreFeed }) => {
  const { posts, setIsFeedbackModalOpen } = useStore();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<'all' | 'ai' | 'web'>('all');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Verified Resume Details
  const authorName = "Naveen Solanki";
  const authorLocation = "Greater Noida, India";
  const emailAddress = "suman0383solanki@gmail.com";
  const githubUrl = "https://github.com/Naveen-1705-pro";
  const linkedinUrl = "https://www.linkedin.com/in/naveen-solanki-6a6434301?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const instagramUrl = "https://www.instagram.com/self_loop_naveen/";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Interactive Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#20D9E8' : '#7C5CFC',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(32, 217, 232, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Resume Projects
  const resumeProjects = [
    {
      id: 'proj-tatvatech',
      title: 'TatvaTech — Visual Knowledge Platform',
      category: 'web',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      desc: 'Architected and built the visual knowledge ecosystem featuring 52+ authentic architecture diagrams, interactive 3D particle universes, step-by-step visual breakdowns, and reader interaction systems.',
      highlight: 'Featured Platform • 52+ Curated Blueprints',
      color: '#20D9E8',
      link: '#',
      isLive: true
    },
    {
      id: 'proj-ai-resume',
      title: 'AI Resume Analyzer',
      category: 'ai',
      tech: ['Generative AI', 'React.js', 'REST APIs', 'Claude AI'],
      desc: 'Built an AI-powered resume analysis platform for automated ATS scoring, keyword extraction, and job description matching with actionable personalized feedback to enhance application relevance.',
      highlight: 'Generative AI & ATS Engine',
      color: '#7C5CFC',
      link: 'https://github.com/Naveen-1705-pro',
      isLive: false
    },
    {
      id: 'proj-student-os',
      title: 'Student OS Platform',
      category: 'web',
      tech: ['React.js', 'JavaScript', 'Vercel', 'Tailwind CSS'],
      desc: 'Developed a productivity-focused platform engineered for student workflows: task management, visual scheduling, and structured note tracking with responsive design deployed live on Vercel.',
      highlight: 'Deployed Live on Vercel',
      color: '#B5F36A',
      link: 'https://github.com/Naveen-1705-pro',
      isLive: true
    },
    {
      id: 'proj-healthcare',
      title: 'Healthcare Assistance Platform',
      category: 'web',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'UI Architecture'],
      desc: 'Developed a symptom-based healthcare assistance application providing structured medical guidance, emergency triage recommendations, and accessible patient navigation.',
      highlight: 'Accessible Medical UI',
      color: '#FF6B6B',
      link: 'https://github.com/Naveen-1705-pro',
      isLive: false
    },
    {
      id: 'proj-weather',
      title: 'Real-Time Weather Web Application',
      category: 'web',
      tech: ['JavaScript', 'REST APIs', 'Asynchronous Async/Await'],
      desc: 'Built a real-time weather monitoring application using asynchronous REST API integrations, dynamic location-based search, atmospheric condition forecasting, and clean responsive layout.',
      highlight: 'Async REST Pipeline',
      color: '#38BDF8',
      link: 'https://github.com/Naveen-1705-pro',
      isLive: false
    }
  ];

  // Certifications & Industry Simulations from Resume
  const certifications = [
    {
      issuer: 'Google / Kaggle',
      title: '5-Day AI Agents Intensive Vibe Coding Course',
      date: 'Dec 2025',
      badge: 'Generative AI & Agents',
      color: '#20D9E8'
    },
    {
      issuer: 'JPMorganChase',
      title: 'Software Engineering Job Simulation',
      date: 'May 2026',
      badge: 'Forage ID: GWknZS8a3sknwtchv',
      color: '#7C5CFC'
    },
    {
      issuer: 'Deloitte Australia',
      title: 'Data Analytics Job Simulation',
      date: 'Jun 2026',
      badge: 'Forage ID: qLu2aRnnQ8rJSZvLD',
      color: '#B5F36A'
    },
    {
      issuer: 'Accenture / FutureLearn',
      title: 'Digital Skills: Artificial Intelligence',
      date: 'May 2026',
      badge: 'Score: 88%',
      color: '#E879F9'
    },
    {
      issuer: 'Tata',
      title: 'Cybersecurity Analyst Job Simulation',
      date: 'Mar 2025',
      badge: 'Forage ID: PPCcjQGoEhtBnCxne',
      color: '#FF6B6B'
    },
    {
      issuer: 'HP LIFE',
      title: 'AI Beginners Course',
      date: 'Apr 2025',
      badge: 'AI Fundamentals',
      color: '#38BDF8'
    },
    {
      issuer: 'Skill Nation & be10x',
      title: 'Claude AI Workshop & 10x Productivity Tools',
      date: 'May 2024',
      badge: 'Prompt Engineering',
      color: '#FBBF24'
    },
    {
      issuer: 'iStudio',
      title: 'Website Design & Development Internship Certificate',
      date: 'Dec 2025',
      badge: 'Verified Internship',
      color: '#20D9E8'
    }
  ];

  // Technical Skills Matrix from Resume
  const skillGroups = [
    {
      title: 'Programming Languages',
      icon: Code2,
      color: '#20D9E8',
      skills: ['C++', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SQL']
    },
    {
      title: 'Frameworks & Frontend',
      icon: Layers,
      color: '#7C5CFC',
      skills: ['React.js', 'REST APIs', 'Tailwind CSS', 'Framer Motion', 'Component Architecture']
    },
    {
      title: 'AI & Data Analytics',
      icon: Bot,
      color: '#B5F36A',
      skills: ['Generative AI', 'Claude AI', 'AI Agents (Vibe Coding)', 'Prompt Engineering', 'Data Analytics']
    },
    {
      title: 'Developer Tools',
      icon: Terminal,
      color: '#FF6B6B',
      skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Google Developer Ecosystem', 'Microsoft Excel']
    },
    {
      title: 'Core Computer Science',
      icon: Binary,
      color: '#38BDF8',
      skills: ['Data Structures & Algorithms', 'OOP (Object-Oriented Programming)', 'Software Engineering', 'System Architecture']
    }
  ];

  const filteredProjects = resumeProjects.filter((p) => {
    if (activeProjectTab === 'all') return true;
    return p.category === activeProjectTab;
  });

  return (
    <div className="relative min-h-screen text-content-primary overflow-hidden selection:bg-brand/40 selection:text-cyan-electric">
      {/* =========================================================================
          HERO SECTION: Holographic Presentation with Particle Canvas
         ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 overflow-hidden">
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
        />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand/20 rounded-full blur-[110px] pointer-events-none -z-0" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-electric/20 rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Author Narrative & Professional Profile */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-card/90 backdrop-blur-md border border-cyan-electric/40 text-cyan-electric font-mono text-xs font-semibold shadow-[0_0_20px_rgba(32,217,232,0.25)]"
            >
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-ping" />
              <span>CANDIDATE // COMPUTER SCIENCE UNDERGRADUATE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08]">
                {authorName}
              </h1>
              <p className="font-mono text-sm sm:text-base text-cyan-electric font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-coral shrink-0" />
                <span>{authorLocation}</span>
                <span className="text-content-muted">•</span>
                <span className="text-accent-lime font-bold">600+ DSA Problems Solved</span>
              </p>
            </motion.div>

            {/* Professional Summary from Resume */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-content-secondary text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Computer Science undergraduate with strong foundations in Software Engineering, Generative AI, and Data Analytics. Active problem solver skilled in building end-to-end web applications, AI agent prototypes, and full-stack solutions with real-world internship and simulation experience at Google, Deloitte, JPMorganChase, Accenture, and Tata.
            </motion.p>

            {/* Social & Contact Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs"
            >
              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-surface-card hover:bg-cyan-electric hover:text-black border border-border hover:border-cyan-electric text-content-primary font-semibold transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(32,217,232,0.4)]"
              >
                <Linkedin className="w-4 h-4 text-cyan-electric group-hover:text-black transition-colors" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-surface-card hover:bg-brand-light hover:text-white border border-border hover:border-brand text-content-primary font-semibold transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(124,92,252,0.4)]"
              >
                <Github className="w-4 h-4 text-brand-light group-hover:text-white transition-colors" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-surface-card hover:bg-accent-coral hover:text-white border border-border hover:border-accent-coral text-content-primary font-semibold transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(255,107,107,0.4)]"
              >
                <Instagram className="w-4 h-4 text-accent-coral group-hover:text-white transition-colors" />
                <span>Instagram</span>
              </a>

              {/* Email Copy */}
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border hover:border-accent-lime text-content-primary font-semibold transition-all flex items-center gap-2 group shadow-sm"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-accent-lime" />
                    <span className="text-accent-lime font-bold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-accent-lime group-hover:scale-110 transition-transform" />
                    <span>{emailAddress}</span>
                    <Copy className="w-3 h-3 text-content-muted" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Holographic Cybernetic Animated Avatar Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <AnimatedAuthorAvatar size="hero" showControls={true} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY NUMBERS / RESUME METRICS (Animated Grid)
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-y border-border/60 bg-surface-card/40 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { metric: '600+', label: 'Algorithmic Problems Solved', desc: 'Arrays, DP, Trees, Graphs, Strings', color: 'text-amber-400' },
            { metric: '100+', label: 'GeeksforGeeks Solved', desc: 'Core algorithmic problem solving', color: 'text-accent-lime' },
            { metric: '52+', label: 'Curated Diagrams on TatvaTech', desc: 'OS, System Design, DevOps, DBMS', color: 'text-cyan-electric' },
            { metric: '8+', label: 'Certifications & Simulations', desc: 'Google, JPMorganChase, Deloitte, Accenture', color: 'text-brand-light' },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-2xl bg-surface-card border border-border hover:border-cyan-electric/40 transition-colors"
            >
              <div className={`font-heading font-black text-3xl sm:text-4xl ${item.color} tracking-tight`}>
                {item.metric}
              </div>
              <div className="font-heading font-bold text-sm text-content-primary mt-1">
                {item.label}
              </div>
              <div className="font-sans text-xs text-content-muted mt-1 leading-relaxed">
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          EDUCATION & INTERNSHIP EXPERIENCE TIMELINE
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 border border-brand/50 text-cyan-electric text-xs font-mono font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span>ACADEMIC & PROFESSIONAL JOURNEY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-content-primary tracking-tight">
            Education & Real-World Experience
          </h2>
          <p className="font-sans text-content-secondary text-sm sm:text-base leading-relaxed">
            Hands-on software development internship paired with strong computer science engineering academics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Card */}
          <div className="rounded-3xl bg-surface-card border border-border p-7 space-y-5 hover:border-cyan-electric/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-electric/15 border border-cyan-electric/40 flex items-center justify-center text-cyan-electric">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-elevated text-xs font-mono text-cyan-electric border border-border">
                Aug 2024 – Present
              </span>
            </div>

            <div>
              <span className="font-mono text-xs text-accent-lime font-semibold uppercase tracking-wider">
                Undergraduate Degree
              </span>
              <h3 className="font-heading font-bold text-2xl text-content-primary mt-1">
                GL Bajaj Institute of Technology and Management
              </h3>
              <p className="font-mono text-sm text-cyan-electric mt-1">
                Bachelor of Technology in Computer Science Engineering
              </p>
              <p className="font-sans text-xs text-content-muted mt-0.5">
                Greater Noida, India
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-2 text-xs font-sans text-content-secondary">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Best Achiever Award</strong> recipient for outstanding academic performance and commitment.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                <span>Rigorous study across Data Structures, Algorithms, Operating Systems, Database Systems, and AI.</span>
              </div>
            </div>
          </div>

          {/* Internship Experience Card */}
          <div className="rounded-3xl bg-surface-card border border-border p-7 space-y-5 hover:border-accent-lime/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-accent-lime/15 border border-accent-lime/40 flex items-center justify-center text-accent-lime">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-elevated text-xs font-mono text-accent-lime border border-border">
                Aug 2025 – Dec 2025
              </span>
            </div>

            <div>
              <span className="font-mono text-xs text-cyan-electric font-semibold uppercase tracking-wider">
                Software Internship (Remote)
              </span>
              <h3 className="font-heading font-bold text-2xl text-content-primary mt-1">
                Website Design and Development Intern
              </h3>
              <p className="font-mono text-sm text-accent-lime mt-1">
                iStudio
              </p>
              <p className="font-sans text-xs text-content-muted mt-0.5">
                Remote Software Engineering
              </p>
            </div>

            <ul className="pt-4 border-t border-border space-y-2 text-xs font-sans text-content-secondary">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-electric shrink-0 mt-0.5" />
                <span>Engineered responsive web interfaces using modern frontend technologies and component architectures.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-electric shrink-0 mt-0.5" />
                <span>Collaborated on improving UI/UX responsiveness and optimizing website performance for lower latency.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-electric shrink-0 mt-0.5" />
                <span>Built reusable frontend components, assisted in testing, debugging, and code maintenance workflows.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-electric shrink-0 mt-0.5" />
                <span>Hands-on experience in real-world software workflows and Git-based team collaboration.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROJECTS SHOWCASE (From Resume)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/15 border border-cyan-electric/40 text-cyan-electric text-xs font-mono font-medium mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PROJECT PORTFOLIO</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-content-primary tracking-tight">
              Featured Software & AI Projects
            </h2>
            <p className="font-sans text-content-secondary text-sm sm:text-base mt-1.5 max-w-xl">
              End-to-end full-stack applications, Generative AI tools, and production platforms built by Naveen.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-card border border-border text-xs font-mono shrink-0">
            {(['all', 'ai', 'web'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg transition-all capitalize ${
                  activeProjectTab === tab
                    ? 'bg-brand text-content-primary font-bold shadow-glow-brand'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
                }`}
              >
                {tab === 'all' ? 'All Projects' : tab === 'ai' ? 'AI & GenAI' : 'Full-Stack Web'}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-surface-card border border-border hover:border-cyan-electric/70 p-6 sm:p-7 flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(32,217,232,0.18)] hover:-translate-y-1.5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}40` }}
                  >
                    {proj.highlight}
                  </span>
                  {proj.isLive && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-accent-lime font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-ping" />
                      LIVE
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-content-primary group-hover:text-cyan-electric transition-colors">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-content-secondary mt-2.5 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-surface-elevated text-[10px] font-mono text-cyan-electric border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-content-secondary hover:text-cyan-electric transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source on GitHub</span>
                </a>

                {proj.id === 'proj-nexora' ? (
                  <button
                    onClick={onExploreFeed}
                    className="text-cyan-electric font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse Feed</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-electric font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TECHNICAL SKILLS MATRIX (From Resume)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-lime/15 border border-accent-lime/40 text-accent-lime text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-content-primary tracking-tight">
            Technical Skills & Tooling
          </h2>
          <p className="font-sans text-content-secondary text-sm sm:text-base leading-relaxed">
            Languages, frameworks, AI agents, and developer environments Naveen builds with daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="rounded-3xl bg-surface-card border border-border p-6 space-y-4 hover:border-cyan-electric/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${group.color}20`, border: `1px solid ${group.color}50` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: group.color }} />
                  </div>
                  <h3 className="font-heading font-bold text-base text-content-primary">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl bg-surface-elevated text-xs font-mono text-content-secondary border border-border hover:border-cyan-electric/40 hover:text-cyan-electric transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CERTIFICATIONS & INDUSTRY JOB SIMULATIONS (From Resume)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 border border-brand/50 text-cyan-electric text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>INDUSTRY SIMULATIONS & TRAINING</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-content-primary tracking-tight">
            Certifications & Industry Simulations
          </h2>
          <p className="font-sans text-content-secondary text-sm sm:text-base leading-relaxed">
            Hands-on problem solving verified through industry simulations and advanced technical courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="rounded-2xl bg-surface-card border border-border p-5 space-y-3 hover:border-cyan-electric/60 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-content-muted">
                  <span className="text-cyan-electric font-semibold">{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-content-primary leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-border">
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                  style={{ backgroundColor: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}40` }}
                >
                  {cert.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          AUTHENTIC BLUEPRINT VAULT (NEXORA Sourced Diagrams)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-electric/15 border border-cyan-electric/40 text-cyan-electric text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HAND-CRAFTED BLUEPRINTS</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-content-primary tracking-tight">
              From My Drive to the Web
            </h2>
            <p className="font-sans text-content-secondary text-sm sm:text-base mt-1.5 max-w-xl">
              Authentic architecture diagrams designed and uploaded by Naveen for the NEXORA platform.
            </p>
          </div>

          <button
            onClick={onExploreFeed}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-heading font-semibold text-xs sm:text-sm shadow-glow-brand transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
          >
            <span>View All In Feed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.slice(0, 6).map((post) => (
            <div
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="group rounded-2xl bg-surface-card border border-border hover:border-cyan-electric/80 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(32,217,232,0.2)] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#090D1A] overflow-hidden border-b border-border">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-cyan-electric/40 text-[10px] font-mono text-cyan-electric font-semibold uppercase">
                  {post.category}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-border text-[10px] font-mono text-content-primary">
                  {post.stepsCount} phases
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <h4 className="font-heading font-bold text-base text-content-primary group-hover:text-cyan-electric transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="font-sans text-xs text-content-secondary line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-cyan-electric">
                  <span>Open Interactive Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          THE VISUAL MANIFESTO (Quote Block)
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-surface-card via-[#131A33] to-surface-card border-2 border-cyan-electric/40 p-8 sm:p-12 text-center shadow-[0_0_40px_rgba(32,217,232,0.15)] space-y-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-electric/15 border border-cyan-electric/40 mx-auto flex items-center justify-center text-cyan-electric">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '16s' }} />
          </div>

          <blockquote className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-content-primary leading-snug max-w-3xl mx-auto">
            “Code without visual architecture is like navigating a city without a map. TatvaTech was created so developers, engineers, and curious minds can watch systems breathe.”
          </blockquote>

          <div className="flex flex-col items-center gap-1 font-mono">
            <span className="text-cyan-electric font-bold text-sm tracking-wide">
              — {authorName}
            </span>
            <span className="text-content-muted text-xs">
              Computer Science Engineer • GL Bajaj Institute of Technology and Management
            </span>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          CONNECT & GET IN TOUCH (Contact Details & Form Trigger)
         ========================================================================= */}
      <section className="py-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-surface-card border border-border p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-lime/15 border border-accent-lime/40 text-accent-lime text-xs font-mono font-semibold">
              <Send className="w-3.5 h-3.5" />
              <span>LET'S CONNECT</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-content-primary">
              Ready to Collaborate or Discuss Engineering?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-content-secondary max-w-md mx-auto leading-relaxed">
              Open to Software Engineering roles, AI agent prototyping, full-stack projects, and architectural collaborations.
            </p>
          </div>

          {/* Social Contact Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs font-bold">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-surface-elevated hover:bg-cyan-electric hover:text-black border border-border hover:border-cyan-electric text-content-primary transition-all flex items-center gap-2 shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-cyan-electric group-hover:text-black" />
              <span>LinkedIn Message</span>
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-surface-elevated hover:bg-brand-light hover:text-white border border-border hover:border-brand text-content-primary transition-all flex items-center gap-2 shadow-sm"
            >
              <Github className="w-4 h-4 text-brand-light group-hover:text-white" />
              <span>GitHub Follow</span>
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="px-5 py-3 rounded-2xl bg-surface-elevated hover:bg-accent-lime hover:text-black border border-border hover:border-accent-lime text-content-primary transition-all flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4 text-accent-lime group-hover:text-black" />
              <span>Email: {emailAddress}</span>
            </a>

            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand to-cyan-electric text-content-primary font-heading font-bold shadow-glow-brand hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request a Diagram</span>
            </button>
          </div>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-content-muted">
            <span>📍 Greater Noida, India</span>
            <span>•</span>
            <span>🗣️ Hindi (Native), English (Professional)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
