import React from 'react';
import { TatvaTechLogo } from '../brand/TatvaTechLogo';
import { Github, Linkedin, Instagram, Flame, Terminal, Sparkles, Heart } from 'lucide-react';
import { TechCategory } from '../../types';

interface FooterProps {
  onSelectCategory?: (category: TechCategory) => void;
  onSelectTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onSelectTab }) => {
  return (
    <footer className="relative bg-[#070B16] border-t border-border mt-24 overflow-hidden">
      {/* Background Animated Circuit Tracer Line */}
      <svg
        className="absolute top-0 left-0 w-full h-8 pointer-events-none opacity-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="4"
          x2="100%"
          y2="4"
          stroke="url(#footerLineGrad)"
          strokeWidth="1.5"
          className="animate-circuit-line"
        />
        <defs>
          <linearGradient id="footerLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C5CFC" />
            <stop offset="50%" stopColor="#20D9E8" />
            <stop offset="100%" stopColor="#B5F36A" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <TatvaTechLogo size="lg" showText={true} showTagline={true} />
            <p className="font-sans text-xs sm:text-sm text-content-secondary leading-relaxed max-w-sm">
              An immersive visual technology knowledge platform where developers, engineers, and curious minds transform complex technical mechanisms into structured, beautiful visual understanding.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Naveen-1705-pro"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-surface-card border border-border text-content-secondary hover:text-cyan-electric hover:border-cyan-electric transition-colors"
                title="GitHub - Naveen Solanki"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/naveen-solanki-6a6434301?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-surface-card border border-border text-content-secondary hover:text-cyan-electric hover:border-cyan-electric transition-colors"
                title="LinkedIn - Naveen Solanki"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/self_loop_naveen/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-surface-card border border-border text-content-secondary hover:text-accent-coral hover:border-accent-coral transition-colors"
                title="Instagram - @self_loop_naveen"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column: Core Navigation */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-content-primary mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-content-secondary">
              <li>
                <button onClick={() => onSelectTab?.('explore')} className="hover:text-cyan-electric transition-colors">
                  Visual Discovery Feed
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab?.('topics')} className="hover:text-cyan-electric transition-colors">
                  Technology Categories
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab?.('community')} className="hover:text-cyan-electric transition-colors">
                  Architect Guild
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab?.('saved')} className="hover:text-cyan-electric transition-colors">
                  Saved Topics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab?.('author')} className="hover:text-cyan-electric transition-colors">
                  Meet Naveen (Author)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab?.('dashboard')} className="hover:text-cyan-electric transition-colors">
                  Personal Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Categories */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-content-primary mb-4">
              Visual Domains
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-content-secondary">
              <li>
                <button onClick={() => onSelectCategory?.('System Design')} className="hover:text-cyan-electric transition-colors">
                  System Design
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('Docker & DevOps')} className="hover:text-cyan-electric transition-colors">
                  Docker & DevOps
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('Data Structures & Algorithms')} className="hover:text-cyan-electric transition-colors">
                  DSA Algorithms
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('Computer Networks')} className="hover:text-cyan-electric transition-colors">
                  Computer Networks
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory?.('DBMS')} className="hover:text-cyan-electric transition-colors">
                  DBMS & Storage
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Architecture */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-content-primary mb-4">
              Protocol & Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-content-secondary">
              <li className="hover:text-content-primary cursor-pointer">Architecture Manifesto</li>
              <li className="hover:text-content-primary cursor-pointer">SVG Diagram Standards</li>
              <li className="hover:text-content-primary cursor-pointer">Privacy Policy</li>
              <li className="hover:text-content-primary cursor-pointer">Terms of Service</li>
              <li className="text-cyan-electric font-semibold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>TatvaTech v2.4</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-12 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-content-muted">
          <p>© 2026 TatvaTech. The Elemental Architecture of Tech.</p>
          <div className="flex items-center gap-2 text-content-secondary">
            <span>Created by <a href="https://www.linkedin.com/in/naveen-solanki-6a6434301?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-cyan-electric hover:underline font-semibold">Naveen Solanki</a></span>
            <span className="text-content-muted">•</span>
            <a href="https://github.com/Naveen-1705-pro" target="_blank" rel="noreferrer" className="hover:text-cyan-electric transition-colors">GitHub</a>
            <span className="text-content-muted">•</span>
            <a href="https://www.instagram.com/self_loop_naveen/" target="_blank" rel="noreferrer" className="hover:text-accent-coral transition-colors">Instagram</a>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric animate-pulse ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
