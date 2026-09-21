"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  ArrowLeft,
  Lock,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Playfair_Display, Anton, Inter } from "next/font/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";

// Initialize Google Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// --- ZOD VALIDATION SCHEMA ---
const recruitmentSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    personalEmail: z.string().email("Valid personal email is required"),
    collegeEmail: z
      .string()
      .email("Valid college email is required")
      .endsWith("@srmist.edu.in", "Must be your @srmist.edu.in email"),
    regNumber: z
      .string()
      .regex(/^RA[0-9]{13}$/i, "Must be valid format (e.g., RA241100301024)"),
    contactNumber: z
      .string()
      .min(10, "Valid WhatsApp number is required")
      .regex(/^[0-9+\-\s()]*$/, "Numbers only"),
    academicYear: z.string().min(1, "Please select your year"),
    domain: z.string().min(1, "Please select your 1st preference"),
    secondPreference: z.string().optional(),
    proficiency: z.string().min(1, "Please select your proficiency"),

    // New General Questions
    traits: z.string().min(10, "Please provide 3 traits"),
    commitment: z.string().min(10, "Please describe your commitment"),
    pastExperience: z.string().min(2, "Please share your experience (or NA)"),
    expectations: z.string().min(10, "Please share your expectations"),
    motivation: z
      .string()
      .min(20, "Please write at least 20 characters")
      .max(500, "Maximum 500 characters allowed"),

    // Links
    github: z
      .string()
      .url("Must be a valid URL (https://github.com/...)")
      .or(z.literal("")),
    linkedin: z
      .string()
      .url("Must be a valid URL (https://linkedin.com/in/...)"),
    instagram: z
      .string()
      .url("Must be a valid URL")
      .or(z.literal(""))
      .optional(),
    resumeLink: z.string().url("Must be a valid public URL"),
    queries: z.string().optional(),

    // Conditional Canvas Fields
    canvasReason: z.string().optional(),
    canvasSoftware: z.string().optional(),
    portfolioLink: z.string().optional(),

    // Conditional Foundry Fields
    division: z.string().optional(),
    foundryProjects: z.string().optional(),
    foundryTechStack: z.string().optional(),
    foundryAITools: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check if FOUNDRY is selected in either preference
    const isFoundry =
      data.domain.includes("FOUNDRY") ||
      (data.secondPreference && data.secondPreference.includes("FOUNDRY"));
    // Check if CANVAS is selected in either preference
    const isCanvas =
      data.domain.includes("CANVAS") ||
      (data.secondPreference && data.secondPreference.includes("CANVAS"));

    if (isFoundry) {
      if (!data.division)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Division is required for Technical domain",
          path: ["division"],
        });
      if (!data.foundryProjects || data.foundryProjects.length < 5)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide project links",
          path: ["foundryProjects"],
        });
      if (!data.foundryTechStack || data.foundryTechStack.length < 2)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please list your tech stack",
          path: ["foundryTechStack"],
        });
      if (!data.foundryAITools || data.foundryAITools.length < 2)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please list AI tools you use",
          path: ["foundryAITools"],
        });
    }

    if (isCanvas) {
      if (!data.canvasReason || data.canvasReason.length < 10)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please tell us why you want to join Canvas",
          path: ["canvasReason"],
        });
      if (!data.canvasSoftware || data.canvasSoftware.length < 2)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please list software/tools",
          path: ["canvasSoftware"],
        });
      if (!data.portfolioLink)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Portfolio link is required for Canvas",
          path: ["portfolioLink"],
        });
      else {
        try {
          new URL(data.portfolioLink);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be a valid URL",
            path: ["portfolioLink"],
          });
        }
      }
    }
  });

type RecruitmentFormValues = z.infer<typeof recruitmentSchema>;

export default function JoinUsPage() {
  // =========================================================================
  // 🟢 TOGGLE THIS TO OPEN OR CLOSE RECRUITMENTS (true = open, false = closed)
  // =========================================================================
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(true);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RecruitmentFormValues>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      academicYear: "",
      domain: "",
      secondPreference: "",
      division: "",
      proficiency: "",
    },
  });

  const selectedDomain1 = watch("domain");
  const selectedDomain2 = watch("secondPreference");

  const isFoundrySelected =
    selectedDomain1?.includes("FOUNDRY") ||
    selectedDomain2?.includes("FOUNDRY");
  const isCanvasSelected =
    selectedDomain1?.includes("CANVAS") || selectedDomain2?.includes("CANVAS");

  const fireConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#00E5FF", "#7B61FF", "#FF4081", "#00A844"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const onSubmit = async (data: RecruitmentFormValues) => {
    setStatus("submitting");

    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!GOOGLE_SCRIPT_URL) throw new Error("Google Script URL is missing");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setStatus("success");
      fireConfetti();
      reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center p-4 pt-24 pb-24 bg-[#ffffff] overflow-hidden ${inter.className}`}
    >
      {/* Background Styling */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-acm-electric/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-acm-pink/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-acm-violet/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        {!isRecruitmentOpen && (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-black/5 md:p-16"
          >
            <div className="relative flex flex-col items-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-4 py-1.5 text-sm font-bold tracking-wide text-red-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </span>
                RECRUITMENTS CLOSED
              </div>
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-gray-500 shadow-inner">
                <Lock className="h-10 w-10 opacity-80" />
              </div>
              <h1
                className={`mb-4 text-4xl md:text-5xl uppercase tracking-wide text-[#111315] ${anton.className}`}
              >
                Thank You For Your <br />
                <span className="bg-acm-pink bg-clip-text text-transparent">
                  Interest
                </span>
              </h1>
              <p
                className={`mb-10 max-w-lg text-lg text-black/60 leading-relaxed italic ${playfair.className}`}
              >
                Our recruitment process for the ACM Student Chapter SRMIST is
                currently closed. We are overwhelmed by the response and are
                excited to work with our new cohort!
                <br />
                <br />
                Stay tuned for future opportunities, workshops, and open events
                by following our social media channels.
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://www.instagram.com/srm.acm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#111315] px-8 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95 sm:w-auto"
                >
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <Instagram className="h-5 w-5" />
                    Follow on Instagram
                  </span>
                </a>
                <Link
                  href="/"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-gray-50 px-8 py-4 font-bold text-[#111315] transition-colors hover:bg-gray-100 hover:text-acm-blue sm:w-auto active:scale-95 transition-transform"
                >
                  <ArrowLeft className="h-5 w-5" /> Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {isRecruitmentOpen && (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-black/5 md:p-12 lg:p-16"
          >
            <div className="text-center mb-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-50 px-4 py-1.5 text-sm font-bold tracking-wide text-green-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                </span>
                RECRUITMENTS OPEN FOR 2026
              </div>
              <h1
                className={`text-4xl md:text-6xl text-[#111315] uppercase tracking-wide mb-4 ${anton.className}`}
              >
                Join the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-acm-blue to-acm-violet">
                  Legacy
                </span>
              </h1>
              <p
                className={`text-lg text-black/60 italic ${playfair.className}`}
              >
                Fill out the form below to apply for the core team. All fields
                marked with an asterisk (<span className="text-red-500">*</span>
                ) are mandatory.
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center relative z-20"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2
                  className={`text-3xl uppercase tracking-wide text-[#111315] mb-4 ${anton.className}`}
                >
                  Application Submitted!
                </h2>
                <p
                  className={`text-xl text-black/60 italic max-w-md ${playfair.className}`}
                >
                  Thank you for applying to ACM SRMIST. Our team will review
                  your application and get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-8 py-3 bg-[#111315] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 relative z-20"
              >
                {/* 1. Personal Info Section */}
                <div className="space-y-6">
                  <h3
                    className={`text-2xl text-[#111315] uppercase tracking-wider border-b border-gray-100 pb-2 ${anton.className}`}
                  >
                    1. Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("fullName")}
                        className={`w-full bg-[#F8F7F4] border ${errors.fullName ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        SRM Registration Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("regNumber")}
                        className={`w-full bg-[#F8F7F4] border ${errors.regNumber ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] uppercase outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                        placeholder="RA241100301024"
                      />
                      {errors.regNumber && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.regNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Personal Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("personalEmail")}
                        type="email"
                        className={`w-full bg-[#F8F7F4] border ${errors.personalEmail ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                        placeholder="pius@gmail.com"
                      />
                      {errors.personalEmail && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.personalEmail.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        College Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("collegeEmail")}
                        type="email"
                        className={`w-full bg-[#F8F7F4] border ${errors.collegeEmail ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                        placeholder="jd1234@srmist.edu.in"
                      />
                      {errors.collegeEmail && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.collegeEmail.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Contact Number (WhatsApp){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("contactNumber")}
                        type="tel"
                        className={`w-full bg-[#F8F7F4] border ${errors.contactNumber ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                        placeholder="+91 9876543210"
                      />
                      {errors.contactNumber && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.contactNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Year of Study <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("academicYear")}
                        className={`w-full bg-[#F8F7F4] border ${errors.academicYear ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select Year...
                        </option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                      </select>
                      {errors.academicYear && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.academicYear.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Domain Selection Section */}
                <div className="space-y-6">
                  <h3
                    className={`text-2xl text-[#111315] uppercase tracking-wider border-b border-gray-100 pb-2 mt-8 ${anton.className}`}
                  >
                    2. Role Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        1st Preference (Domain){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("domain")}
                        className={`w-full bg-[#F8F7F4] border ${errors.domain ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select 1st Preference...
                        </option>
                        <option value="FOUNDRY (Technical)">
                          FOUNDRY (Technical)
                        </option>
                        <option value="AMPLIFIER (PR & Outreach)">
                          AMPLIFIER (PR & Outreach)
                        </option>
                        <option value="ELEVATORS (Sponsorship & Finance)">
                          ELEVATORS (Sponsorship & Finance)
                        </option>
                        <option value="CANVAS (Media, Creatives & Photo/Video)">
                          CANVAS (Media, Creatives & Photo/Video)
                        </option>
                        <option value="ORCHESTRATORS (Corporate & Events)">
                          ORCHESTRATORS (Corporate & Events)
                        </option>
                      </select>
                      {errors.domain && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.domain.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        2nd Preference (Domain)
                      </label>
                      <select
                        {...register("secondPreference")}
                        className="w-full bg-[#F8F7F4] border border-gray-200 rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all cursor-pointer"
                      >
                        <option value="" disabled>
                          Select 2nd Preference...
                        </option>
                        <option value="None">
                          None (Only interested in 1st choice)
                        </option>
                        <option value="FOUNDRY (Technical)">
                          FOUNDRY (Technical)
                        </option>
                        <option value="AMPLIFIER (PR & Outreach)">
                          AMPLIFIER (PR & Outreach)
                        </option>
                        <option value="ELEVATORS (Sponsorship & Finance)">
                          ELEVATORS (Sponsorship & Finance)
                        </option>
                        <option value="CANVAS (Media, Creatives & Photo/Video)">
                          CANVAS (Media, Creatives & Photo/Video)
                        </option>
                        <option value="ORCHESTRATORS (Corporate & Events)">
                          ORCHESTRATORS (Corporate & Events)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional Technical Division Dropdown */}
                  <AnimatePresence>
                    {isFoundrySelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-acm-electric/10 overflow-hidden"
                      >
                        <div className="bg-acm-electric/5 rounded-2xl p-6 border border-acm-electric/20 space-y-6">
                          <h4 className="text-acm-electric font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-acm-electric animate-pulse"></span>{" "}
                            Foundry Specific Questions
                          </h4>

                          <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-acm-electric pl-1">
                              Technical Division{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              {...register("division")}
                              className={`w-full bg-white border ${errors.division ? "border-red-500" : "border-acm-electric/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-electric focus:ring-2 focus:ring-acm-electric/20 cursor-pointer`}
                            >
                              <option value="" disabled>
                                Select Division...
                              </option>
                              <option value="Competitive Programming (DSA)">
                                Competitive Programming (DSA)
                              </option>
                              <option value="Full Stack + Cloud & DevOps">
                                Full Stack + Cloud & DevOps
                              </option>
                              <option value="AI/ML + MLOps">
                                AI/ML + MLOps
                              </option>
                            </select>
                            {errors.division && (
                              <p className="text-red-500 text-xs font-bold pl-2">
                                {errors.division.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-acm-electric pl-1">
                              Best 2 Projects (GitHub Links){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              {...register("foundryProjects")}
                              rows={2}
                              className={`w-full bg-white border ${errors.foundryProjects ? "border-red-500" : "border-acm-electric/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-electric focus:ring-2 focus:ring-acm-electric/20 resize-none`}
                              placeholder="Paste your 2 best project links here..."
                            />
                            {errors.foundryProjects && (
                              <p className="text-red-500 text-xs font-bold pl-2">
                                {errors.foundryProjects.message}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-widest uppercase text-acm-electric pl-1">
                                Tech Stacks / Languages{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                {...register("foundryTechStack")}
                                className={`w-full bg-white border ${errors.foundryTechStack ? "border-red-500" : "border-acm-electric/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-electric`}
                                placeholder="React, Node, Python, C++..."
                              />
                              {errors.foundryTechStack && (
                                <p className="text-red-500 text-xs font-bold pl-2">
                                  {errors.foundryTechStack.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-widest uppercase text-acm-electric pl-1">
                                AI Tools Used Daily{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                {...register("foundryAITools")}
                                className={`w-full bg-white border ${errors.foundryAITools ? "border-red-500" : "border-acm-electric/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-electric`}
                                placeholder="ChatGPT, Copilot, Cursor..."
                              />
                              {errors.foundryAITools && (
                                <p className="text-red-500 text-xs font-bold pl-2">
                                  {errors.foundryAITools.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conditional Canvas Questions */}
                  <AnimatePresence>
                    {isCanvasSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-acm-pink/10 overflow-hidden"
                      >
                        <div className="bg-acm-pink/5 rounded-2xl p-6 border border-acm-pink/20 space-y-6">
                          <h4 className="text-acm-pink font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-acm-pink animate-pulse"></span>{" "}
                            Canvas Specific Questions
                          </h4>

                          <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-acm-pink pl-1">
                              Why do you want to join Canvas in particular?{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              {...register("canvasReason")}
                              rows={2}
                              className={`w-full bg-white border ${errors.canvasReason ? "border-red-500" : "border-acm-pink/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-pink focus:ring-2 focus:ring-acm-pink/20 resize-none`}
                              placeholder="Your creative motivation..."
                            />
                            {errors.canvasReason && (
                              <p className="text-red-500 text-xs font-bold pl-2">
                                {errors.canvasReason.message}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-widest uppercase text-acm-pink pl-1">
                                Software/Tools Known{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                {...register("canvasSoftware")}
                                className={`w-full bg-white border ${errors.canvasSoftware ? "border-red-500" : "border-acm-pink/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-pink`}
                                placeholder="Figma, Premiere Pro, After Effects..."
                              />
                              {errors.canvasSoftware && (
                                <p className="text-red-500 text-xs font-bold pl-2">
                                  {errors.canvasSoftware.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-widest uppercase text-acm-pink pl-1">
                                Drive Link of Previous Work{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                {...register("portfolioLink")}
                                className={`w-full bg-white border ${errors.portfolioLink ? "border-red-500" : "border-acm-pink/30"} rounded-xl px-5 py-4 text-[#111315] outline-none focus:border-acm-pink`}
                                placeholder="Ensure access is 'Anyone with link'"
                              />
                              {errors.portfolioLink && (
                                <p className="text-red-500 text-xs font-bold pl-2">
                                  {errors.portfolioLink.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                      Rate your overall proficiency{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("proficiency")}
                      className={`w-full bg-[#F8F7F4] border ${errors.proficiency ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select Level...
                      </option>
                      <option value="1 - Beginner">
                        1 - Beginner (Just starting out)
                      </option>
                      <option value="2 - Novice">
                        2 - Novice (Basic understanding)
                      </option>
                      <option value="3 - Intermediate">
                        3 - Intermediate (Can build/work independently)
                      </option>
                      <option value="4 - Advanced">
                        4 - Advanced (Strong portfolio/experience)
                      </option>
                      <option value="5 - Expert">
                        5 - Expert (Ready to lead and mentor)
                      </option>
                    </select>
                    {errors.proficiency && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.proficiency.message}
                      </p>
                    )}
                  </div>

                  {/* General Questionnaire */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Define 3 traits why we should recruit you{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("traits")}
                        className={`w-full bg-[#F8F7F4] border ${errors.traits ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue`}
                        placeholder="E.g., Hardworking, Creative, Leader"
                      />
                      {errors.traits && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.traits.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Previous Club Experience{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("pastExperience")}
                        className={`w-full bg-[#F8F7F4] border ${errors.pastExperience ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue`}
                        placeholder="Club Name, Position, Domain (or NA)"
                      />
                      {errors.pastExperience && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.pastExperience.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                      How would you describe your commitment towards a club?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("commitment")}
                      rows={2}
                      className={`w-full bg-[#F8F7F4] border ${errors.commitment ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue resize-none`}
                      placeholder="How much time/effort can you give?"
                    />
                    {errors.commitment && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.commitment.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                      What are your expectations from ACM?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("expectations")}
                      rows={2}
                      className={`w-full bg-[#F8F7F4] border ${errors.expectations ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue resize-none`}
                      placeholder="What do you hope to learn or achieve?"
                    />
                    {errors.expectations && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.expectations.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                      Why do you want to join ACM SRMIST overall?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("motivation")}
                      rows={3}
                      className={`w-full bg-[#F8F7F4] border ${errors.motivation ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue resize-none`}
                      placeholder="Tell us your motivation..."
                    />
                    {errors.motivation && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.motivation.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Links Section */}
                <div className="space-y-6">
                  <h3
                    className={`text-2xl text-[#111315] uppercase tracking-wider border-b border-gray-100 pb-2 mt-8 ${anton.className}`}
                  >
                    3. Portfolio & Links
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        GitHub Profile URL
                      </label>
                      <input
                        {...register("github")}
                        className={`w-full bg-[#F8F7F4] border ${errors.github ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue`}
                        placeholder="https://github.com/username"
                      />
                      {errors.github && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.github.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        LinkedIn Profile URL{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("linkedin")}
                        className={`w-full bg-[#F8F7F4] border ${errors.linkedin ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue`}
                        placeholder="https://linkedin.com/in/username"
                      />
                      {errors.linkedin && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.linkedin.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Link to Resume/CV{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("resumeLink")}
                        className={`w-full bg-[#F8F7F4] border ${errors.resumeLink ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue`}
                        placeholder="Ensure access is 'Anyone with link'"
                      />
                      {errors.resumeLink && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.resumeLink.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                        Instagram URL
                      </label>
                      <input
                        {...register("instagram")}
                        className={`w-full bg-[#F8F7F4] border ${errors.instagram ? "border-red-500" : "border-gray-200"} rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue`}
                        placeholder="https://instagram.com/username"
                      />
                      {errors.instagram && (
                        <p className="text-red-500 text-xs font-bold pl-2">
                          {errors.instagram.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-black/60 pl-1">
                      Any other queries or requests?
                    </label>
                    <textarea
                      {...register("queries")}
                      rows={2}
                      className="w-full bg-[#F8F7F4] border border-gray-200 rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue resize-none"
                      placeholder="Optional..."
                    />
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#111315] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === "submitting"
                      ? "Submitting..."
                      : "Submit Application"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 px-4 py-2 rounded-full"
                    >
                      <AlertCircle className="w-4 h-4" /> Submission failed. Try
                      again.
                    </motion.div>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
