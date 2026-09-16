import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  UserPlus,
  LogIn,
  KeyRound,
  Globe,
  Camera,
} from 'lucide-react';
import { UserProfile } from '../types';
import {
  loginUser,
  registerUser,
  PRESEEDED_USERS,
} from '../services/authService';

interface LoginPageProps {
  currentUser?: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onExploreGuest: () => void;
  onDirectCameraScan?: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLoginSuccess,
  onExploreGuest,
  onDirectCameraScan,
  onShowToast,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
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

  // Quick Demo Fill helper
  const [showTestPill, setShowTestPill] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: 'bg-slate-200' };
    if (pass.length < 6) return { score: 1, text: 'Weak (< 6 characters)', color: 'bg-rose-500' };
    if (pass.length < 9) return { score: 2, text: 'Medium Strength', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong Password', color: 'bg-emerald-500' };
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

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setMode('signin');
    setValidationError(null);
    setEmail(demoEmail);
    setPassword(demoPass);
    onShowToast('info', 'Credentials Loaded', `Pre-filled ${demoEmail}. Click "Sign In" to proceed.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // FORGOT PASSWORD
      if (mode === 'forgot') {
        onShowToast(
          'success',
          'Password Reset Dispatched',
          `Recovery instructions have been sent to ${email || 'your email'}`
        );
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
            onShowToast('error', 'Authentication Failed', 'Galat password! Kripya sahi password enter karein.');
          }
          return;
        }

        if (result.user) {
          onLoginSuccess(result.user);
          onShowToast(
            'success',
            'Signed In Successfully',
            `Welcome back ${result.user.name}`
          );
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
            onShowToast('error', 'Validation Error', result.message);
          }
          return;
        }

        if (result.user) {
          onLoginSuccess(result.user);
          onShowToast(
            'success',
            'Registration Completed!',
            `Account created successfully! Welcome ${result.user.name}.`
          );
        }
      }
    }, 450);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            Farmer<span className="text-emerald-400">Detect</span>
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Direct Camera Scan for New Farmers */}
          <button
            type="button"
            onClick={onDirectCameraScan || onExploreGuest}
            id="login-direct-camera-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 shadow-md shadow-emerald-500/25 transition active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Direct Screen Camera (सीधे कैमरा खोलें)</span>
            <span className="sm:hidden">Camera Scan</span>
          </button>

          {/* Explore Guest Button */}
          <button
            onClick={onExploreGuest}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition"
          >
            <span>Explore as Guest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Centered Login / Sign Up Card (ONLY LOGIN, NO EXTRA SIDE CONTENT) */}
      <main className="relative z-10 flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 relative"
        >
          {/* Direct Screen Camera Bypass Banner */}
          <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-lime-50 border border-emerald-300/80 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/30">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  बिना लॉगिन सीधे फसल जांचें
                </div>
                <div className="text-[11px] text-emerald-800 font-medium truncate">
                  Direct Live Screen Camera Scan
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onDirectCameraScan || onExploreGuest}
              id="login-quick-camera-btn"
              className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition active:scale-95"
            >
              Open Camera
            </button>
          </div>

          {/* Brand & Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'signin' && 'Sign In to Your Account'}
              {mode === 'signup' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'signin' && 'Old / Registered user? Enter your credentials to login'}
              {mode === 'signup' && 'New user? Register your profile to get started'}
              {mode === 'forgot' && 'Enter your registered email address to receive reset link'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In vs Sign Up) */}
          {mode !== 'forgot' && (
            <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200 mb-5">
              <button
                type="button"
                id="tab-btn-signin"
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
                id="tab-btn-signup"
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
          )}

          {/* Dynamic Validation Error Alert Banner */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div
                  className={`p-3.5 rounded-2xl border text-xs flex flex-col gap-2 ${
                    validationError.type === 'EMAIL_EXISTS'
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

                  {/* Switch Action button inside Alert Banner */}
                  {validationError.type === 'NO_ACCOUNT' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setValidationError(null);
                      }}
                      className="self-start mt-0.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-700 transition flex items-center gap-1"
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>Naya Account Banayein (Sign Up)</span>
                    </button>
                  )}

                  {validationError.type === 'EMAIL_EXISTS' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setValidationError(null);
                      }}
                      className="self-start mt-0.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-[11px] hover:bg-amber-700 transition flex items-center gap-1"
                    >
                      <LogIn className="w-3 h-3" />
                      <span>Sign In / Login Karein</span>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
            {/* Sign Up Fields: Full Name & Role */}
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs text-slate-900 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Role <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                    >
                      <option value="Farmer / Grower">Farmer</option>
                      <option value="Agronomist / Scientist">Agronomist</option>
                      <option value="SIH Evaluator / Student">Evaluator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Crop
                    </label>
                    <select
                      value={primaryCrop}
                      onChange={(e) => setPrimaryCrop(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
                    >
                      <option value="Tomato">Tomato</option>
                      <option value="Potato">Potato</option>
                      <option value="Corn">Corn (Maize)</option>
                      <option value="Apple">Apple</option>
                      <option value="Pepper">Pepper</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                {mode === 'signin' && (
                  <span className="text-[10px] text-slate-400">Must be registered</span>
                )}
              </div>
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
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs text-slate-900 outline-none transition"
                />
              </div>
            </div>

            {/* Password Field */}
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
                      className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs text-slate-900 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter for Sign Up */}
                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Strength:</span>
                      <span className="font-semibold">{passwordStrength.text}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200'}`} />
                      <div className={`h-full flex-1 ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200'}`} />
                      <div className={`h-full flex-1 ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200'}`} />
                    </div>
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
                      {password === confirmPassword ? '✓ Passwords Match' : '✗ Do not match'}
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs text-slate-900 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
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
                  id="login-remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <label htmlFor="login-remember" className="text-xs text-slate-600 font-medium">
                  Remember my session
                </label>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              id="primary-login-action-btn"
              className="w-full py-3 px-4 rounded-xl font-bold text-white text-xs bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <span>Checking credentials...</span>
              ) : mode === 'signin' ? (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : mode === 'signup' ? (
                <>
                  <span>Create Account</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {/* Mode switch helper text at bottom */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs text-center">
            {mode === 'signin' ? (
              <div className="text-slate-600">
                <span>Don't have an account?{' '}</span>
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-bold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Sign Up
                </button>
              </div>
            ) : mode === 'signup' ? (
              <div className="text-slate-600">
                <span>Already registered?{' '}</span>
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="font-bold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="font-bold text-emerald-600 hover:underline"
              >
                Back to Sign In
              </button>
            )}

            {/* Discreet Test Demo Accounts Popover (kept tiny so no clutter) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTestPill(!showTestPill)}
                className="text-[11px] text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 font-medium transition"
              >
                <KeyRound className="w-3 h-3" />
                <span>{showTestPill ? 'Hide Demo Logins' : 'Quick Demo Logins'}</span>
              </button>

              {showTestPill && (
                <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleFillDemo('farmer@krishi.gov.in', 'kisan123')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-700 transition"
                  >
                    Kisan
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillDemo('evaluator@sih2026.gov.in', 'sih2026')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-700 transition"
                  >
                    SIH Jury
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillDemo('aliaman12074@gmail.com', 'aman123')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 font-bold text-slate-700 hover:text-emerald-700 transition"
                  >
                    Aman Ali
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Clean Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto px-4 py-4 text-center text-xs text-slate-500">
        <span>© 2026 FarmerDetect • AI Crop Diagnostics Platform</span>
      </footer>
    </div>
  );
};
