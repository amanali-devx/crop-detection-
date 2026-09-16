import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  AlertCircle,
  AlertTriangle,
  UserPlus,
  LogIn,
  KeyRound,
} from 'lucide-react';
import { UserProfile } from '../types';
import {
  loginUser,
  registerUser,
  PRESEEDED_USERS,
} from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export const AuthModal = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onSuccess,
  onShowToast,
}: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Farmer / Grower' | 'Agronomist / Scientist' | 'SIH Evaluator / Student'>('Farmer / Grower');
  const [primaryCrop, setPrimaryCrop] = useState('Tomato');
  const [farmLocation, setFarmLocation] = useState('Punjab & Maharashtra Agro-Zone');
  const [rememberMe, setRememberMe] = useState(true);

  // Validation Error State
  const [validationError, setValidationError] = useState<{
    type: 'NO_ACCOUNT' | 'WRONG_PASSWORD' | 'EMAIL_EXISTS' | 'INVALID_INPUT';
    message: string;
  } | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setValidationError(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Password strength calculator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: 'bg-slate-200' };
    if (pass.length < 6) return { score: 1, text: 'Weak (< 6 chars)', color: 'bg-rose-500' };
    if (pass.length < 9) return { score: 2, text: 'Moderate', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  const clearErrors = () => {
    if (validationError) setValidationError(null);
  };

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    setValidationError(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleFillTestAccount = (testEmail: string, testPass: string) => {
    setMode('signin');
    setValidationError(null);
    setEmail(testEmail);
    setPassword(testPass);
    onShowToast('info', 'Credentials Loaded', `Pre-filled ${testEmail}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (mode === 'forgot') {
        onShowToast('success', 'Reset Link Dispatched', `Password recovery link sent to ${email || 'your email'}`);
        switchMode('signin');
        return;
      }

      // 1. OLD USER SIGN IN (VALIDATION)
      if (mode === 'signin') {
        const result = loginUser(email, password);

        if (!result.success) {
          setValidationError({
            type: result.errorType || 'INVALID_INPUT',
            message: result.message,
          });

          if (result.errorType === 'NO_ACCOUNT') {
            onShowToast('error', 'Account Not Found', 'Naya user hai toh pehle Sign Up karein!');
          } else if (result.errorType === 'WRONG_PASSWORD') {
            onShowToast('error', 'Wrong Password', 'Galat password! Kripya sahi password dalein.');
          }
          return;
        }

        if (result.user) {
          onSuccess(result.user);
          onShowToast(
            'success',
            'Signed In Successfully',
            `Welcome back ${result.user.name} (${result.user.role})`
          );
          onClose();
        }
        return;
      }

      // 2. NEW USER SIGN UP (VALIDATION)
      if (mode === 'signup') {
        const result = registerUser({
          name,
          email,
          password,
          confirmPassword,
          role,
          primaryCrop,
          farmLocation,
        });

        if (!result.success) {
          setValidationError({
            type: result.errorType || 'INVALID_INPUT',
            message: result.message,
          });

          if (result.errorType === 'EMAIL_EXISTS') {
            onShowToast('error', 'Account Already Exists', 'Yeh email pehle se registered hai! Kripya Sign In karein.');
          } else {
            onShowToast('error', 'Registration Error', result.message);
          }
          return;
        }

        if (result.user) {
          onSuccess(result.user);
          onShowToast(
            'success',
            'Account Created Successfully!',
            `Naya account ban gaya! Welcome ${result.user.name}.`
          );
          onClose();
        }
      }
    }, 550);
  };

  const handleQuickDemoLogin = (demoRole: 'Farmer' | 'Jury') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const targetUser = demoRole === 'Farmer'
        ? PRESEEDED_USERS[1] // Ramesh Patel
        : PRESEEDED_USERS[2]; // Dr. SIH Jury Member

      const { passwordHash, ...userProfile } = targetUser;
      onSuccess(userProfile);
      onShowToast('success', `${demoRole} Authenticated`, `Signed in as ${userProfile.name}`);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-lg w-full overflow-hidden z-10 my-6"
      >
        {/* Top Header Bar */}
        <div className="relative px-6 sm:px-8 pt-6 pb-5 bg-gradient-to-b from-emerald-50/80 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Farmer<span className="text-emerald-600">Detect</span></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  SIH 2026
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'signin' ? 'Old User: Sign In with your registered account' : 'New User: Register your farm credentials'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-4 text-left">
          {/* Tabs */}
          {mode !== 'forgot' ? (
            <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signin'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Old User (Sign In)</span>
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signup'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>New User (Sign Up)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Reset Password</h3>
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Dynamic Error Alert Banner */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className={`p-3 rounded-xl border text-xs flex flex-col gap-2 ${
                    validationError.type === 'NO_ACCOUNT'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : validationError.type === 'EMAIL_EXISTS'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {validationError.type === 'EMAIL_EXISTS' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span className="font-semibold leading-relaxed">
                      {validationError.message}
                    </span>
                  </div>

                  {validationError.type === 'NO_ACCOUNT' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setValidationError(null);
                      }}
                      className="self-start px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-700 transition flex items-center gap-1"
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>Sign Up to Create Account</span>
                    </button>
                  )}

                  {validationError.type === 'EMAIL_EXISTS' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setValidationError(null);
                      }}
                      className="self-start px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px] hover:bg-amber-700 transition flex items-center gap-1"
                    >
                      <LogIn className="w-3 h-3" />
                      <span>Go to Sign In / Login</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Test Accounts Shortcut Bar */}
          {mode === 'signin' && (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between gap-2">
              <span className="text-slate-600 font-medium flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                Fill Test User:
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillTestAccount('farmer@krishi.gov.in', 'kisan123')}
                  className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-700 transition"
                >
                  Kisan
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTestAccount('evaluator@sih2026.gov.in', 'sih2026')}
                  className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-700 transition"
                >
                  Jury
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTestAccount('aliaman12074@gmail.com', 'aman123')}
                  className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-700 transition"
                >
                  Aman
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Sign Up Fields */}
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearErrors();
                      }}
                      placeholder="e.g. Ramesh Kumar Patel"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Account Role <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none"
                    >
                      <option value="Farmer / Grower">Farmer / Grower</option>
                      <option value="Agronomist / Scientist">Agronomist</option>
                      <option value="SIH Evaluator / Student">SIH Evaluator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Crop
                    </label>
                    <select
                      value={primaryCrop}
                      onChange={(e) => setPrimaryCrop(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none"
                    >
                      <option value="Tomato">Tomato</option>
                      <option value="Potato">Potato</option>
                      <option value="Corn">Corn</option>
                      <option value="Apple">Apple</option>
                      <option value="Pepper">Pepper</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearErrors();
                  }}
                  placeholder="farmer@krishi.gov.in"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-xs text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[11px] font-semibold text-emerald-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearErrors();
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-xs text-slate-900 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Password Strength:</span>
                    <span className="font-semibold">{passwordStrength.text}</span>
                  </div>
                )}
              </div>
            )}

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  {confirmPassword && (
                    <span
                      className={`text-[10px] font-bold ${
                        password === confirmPassword ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      {password === confirmPassword ? '✓ Match' : '✗ Do not match'}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearErrors();
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-xs text-slate-900 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me */}
            {mode === 'signin' && (
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  id="modal-remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <label htmlFor="modal-remember" className="text-xs text-slate-600 font-medium">
                  Remember my session
                </label>
              </div>
            )}

            {/* Action CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-white text-xs bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition mt-3"
            >
              {isLoading ? (
                <span>Validating credentials...</span>
              ) : mode === 'signin' ? (
                <>
                  <span>Old User: Verify & Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : mode === 'signup' ? (
                <>
                  <span>New User: Register & Create Account</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="text-center pt-2 text-xs text-slate-500">
            {mode === 'signin' ? (
              <span>
                Naya user hain?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Sign Up (Create Account)
                </button>
              </span>
            ) : mode === 'signup' ? (
              <span>
                Pehle se account hai?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Sign In / Login
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="font-bold text-emerald-600 hover:underline"
              >
                Back to Sign In
              </button>
            )}
          </div>
        </div>

        {/* Security Footer */}
        <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local Persistence & SIH 2026 Evaluation Verified</span>
        </div>
      </motion.div>
    </div>
  );
};
