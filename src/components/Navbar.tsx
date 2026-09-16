import { useState, useEffect } from 'react';
import { Sprout, Menu, X, ArrowRight, ShieldCheck, User, LogIn, UserPlus } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  onScanClick: () => void;
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenProfile: () => void;
  onGoToLogin?: () => void;
}

export const Navbar = ({ onScanClick, user, onOpenAuth, onOpenProfile, onGoToLogin }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Scanner', href: '#scanner' },
    { label: 'Why Us', href: '#why-farmerdetect' },
    { label: 'Knowledge Base', href: '#knowledge-base' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Team', href: '#team' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/60 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Farmer<span className="text-emerald-600">Detect</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                <ShieldCheck className="w-2.5 h-2.5" />
                SIH 2026
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide">
              CROP AI DETECTION
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Authentication Section */}
        <div className="hidden sm:flex items-center gap-2.5">
          {user ? (
            /* Logged In User Pill */
            <button
              onClick={onOpenProfile}
              id="nav-user-profile-btn"
              className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/70 transition-all text-left group"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-lime-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">
                  {user.role.split('/')[0]}
                </span>
              </div>
            </button>
          ) : (
            /* Logged Out: Sign In / Sign Up */
            <div className="flex items-center gap-2">
              <button
                onClick={() => (onGoToLogin ? onGoToLogin() : onOpenAuth('signin'))}
                id="nav-signin-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sign In / Login</span>
              </button>

              <button
                onClick={() => (onGoToLogin ? onGoToLogin() : onOpenAuth('signup'))}
                id="nav-signup-btn"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Try AI Scanner Launch Button */}
          <button
            onClick={onScanClick}
            id="nav-try-scanner-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-sm shadow-emerald-600/25 transition-all duration-200 active:scale-95"
          >
            <span>Launch Scanner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          {user && (
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs mr-1"
              aria-label="Open profile"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          {/* Mobile Auth Bar */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-emerald-600">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="px-3 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 rounded-lg"
                >
                  View Profile
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onGoToLogin) onGoToLogin();
                    else onOpenAuth('signin');
                  }}
                  className="py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sign In / Login</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onGoToLogin) onGoToLogin();
                    else onOpenAuth('signup');
                  }}
                  className="py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sign Up Free</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1 py-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 rounded-lg transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScanClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-600 shadow-md shadow-emerald-600/20"
            >
              <span>Launch AI Crop Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
