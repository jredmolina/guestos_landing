"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const formFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter your phone number (optional)",
    required: false,
  },
  {
    id: "company",
    label: "Company",
    type: "text",
    placeholder: "Enter your company name",
    required: true,
  },
];

const contactInfo = [
  {
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "Email us at",
    value: "jessie@guestos.ai",
  },
  {
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: "Call my GuestOS Concierge at",
    value: "+1 (831) 282-2349",
  },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // Common email providers that would require company name
  const commonEmailProviders = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "proton.me",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "live.com",
    "msn.com",
    "hey.com",
  ];

  // Check if email is from a common provider
  const isCommonEmailProvider = (email: string) => {
    if (!email || !email.includes("@")) return false;
    const domain = email.split("@")[1]?.toLowerCase();
    return commonEmailProviders.includes(domain);
  };

  const shouldShowCompanyField = isCommonEmailProvider(formState.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission logic
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 via-transparent to-transparent opacity-30" />
      </div>

      {/* Contact Info */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        {contactInfo.map((info, index) => (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-primary-gold">
              <info.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-neutral-400">{info.label}</div>
              <div className="text-sm font-medium text-white">{info.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-1">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 * 0.1 }}
            className="space-y-2"
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-300"
            >
              Name
              <span className="ml-1 text-primary-gold">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition-colors duration-300 focus:border-primary-gold/50 focus:outline-none focus:ring-1 focus:ring-primary-gold/50"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 * 0.1 }}
            className="space-y-2"
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-300"
            >
              Email
              <span className="ml-1 text-primary-gold">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition-colors duration-300 focus:border-primary-gold/50 focus:outline-none focus:ring-1 focus:ring-primary-gold/50"
            />
          </motion.div>

          {/* Phone Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 * 0.1 }}
            className="space-y-2"
          >
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-300"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number (optional)"
              value={formState.phone}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition-colors duration-300 focus:border-primary-gold/50 focus:outline-none focus:ring-1 focus:ring-primary-gold/50"
            />
          </motion.div>

          {/* Conditional Company Field */}
          {shouldShowCompanyField && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 3 * 0.1 }}
              className="space-y-2"
            >
              <label
                htmlFor="company"
                className="block text-sm font-medium text-neutral-300"
              >
                Company
                <span className="ml-1 text-primary-gold">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required={shouldShowCompanyField}
                placeholder="Enter your company name"
                value={formState.company}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition-colors duration-300 focus:border-primary-gold/50 focus:outline-none focus:ring-1 focus:ring-primary-gold/50"
              />
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-gold to-primary-gold py-3 text-white shadow-lg shadow-primary-gold/20"
          >
            <span className="relative z-10">
              {isSubmitting ? "Sending..." : "Book Meeting"}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-gold via-white/10 to-primary-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              animate={isSubmitting ? { x: ["0%", "100%"] } : { x: "0%" }}
              transition={{
                duration: 1.5,
                repeat: isSubmitting ? Infinity : 0,
              }}
            />
          </motion.button>

          <p className="text-center text-sm text-neutral-400">
            By submitting this form, you agree to our{" "}
            <a href="/privacy" className="text-primary-gold hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
