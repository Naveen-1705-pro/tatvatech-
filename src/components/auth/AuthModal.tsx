import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useStore, DEMO_USERS, OWNER_EMAIL } from '../../lib/store';
import { TatvaTechLogo } from '../brand/TatvaTechLogo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signup, loginAsDemo, requestAuthorOtp } = useStore();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to sign in. Please verify your credentials.');
        }
      } else {
        if (!fullName.trim() || !username.trim()) {
          setErrorMsg('Please provide your full name and preferred handle.');
          setIsLoading(false);
          return;
        }
        const res = await signup(email, password, fullName, username);
        if (!res.success) {
          setErrorMsg(res.error || 'Could not create account. Please check the information provided.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-surface-card border border-border shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand/15 rounded-full blur-2xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-electric/10 rounded-full blur-2xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-surface-elevated text-content-secondary hover:text-content-primary transition-colors"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="space-y-1.5 text-center">
          <TatvaTechLogo size="sm" showText={true} showTagline={false} className="justify-center mb-1" />
          <h3 className="font-heading font-extrabold text-2xl text-content-primary">
            {mode === 'signin' ? 'Welcome Back' : 'Join TatvaTech'}
          </h3>
          <p className="font-mono text-xs text-content-secondary">
            {mode === 'signin' 
              ? 'Access your saved diagrams and knowledge studio' 
              : 'Create an account to save bookmarks and discuss visual topics'}
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Sign Up) */}
        <div className="p-1 rounded-xl bg-surface-elevated border border-border flex text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              mode === 'signin'
                ? 'bg-brand text-content-primary shadow-glow-brand font-semibold'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              mode === 'signup'
                ? 'bg-brand text-content-primary shadow-glow-brand font-semibold'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* One-Click Quick Demo Sign-Ins */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-content-muted uppercase tracking-wider block text-center">
            Instant One-Click Login
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Author Demo / OTP Trigger */}
            <button
              type="button"
              onClick={() => loginAsDemo('owner')}
              className="p-2.5 rounded-xl bg-surface-elevated hover:bg-brand/20 border border-brand/40 hover:border-brand text-left transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-lime shrink-0" />
                  <span className="font-heading font-bold text-xs text-content-primary group-hover:text-cyan-electric truncate">
                    Naveen Solanki (Author)
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1 rounded bg-accent-lime/15 text-accent-lime font-bold">
                  OTP 2FA
                </span>
              </div>
              <p className="font-mono text-[10px] text-content-secondary truncate">
                suman0383solanki@gmail.com
              </p>
            </button>

            {/* Reader Demo */}
            <button
              type="button"
              onClick={() => loginAsDemo('visitor')}
              className="p-2.5 rounded-xl bg-surface-elevated hover:bg-surface-card border border-border hover:border-cyan-electric/50 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-cyan-electric shrink-0" />
                <span className="font-heading font-bold text-xs text-content-primary group-hover:text-cyan-electric">
                  Reader Account
                </span>
              </div>
              <p className="font-mono text-[10px] text-content-secondary">
                Read, bookmark & feedback
              </p>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] font-mono text-content-muted uppercase">or continue with email</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric font-sans pl-9"
                    required
                  />
                  <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-content-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
                  Username Handle
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. alex_sys"
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric font-mono pl-9"
                    required
                  />
                  <span className="absolute left-3 top-2 text-xs font-mono text-content-muted">@</span>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric font-mono pl-9"
                required
              />
              <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-content-muted" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-content-secondary uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-elevated border border-border text-xs text-content-primary focus:outline-none focus:border-cyan-electric font-mono pl-9 pr-9"
                required
              />
              <KeyRound className="absolute left-3 top-2.5 w-3.5 h-3.5 text-content-muted" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-content-muted hover:text-content-primary"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-accent-coral/15 border border-accent-coral/30 text-xs font-mono text-accent-coral flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand to-cyan-electric hover:shadow-glow-cyan text-content-primary font-heading font-semibold text-xs sm:text-sm shadow-glow-brand transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{isLoading ? 'Processing...' : (mode === 'signin' ? 'Sign In to NEXORA' : 'Create Account')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] font-mono text-content-muted text-center">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-cyan-electric hover:underline font-bold">
                Create one now
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button onClick={() => setMode('signin')} className="text-cyan-electric hover:underline font-bold">
                Sign in here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
