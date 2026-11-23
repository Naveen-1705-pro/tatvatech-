import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  KeyRound, 
  Sparkles, 
  AlertCircle, 
  Mail, 
  CheckCircle2, 
  RotateCw, 
  Copy, 
  Check, 
  ArrowRight,
  Send,
  Zap
} from 'lucide-react';
import { useStore, OWNER_EMAIL, OWNER_PASSCODE } from '../../lib/store';
import { TECHIE_AVATAR_DATA_URI, TECHIE_AVATAR_URL } from '../brand/AuthorAvatar';

export const OwnerAuthModal: React.FC = () => {
  const { 
    isOwnerAuthModalOpen, 
    setIsOwnerAuthModalOpen, 
    authorOtpState,
    requestAuthorOtp,
    verifyAuthorOtp, 
    isOwner, 
    switchRole 
  } = useStore();

  // 6 Individual PIN Digits
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [useManualPasskey, setUseManualPasskey] = useState(false);
  const [manualKey, setManualKey] = useState('');
  const [resendTimer, setResendTimer] = useState(45);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (!isOwnerAuthModalOpen) return;
    setResendTimer(45);
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOwnerAuthModalOpen, authorOtpState.activeOtp]);

  // Focus first input box on modal open
  useEffect(() => {
    if (isOwnerAuthModalOpen && !isOwner) {
      setDigits(['', '', '', '', '', '']);
      setErrorMsg('');
      setSuccessMsg(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [isOwnerAuthModalOpen, isOwner]);

  if (!isOwnerAuthModalOpen) return null;

  // Handle Digit Change & Auto-Focus next
  const handleDigitChange = (index: number, val: string) => {
    // Check if pasted multiple characters
    if (val.length > 1) {
      handlePasteString(val);
      return;
    }

    const char = val.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = char;
    setDigits(nextDigits);
    setErrorMsg('');

    // Advance focus if character entered
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits are filled
    if (char && index === 5) {
      const fullCode = nextDigits.join('');
      if (fullCode.length === 6) {
        attemptVerification(fullCode);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    handlePasteString(pasteData);
  };

  const handlePasteString = (rawString: string) => {
    const clean = rawString.replace(/\s+/g, '');
    if (clean.length === 6) {
      const newDigits = clean.split('').slice(0, 6);
      setDigits(newDigits);
      inputRefs.current[5]?.focus();
      attemptVerification(clean);
    } else if (clean === OWNER_PASSCODE) {
      attemptVerification(clean);
    } else {
      const chars = clean.slice(0, 6).split('');
      const newDigits = [...digits];
      chars.forEach((c, idx) => {
        newDigits[idx] = c;
      });
      setDigits(newDigits);
    }
  };

  const attemptVerification = (codeToVerify: string) => {
    setErrorMsg('');
    const res = verifyAuthorOtp(codeToVerify);
    if (res.success) {
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setIsOwnerAuthModalOpen(false);
      }, 600);
    } else {
      setErrorMsg(res.error || `Invalid verification key. Please enter the OTP sent to ${OWNER_EMAIL}.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useManualPasskey) {
      attemptVerification(manualKey);
    } else {
      const fullCode = digits.join('');
      attemptVerification(fullCode);
    }
  };

  const handleAutoFill = () => {
    if (authorOtpState.activeOtp) {
      const chars = authorOtpState.activeOtp.split('');
      setDigits(chars);
      attemptVerification(authorOtpState.activeOtp);
    }
  };

  const handleCopyKey = () => {
    if (authorOtpState.activeOtp) {
      navigator.clipboard.writeText(authorOtpState.activeOtp);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleResend = () => {
    requestAuthorOtp();
    setDigits(['', '', '', '', '', '']);
    setErrorMsg('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1020]/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-surface-card border border-border shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-electric/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-accent-lime/10 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          onClick={() => setIsOwnerAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-surface-elevated text-content-secondary hover:text-content-primary transition-colors z-10"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Author Identity Avatar */}
        <div className="flex items-start gap-4">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand to-cyan-electric p-0.5 shrink-0 shadow-[0_0_20px_rgba(32,217,232,0.3)]">
            <img 
              src={TECHIE_AVATAR_URL} 
              alt="Naveen Solanki" 
              className="w-full h-full rounded-[14px] object-cover object-center bg-surface-elevated"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = TECHIE_AVATAR_DATA_URI;
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent-lime border-2 border-background flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-background" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-xl text-content-primary truncate">
                Author Verification
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent-lime/15 text-accent-lime border border-accent-lime/30 uppercase shrink-0">
                2FA OTP
              </span>
            </div>
            <p className="font-mono text-xs text-cyan-electric mt-0.5 truncate">
              Naveen Solanki • Platform Creator
            </p>
          </div>
        </div>

        {isOwner ? (
          /* =========================================================================
             CURRENTLY ACTIVE AUTHOR STATE
             ========================================================================= */
          <div className="p-4 rounded-2xl bg-surface-elevated border border-accent-lime/40 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-accent-lime font-bold">
              <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0" />
              <span>Author Account Currently Active</span>
            </div>
            <p className="font-sans text-xs text-content-secondary leading-relaxed">
              You are authenticated as <strong className="text-content-primary">Naveen Solanki</strong> with full access to the Creator Studio, editorial drafts, and visual topic management.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  switchRole('visitor');
                  setIsOwnerAuthModalOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-surface-card hover:bg-surface-elevated border border-border text-xs font-mono text-content-primary transition-all text-center"
              >
                Switch to Reader (Visitor)
              </button>
              <button
                onClick={() => setIsOwnerAuthModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-brand text-content-primary text-xs font-mono font-semibold transition-all shadow-glow-brand text-center"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             AUTHOR OTP CHALLENGE FLOW
             ========================================================================= */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Target ID Details */}
            <div className="p-3 rounded-2xl bg-surface-elevated/80 border border-border space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-content-muted flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-electric" />
                  <span>Author ID:</span>
                </span>
                <span className="text-content-primary font-bold truncate max-w-[200px]">
                  {OWNER_EMAIL}
                </span>
              </div>
              <p className="font-sans text-[11px] text-content-secondary leading-relaxed">
                A 6-digit one-time security key was dispatched to your Author ID. Enter the key below to unlock the Author account.
              </p>
            </div>

            {/* Simulated Live Dispatch Transmission Banner */}
            {authorOtpState.activeOtp && (
              <div className="p-3.5 rounded-2xl bg-cyan-electric/5 border border-cyan-electric/30 space-y-2.5 relative">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-electric font-semibold flex items-center gap-1.5">
                    <Send className="w-3 h-3 text-cyan-electric animate-pulse" />
                    <span>Incoming Security Dispatch</span>
                  </span>
                  <span className="text-content-muted">Delivered Just Now</span>
                </div>

                <div className="flex items-center justify-between bg-surface-elevated/90 px-3.5 py-2.5 rounded-xl border border-border">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-accent-lime shrink-0" />
                    <span className="font-mono font-extrabold text-base tracking-[0.25em] text-accent-lime">
                      {authorOtpState.activeOtp}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="px-2 py-1 rounded-lg bg-surface-card hover:bg-surface-elevated border border-border text-[10px] font-mono text-content-secondary hover:text-content-primary flex items-center gap-1 transition-colors"
                      title="Copy Key"
                    >
                      {copiedKey ? <Check className="w-3 h-3 text-accent-lime" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="px-2.5 py-1 rounded-lg bg-cyan-electric hover:bg-cyan-electric/90 text-surface-card font-mono font-bold text-[10px] flex items-center gap-1 shadow-sm transition-all"
                      title="Auto-fill and verify key"
                    >
                      <Zap className="w-3 h-3 fill-surface-card" />
                      <span>Auto-Fill</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Input Options (6 Digit PIN Boxes vs Master Passkey) */}
            {!useManualPasskey ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-content-secondary uppercase tracking-wider">
                    Enter 6-Digit OTP Key
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setUseManualPasskey(true);
                      setErrorMsg('');
                    }}
                    className="text-[10px] font-mono text-cyan-electric hover:underline"
                  >
                    Use master passkey
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {digits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { inputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onPaste={handlePaste}
                      className="w-full h-12 text-center text-lg font-mono font-extrabold rounded-xl bg-surface-elevated border border-border text-cyan-electric focus:outline-none focus:border-cyan-electric focus:ring-2 focus:ring-cyan-electric/20 transition-all select-all shadow-inner"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-content-secondary uppercase tracking-wider">
                    Author Master Passkey
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setUseManualPasskey(false);
                      setErrorMsg('');
                    }}
                    className="text-[10px] font-mono text-cyan-electric hover:underline"
                  >
                    Switch back to 6-digit OTP
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={manualKey}
                    onChange={(e) => {
                      setManualKey(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder={`Enter ${OWNER_PASSCODE}...`}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-content-primary focus:outline-none focus:border-cyan-electric font-mono"
                    autoFocus
                  />
                  <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-content-muted" />
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-accent-coral/15 border border-accent-coral/30 text-xs font-mono text-accent-coral flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-accent-lime/15 border border-accent-lime/40 text-xs font-mono text-accent-lime flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Security key verified! Unlocking author account...</span>
              </div>
            )}

            {/* Resend Action */}
            <div className="flex items-center justify-between pt-1 text-xs font-mono">
              <span className="text-content-muted">
                Didn't receive the key?
              </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`flex items-center gap-1.5 transition-colors ${
                  resendTimer > 0 
                    ? 'text-content-muted cursor-not-allowed' 
                    : 'text-cyan-electric hover:text-cyan-electric/80 font-bold'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${resendTimer > 0 ? '' : 'text-cyan-electric'}`} />
                <span>{resendTimer > 0 ? `Resend key (${resendTimer}s)` : 'Resend OTP to Author ID'}</span>
              </button>
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setIsOwnerAuthModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-xs font-mono text-content-secondary hover:text-content-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand to-cyan-electric hover:opacity-95 text-background font-heading font-bold text-xs shadow-glow-brand flex items-center gap-1.5 transition-all"
              >
                <span>Unlock Author Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
