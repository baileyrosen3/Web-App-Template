"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { login, register, requestPasswordReset, setAuthToken } from "@/lib/auth";
import { APP_VERSION, APP_BUILD_DATE } from "@/lib/version";
import { IconBrandNextjs, IconBrandTypescript, IconBrandTailwind, IconServer, IconDatabase, IconGitPullRequest } from '@tabler/icons-react';
import { ThemeToggle } from "@/components/theme-toggle";

// Add these animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

const stackItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function LandingPage() {
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dbResponse, setDbResponse] = useState<string>("");
  const [dbError, setDbError] = useState<string>("");
  const [dbLoading, setDbLoading] = useState(false);
  
  // Auth-related state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const [authSuccess, setAuthSuccess] = useState<string>("");
  const [authLoading, setAuthLoading] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const backendUrl = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";


  const fetchWithCORS = async (endpoint: string) => {
    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return response.json();
    } catch (err) {
      console.error("Fetch error:", err);
      throw err;
    }
  };

  const testBackend = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Attempting to fetch from:", backendUrl);
      const data = await fetchWithCORS("/api");
      console.log("Response data:", data);
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Fetch error details:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const testDatabase = async () => {
    setDbLoading(true);
    setDbError("");
    try {
      console.log("Testing database connection...");
      const data = await fetchWithCORS("/api/db-test");
      console.log("Database test response:", data);
      setDbResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Database test error:", err);
      setDbError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDbLoading(false);
    }
  };

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const response = await login({ email, password });
      setAuthToken(response.token);
      setAuthSuccess("Successfully logged in!");
      setShowLoginModal(false);
      // Reset form
      setEmail("");
      setPassword("");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const response = await register({ email, password, name });
      setAuthToken(response.token);
      setAuthSuccess("Successfully registered!");
      setShowSignupModal(false);
      // Reset form
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      await requestPasswordReset(email);
      setAuthSuccess("Password reset email sent!");
      setShowForgotPasswordModal(false);
      // Reset form
      setEmail("");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Password reset request failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowLoginModal(false);
      setShowSignupModal(false);
      setShowForgotPasswordModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <ThemeToggle />

      {/* Version Display */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="absolute top-2 right-2 text-sm text-foreground/60 glass-effect px-3 py-1 rounded-full"
      >
        v{APP_VERSION}
      </motion.div>

      {/* Auth Success Message */}
      <AnimatePresence>
        {authSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg shadow-lg z-50 backdrop-blur-sm"
          >
            <span className="block sm:inline">{authSuccess}</span>
            <button
              onClick={() => setAuthSuccess("")}
              className="absolute top-0 bottom-0 right-0 px-4 py-3 transition-colors hover:text-primary-dark"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-surface p-8 max-w-md w-full shadow-2xl rounded-2xl border border-primary/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-light font-geist tracking-tight">Login</h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {authError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 font-geist">
                  {authError}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-foreground/50 text-sm font-extralight mb-2 font-geist" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-dark border border-primary/5 text-foreground font-geist font-extralight focus:outline-none focus:ring-1 focus:ring-primary/30 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-foreground/80 text-sm font-medium mb-2 font-geist" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-dark border border-primary/10 text-foreground font-geist focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-extralight shadow-md hover:shadow-lg transition-all duration-300 font-geist text-base disabled:opacity-30"
                  >
                    {authLoading ? "Logging in..." : "Login"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLoginModal(false);
                      setShowForgotPasswordModal(true);
                    }}
                    className="text-sm text-primary/70 hover:text-primary transition-colors font-geist font-extralight"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
              <div className="mt-8 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLoginModal(false);
                    setShowSignupModal(true);
                  }}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors font-geist"
                >
                  Don&apos;t have an account? Sign up
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowSignupModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-surface p-8 max-w-md w-full shadow-2xl rounded-2xl border border-primary/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-geist tracking-tight">Sign Up</h2>
                <button
                  onClick={() => setShowSignupModal(false)}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {authError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 font-geist">
                  {authError}
                </div>
              )}
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="block text-foreground/80 text-sm font-medium mb-2 font-geist" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-dark border border-primary/10 text-foreground font-geist focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-foreground/80 text-sm font-medium mb-2 font-geist" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-dark border border-primary/10 text-foreground font-geist focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-foreground/80 text-sm font-medium mb-2 font-geist" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-dark border border-primary/10 text-foreground font-geist focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-extralight shadow-lg hover:shadow-xl transition-all duration-300 font-geist text-base disabled:opacity-50"
                  >
                    {authLoading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </form>
              <div className="mt-8 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSignupModal(false);
                    setShowLoginModal(true);
                  }}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors font-geist"
                >
                  Already have an account? Log in
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowForgotPasswordModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-surface p-8 max-w-md w-full shadow-2xl rounded-2xl border border-primary/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-geist tracking-tight">Reset Password</h2>
                <button
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {authError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 font-geist">
                  {authError}
                </div>
              )}
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-foreground/80 text-sm font-medium mb-2 font-geist" htmlFor="reset-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-dark border border-primary/10 text-foreground font-geist focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-extralight shadow-lg hover:shadow-xl transition-all duration-300 font-geist text-base disabled:opacity-50"
                  >
                    {authLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
              <div className="mt-8 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowForgotPasswordModal(false);
                    setShowLoginModal(true);
                  }}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors font-geist"
                >
                  Remember your password? Log in
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 px-4 sm:px-6 lg:px-8 relative flex items-start">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-8xl font-thin mb-6 text-primary font-geist tracking-tight leading-none"
          >
            Congratulations! 🎉
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/80 mb-16 max-w-3xl mx-auto font-geist leading-relaxed font-light"
          >
            You've successfully set up your Modern Full Stack Template! Let's test out some core functionality to make sure everything is working properly.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="flex flex-row justify-center space-x-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLoginModal(true)}
              className="bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-lg font-light text-lg tracking-wide transition-all duration-300"
            >
              TEST AUTH
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={testBackend}
              className="border border-primary text-primary hover:bg-primary/5 px-12 py-4 rounded-lg font-light text-lg tracking-wide transition-all duration-300"
            >
              TEST API
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={testDatabase}
              className="border border-primary text-primary hover:bg-primary/5 px-12 py-4 rounded-lg font-light text-lg tracking-wide transition-all duration-300"
            >
              TEST DATABASE
            </motion.button>
          </motion.div>

          {/* Loading States */}
          <div className="flex justify-center space-x-6 text-xs text-foreground/40 font-geist tracking-wider uppercase">
            {loading && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-primary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Testing API...
              </motion.span>
            )}
            {dbLoading && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-primary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Testing Database...
              </motion.span>
            )}
          </div>
        </div>
      </section>

      {/* Test Results Section */}
      <AnimatePresence>
        {(response || error || dbResponse || dbError) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="py-8 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-surface border border-red-400 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    API Test Failed
                  </h3>
                  <p className="text-foreground/80">{error}</p>
                </motion.div>
              )}
              {response && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-surface border border-primary/20 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    API Test Successful! 🎉
                  </h3>
                  <pre className="mt-2 p-3 bg-surface-dark rounded-lg overflow-auto text-foreground/80">
                    {response}
                  </pre>
                </motion.div>
              )}
              {dbError && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-surface border border-red-400 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    Database Test Failed
                  </h3>
                  <p className="text-foreground/80">{dbError}</p>
                </motion.div>
              )}
              {dbResponse && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-surface border border-primary/20 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Database Test Successful! 🎉
                  </h3>
                  <pre className="mt-2 p-3 bg-surface-dark rounded-lg overflow-auto text-foreground/80">
                    {dbResponse}
                  </pre>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Stack Overview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pt-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeIn}
            className="text-2xl font-light text-primary text-center mb-8 font-geist tracking-tight"
          >
            Full Stack Architecture
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={stackItemVariants}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -2 }}
              className="bg-surface/50 p-4 rounded-lg border border-primary/10"
            >
              <h3 className="text-base font-light text-foreground mb-3 flex items-center font-geist">
                <IconBrandNextjs className="w-4 h-4 mr-2 text-primary" />
                Frontend
              </h3>
              <ul className="space-y-2 text-foreground/60 font-geist">
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm font-extralight"
                >
                  <IconBrandNextjs className="w-4 h-4 text-primary mr-2" />
                  Next.js 14 with App Router
                </motion.li>
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconBrandTypescript className="w-4 h-4 text-primary mr-2" />
                  TypeScript
                </motion.li>
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconBrandTailwind className="w-4 h-4 text-primary mr-2" />
                  Tailwind CSS
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              variants={stackItemVariants}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -2 }}
              className="bg-surface/50 p-4 rounded-lg border border-primary/10"
            >
              <h3 className="text-base font-light text-foreground mb-3 flex items-center font-geist">
                <IconServer className="w-4 h-4 mr-2 text-accent" />
                Backend
              </h3>
              <ul className="space-y-2 text-foreground/80 font-geist">
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconServer className="w-4 h-4 text-accent mr-2" />
                  Express.js
                </motion.li>
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconServer className="w-4 h-4 text-accent mr-2" />
                  Node.js
                </motion.li>
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconGitPullRequest className="w-4 h-4 text-accent mr-2" />
                  REST API
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              variants={stackItemVariants}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -2 }}
              className="bg-surface/50 p-4 rounded-lg border border-primary/10"
            >
              <h3 className="text-base font-light text-foreground mb-3 flex items-center font-geist">
                <IconDatabase className="w-4 h-4 mr-2 text-primary" />
                Database
              </h3>
              <ul className="space-y-2 text-foreground/80 font-geist">
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconDatabase className="w-4 h-4 text-primary mr-2" />
                  PostgreSQL
                </motion.li>
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconDatabase className="w-4 h-4 text-primary mr-2" />
                  Prisma ORM
                </motion.li>
                <motion.li
                  variants={stackItemVariants}
                  className="flex items-center text-sm"
                >
                  <IconGitPullRequest className="w-4 h-4 text-primary mr-2" />
                  Migrations
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
