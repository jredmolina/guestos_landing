import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  motion,
  useSpring as useFramerSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../Navbar";
import useIsMobile from "@/hooks/use-is-mobile";
import { toast } from "sonner";

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

interface Feature {
  icon: string;
  text: string;
  description: string;
}

const Background = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div className="absolute inset-0">
        <Image
          src="/assets/platform/platform_header2.jpg"
          alt="About GuestOS"
          fill
          priority
          quality={100}
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

const imageVariants = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.2, 0.1, 0.3, 1],
    },
  },
};

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView: isInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features: Feature[] = [
    {
      icon: "🎁",
      text: "Personalized AI Concierge",
      description: "Custom-built and trained specifically for your property",
    },
    {
      icon: "📱",
      text: "Dedicated Guest Line",
      description: "Exclusive phone number for guest calls and text messages",
    },
    {
      icon: "💬",
      text: "Core Dashboard Access",
      description: "View all conversation transcripts and monitor interactions",
    },
    {
      icon: "📚",
      text: "Knowledge Base Control",
      description:
        "Full control to update and maintain your property information",
    },
    {
      icon: "⚡",
      text: "Future-Ready",
      description: "Option to add advanced capabilities as your needs grow",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-hotel-council-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          emailAddress: formData.email,
          phoneNumber: formData.phone,
          propertyDescription: formData.description,
        }),
      });

      if (response.ok) {
        toast.success("Message sent! We will get back to you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          companyWebsite: "",
          email: "",
          phone: "",
          description: "",
        });
      } else {
        const errorText = await response.text();
        console.error("Form submission error:", errorText);

        if (response.status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else if (response.status === 400) {
          toast.error("Invalid form data. Please check your inputs.");
        } else if (response.status === 401 || response.status === 403) {
          toast.error("Authentication failed. Please refresh and try again.");
        } else {
          toast.error(
            `Failed to send message (${response.status}). Please try again later.`
          );
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Background />
      {/* <SnowEffect /> */}

      <motion.div className="relative z-20 flex h-full flex-col">
        <Navbar isFixed={false} />

        <div className="container mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="mb-12">
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-2.5 backdrop-blur-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text font-medium tracking-wider text-transparent">
                SF HOTEL COUNCIL SPECIAL
              </span>{" "}
              🌉
            </motion.div>

            <motion.h1
              className="mt-8 text-5xl font-light leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                Give Your Guests
                <br />
                The Gift of AI
              </span>
              <div className="mt-6 space-y-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent block text-3xl sm:text-4xl lg:text-5xl">
                  $99/month for 3 months
                </span>
                <span className="text-white/70 text-lg font-light block ">
                  Lock in this special San Francisco Hotel Council rate today ⭐
                  <span className="text-white/70  block">
                    (Standard rate: $999 /mo)
                  </span>
                </span>
              </div>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Package Details */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-light flex items-center gap-3">
                  <span>This Package Includes:</span>
                </h2>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-4 rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md hover:bg-black/50 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-2xl">
                        {feature.icon}
                      </span>
                      <div>
                        <span className="block text-lg font-medium text-white/90">
                          {feature.text}
                        </span>
                        <span className="text-sm text-white/60">
                          {feature.description}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="relative rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <span>San Francisco Hotel Council Offer Terms</span>
                    <span className="text-purple-400">•</span>
                  </h3>
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-white/80 flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      Special offer valid until October 31, 2025
                    </p>
                    <p className="text-sm leading-relaxed text-white/70 flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      Discounted period begins after your AI Concierge is built
                      and activated
                    </p>
                    <p className="text-sm leading-relaxed text-white/70 flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      Rate locks in at $99/month for the first 3 months
                    </p>
                    <p className="text-sm leading-relaxed text-white/70 flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      We'll reach out after signup to schedule your setup
                      appointment
                    </p>
                  </div>
                </div>

                {/* <PlatformPreview /> */}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="relative">
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <div className="relative space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "firstName",
                        label: "First Name",
                        type: "text",
                        required: true,
                      },
                      {
                        name: "lastName",
                        label: "Last Name",
                        type: "text",
                        required: true,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-white/90">
                          {field.label}*
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white backdrop-blur-sm transition-all placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    {
                      name: "companyName",
                      label: "Company Name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "companyWebsite",
                      label: "Company Website",
                      type: "text",
                      required: false,
                      pattern:
                        "(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)",
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      type: "email",
                      required: true,
                    },
                    {
                      name: "phone",
                      label: "Phone Number",
                      type: "tel",
                      required: false,
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-white/90">
                        {field.label}
                        {field.required && "*"}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white backdrop-blur-sm transition-all placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-white/90">
                      Property Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white backdrop-blur-sm transition-all placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      placeholder="Tell us about your property and goals for using the concierge..."
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <motion.button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-white shadow-lg transition-all hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 font-medium text-lg">
                        Claim Your Exclusive Offer 🎁
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>

                    <div className="space-y-2 pt-4 border-t border-white/10 text-center">
                      <p className="text-xs text-white/40">
                        Upon submission, our team will contact you to coordinate
                        your onboarding
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
