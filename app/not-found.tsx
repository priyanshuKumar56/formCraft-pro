"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Ghost, Search, FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white opacity-60 pointer-events-none" />

            {/* Animated Floating Blobs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            />
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 15, 0],
                    scale: [1, 0.9, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            />

            {/* Main Card Content */}
            <div className="relative z-10 text-center max-w-lg w-full">

                {/* Icon Container with Pulse */}
                <div className="relative mx-auto w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-20" />
                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-100 border border-indigo-50">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <FileQuestion size={64} className="text-indigo-600" />
                        </motion.div>
                    </div>

                    {/* Floating decoration elements around icon */}
                    <motion.div
                        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-2 -right-2 bg-rose-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white"
                    >
                        ?
                    </motion.div>
                    <motion.div
                        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -bottom-2 -left-2 bg-emerald-400 w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    />
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700 tracking-tighter mb-4 drop-shadow-sm">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h2>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        Oops! The page you are looking for seems to have wandered off into the void. It might have been moved or deleted.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/" className="w-full sm:w-auto">
                        <Button variant="outline" className="h-12 px-6 w-full rounded-xl font-bold border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                        </Button>
                    </Link>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button className="h-12 px-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 transition-all">
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                </motion.div>

                <div className="mt-12 text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
                    FormCraft Pro
                </div>
            </div>
        </div>
    )
}
