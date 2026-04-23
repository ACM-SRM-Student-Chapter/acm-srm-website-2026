"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Playfair_Display, Anton, Inter } from "next/font/google";

// Form Validation Imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// --- ZOD VALIDATION SCHEMA ---
const contactSchema = z.object({
  user_name: z.string().min(2, "Name must be at least 2 characters."),
  user_email: z.string().email("Please enter a valid email address."),
  user_phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format."),
  inquiry_type: z.string().min(1, "Please select an inquiry type."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiry_type: "", // Forces user to select an option
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: data.user_name,
          user_email: data.user_email,
          user_phone: data.user_phone,
          inquiry_type: data.inquiry_type,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("success");
      reset(); // Clears the form fields

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center pb-32 pt-32 overflow-hidden bg-[#ffffff] ${inter.className}`}
    >
      {/* Architectural Grey Matrix/Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle Ambient Color Blobs for Light Mode */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-acm-electric/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-acm-pink/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-acm-blue/20 bg-white px-5 py-2 text-sm font-bold tracking-widest uppercase text-acm-blue shadow-sm"
          >
            <MessageSquare className="w-4 h-4" /> Start a Conversation
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl uppercase tracking-widest text-[#111315] mb-6 ${anton.className}`}
          >
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-acm-blue to-acm-violet">
              Touch
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`mx-auto max-w-2xl text-xl text-black/60 ${playfair.className} italic`}
          >
            Whether you're looking to sponsor an event, collaborate on a
            project, or join our core team, our inbox is always open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Info Cards */}
            <div className="flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <div className="w-12 h-12 rounded-full bg-acm-pink/10 border border-acm-pink/20 flex items-center justify-center mb-6">
                  <MapPin className="text-acm-pink w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#111315] mb-2">
                  Visit Office
                </h3>
                <p className="text-black/60 font-medium leading-relaxed">
                  SRM Institute of Science and Technology
                  <br />
                  Kattankulathur, Potheri, Chengalpattu,
                  <br />
                  Tamil Nadu, India - 603203
                </p>
              </div>
            </div>

            {/* Fixed Google Map Embed */}
            <div className="w-full h-64 md:h-80 rounded-[2rem] overflow-hidden border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] bg-gray-100 relative group">
              <iframe
                src="https://maps.google.com/maps?q=SRM%20Institute%20of%20Science%20and%20Technology,%20Kattankulathur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Right Column: The Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <h2
                className={`text-3xl font-black text-[#111315] uppercase tracking-wider mb-8 ${anton.className}`}
              >
                Send an Inquiry
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="user_name"
                      className="text-xs font-bold tracking-widest uppercase text-black/50 pl-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("user_name")}
                      type="text"
                      id="user_name"
                      className={`w-full bg-[#F3F4F6] border ${
                        errors.user_name ? "border-red-500" : "border-gray-200"
                      } rounded-2xl px-5 py-4 text-[#111315] placeholder-gray-400 outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                      placeholder="Pius"
                    />
                    {errors.user_name && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.user_name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="user_email"
                      className="text-xs font-bold tracking-widest uppercase text-black/50 pl-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("user_email")}
                      type="email"
                      id="user_email"
                      className={`w-full bg-[#F3F4F6] border ${
                        errors.user_email ? "border-red-500" : "border-gray-200"
                      } rounded-2xl px-5 py-4 text-[#111315] placeholder-gray-400 outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                      placeholder="pius@example.com"
                    />
                    {errors.user_email && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.user_email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="user_phone"
                      className="text-xs font-bold tracking-widest uppercase text-black/50 pl-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("user_phone")}
                      type="tel"
                      id="user_phone"
                      className={`w-full bg-[#F3F4F6] border ${
                        errors.user_phone ? "border-red-500" : "border-gray-200"
                      } rounded-2xl px-5 py-4 text-[#111315] placeholder-gray-400 outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all`}
                      placeholder="+91 9876543210"
                    />
                    {errors.user_phone && (
                      <p className="text-red-500 text-xs font-bold pl-2">
                        {errors.user_phone.message}
                      </p>
                    )}
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <label
                      htmlFor="inquiry_type"
                      className="text-xs font-bold tracking-widest uppercase text-black/50 pl-1"
                    >
                      Inquiry Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register("inquiry_type")}
                        id="inquiry_type"
                        className={`w-full bg-[#F3F4F6] border ${
                          errors.inquiry_type
                            ? "border-red-500"
                            : "border-gray-200"
                        } rounded-2xl px-5 py-4 text-[#111315] outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="text-gray-400">
                          Select an option...
                        </option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Sponsorship & Partnership">
                          Sponsorship & Partnership
                        </option>
                        <option value="Event Collaboration">
                          Event Collaboration
                        </option>
                        <option value="Membership Query">
                          Membership Query
                        </option>
                      </select>
                      {errors.inquiry_type && (
                        <p className="text-red-500 text-xs font-bold pl-2 mt-2">
                          {errors.inquiry_type.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold tracking-widest uppercase text-black/50 pl-1"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className={`w-full bg-[#F3F4F6] border ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    } rounded-2xl px-5 py-4 text-[#111315] placeholder-gray-400 outline-none focus:border-acm-blue focus:ring-2 focus:ring-acm-blue/20 transition-all resize-none`}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs font-bold pl-2">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button & Status */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#111315] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-600 font-bold text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Message sent
                      successfully!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-red-600 font-bold text-sm"
                    >
                      <AlertCircle className="w-4 h-4" /> Failed to send. Try
                      again.
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
