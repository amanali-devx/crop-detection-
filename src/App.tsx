import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScannerSection } from './components/ScannerSection';
import { WhyFarmerDetect } from './components/WhyFarmerDetect';
import { CropKnowledgeBase } from './components/CropKnowledgeBase';
import { HowItWorks } from './components/HowItWorks';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { TeamSection } from './components/TeamSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { LoginPage } from './components/LoginPage';
import { UserProfile } from './types';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  // Start on 'login' view first, then transition to 'home' after login / guest explore
  const [currentView, setCurrentView] = useState<'login' | 'home'>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Load persisted user from localStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('farmerdetect_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const showToast = useCallback((type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scrollToScanner = useCallback(() => {
    const scannerElement = document.getElementById('scanner');
    if (scannerElement) {
      scannerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('home');
    try {
      localStorage.setItem('farmerdetect_user', JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  };

  const handleExploreGuest = () => {
    setCurrentView('home');
    showToast('info', 'Welcome to FarmerDetect', 'Exploring in guest evaluation mode.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setProfileModalOpen(false);
    setCurrentView('login');
    try {
      localStorage.removeItem('farmerdetect_user');
    } catch {
      // Ignore storage errors
    }
    showToast('info', 'Signed Out', 'You have been signed out. Welcome back anytime!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Screen View Transition */}
      <AnimatePresence mode="wait">
        {currentView === 'login' ? (
          /* 1. DEDICATED FULL-SCREEN LOGIN / SIGN-UP PAGE FIRST */
          <motion.div
            key="login-page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-screen"
          >
            <LoginPage
              currentUser={currentUser}
              onLoginSuccess={handleLoginSuccess}
              onExploreGuest={handleExploreGuest}
              onShowToast={showToast}
            />
          </motion.div>
        ) : (
          /* 2. HOME PRODUCT WEBSITE (SHOWN AFTER LOGIN OR GUEST EXPLORE) */
          <motion.div
            key="home-page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col min-h-screen"
          >
            {/* Supplementary Auth Modal when on Home Page */}
            <AuthModal
              isOpen={authModalOpen}
              initialMode={authModalMode}
              onClose={() => setAuthModalOpen(false)}
              onSuccess={handleLoginSuccess}
              onShowToast={showToast}
            />

            {/* User Profile / Dashboard Modal */}
            <UserProfileModal
              isOpen={profileModalOpen}
              user={currentUser}
              onClose={() => setProfileModalOpen(false)}
              onLogout={handleLogout}
              onScanClick={scrollToScanner}
            />

            {/* Sticky Navigation Bar with Auth Integration & Go to Login Page */}
            <Navbar
              onScanClick={scrollToScanner}
              user={currentUser}
              onOpenAuth={handleOpenAuthModal}
              onOpenProfile={() => setProfileModalOpen(true)}
              onGoToLogin={() => setCurrentView('login')}
            />

            {/* Main Page Layout */}
            <main className="flex-1">
              {/* 1. Hero Section */}
              <Hero onScanClick={scrollToScanner} />

              {/* 2. Interactive AI Crop Scanner */}
              <ScannerSection onShowToast={showToast} />

              {/* 3. Why FarmerDetect */}
              <WhyFarmerDetect />

              {/* 4. Crop Knowledge Base */}
              <CropKnowledgeBase />

              {/* 5. How It Works */}
              <HowItWorks />

              {/* 6. Tech Architecture */}
              <ArchitectureDiagram />

              {/* 7. Team Section */}
              <TeamSection />

              {/* 8. FAQ Section */}
              <FAQSection />

              {/* 9. Contact Section */}
              <ContactSection onShowToast={showToast} />
            </main>

            {/* 10. Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
