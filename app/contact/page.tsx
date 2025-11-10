"use client";

import Script from "next/script";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useIsMobile from "@/hooks/use-is-mobile";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContactForm from "./components/ContactForm";
// import ContactMethods from './components/ContactMethods';
// import SupportOptions from './components/SupportOptions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

// Predefined particle positions to avoid hydration mismatch
const floatingParticles = [
  { id: 1, size: 3, x: 15, y: 25, duration: 15, delay: 0 },
  { id: 2, size: 2, x: 35, y: 45, duration: 20, delay: 1 },
  { id: 3, size: 4, x: 55, y: 15, duration: 18, delay: 2 },
  { id: 4, size: 2.5, x: 75, y: 65, duration: 22, delay: 3 },
  { id: 5, size: 3.5, x: 25, y: 85, duration: 16, delay: 4 },
];

const particleVariants = {
  animate: (custom: { duration: number; delay: number }) => ({
    y: [0, -50, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      repeat: Infinity,
      ease: "linear",
    },
  }),
};

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <AnimatePresence mode="wait">
      <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LexbW8qAAAAAIr7IhfsTb0UMA8gqigbZIY1sHrY" />
      <motion.div
        key="contact-page"
        className="relative min-h-screen w-screen overflow-hidden bg-black font-sans"
      >
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,200,87,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,87,87,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 via-transparent to-transparent opacity-30" />

          {/* Floating Particles */}
          {floatingParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-primary-gold/30"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              variants={particleVariants}
              animate="animate"
              custom={{ duration: particle.duration, delay: particle.delay }}
            />
          ))}
        </div>

        <motion.main
          ref={containerRef}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 flex min-h-screen flex-col"
        >
          <Navbar isFixed={false} />

          <div className="flex-grow px-4 py-24 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div
                variants={itemVariants}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
              >
                <span className="text-primary-gold">Get in Touch</span>
              </motion.div>
              <h1 className="mt-8 text-4xl font-light tracking-tight text-white sm:text-5xl">
                Let's Start a Conversation
              </h1>
              <p className="mt-6 text-lg leading-8 text-neutral-400">
                Have questions about our services? Want to learn more about how
                we can help? We're here to help and answer any question you
                might have.
              </p>
            </motion.div>

            {/* Contact Form Section */}
            <div className="mx-auto mt-16 max-w-2xl">
              <motion.div variants={itemVariants}>
                <ContactForm />
              </motion.div>
            </div>

            {/* Additional Contact Sections */}
            {/* <div className="mx-auto mt-24 max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div variants={itemVariants}>
                  <ContactMethods />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <SupportOptions />
                </motion.div>
              </div>
            </div> */}
          </div>

          <Footer />
        </motion.main>
      </motion.div>
    </AnimatePresence>
  );
}
