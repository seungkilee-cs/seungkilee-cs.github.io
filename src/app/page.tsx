"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">Software Engineer</span>
          </motion.div>

          {/* Main heading with artistic typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent leading-tight"
          >
            Seung Ki
            <br />
            <span className="text-4xl md:text-6xl font-light italic">Lee</span>
          </motion.h1>

          {/* Subtitle with typewriter effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light"
          >
            Software Engineer
          </motion.p>

          {/* CTA buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 px-8 py-4 text-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-4"
        >
          {["TypeScript", "React", "Next.js", "Node.js", "AWS", "Agile"].map(
            (tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                className="px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
}
