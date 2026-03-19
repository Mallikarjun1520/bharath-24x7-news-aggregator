"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel w-full max-w-md p-8 rounded-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <form className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all"
                        type="button"
                    >
                        {isLogin ? 'Login to GRAVNEWS' : 'Join GRAVNEWS'}
                    </motion.button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
