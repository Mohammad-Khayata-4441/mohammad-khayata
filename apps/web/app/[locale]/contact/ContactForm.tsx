"use client";

import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { submitContactMessage } from "./actions";

const SERVICES = [
  { value: "Fullstack Web/App Developmnt", label: "Fullstack Web/App Developmnt" },
  { value: "Website Development", label: "Website Development" },
  { value: "Employement", label: "Employement" },

];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    error?: string | null;
  } | null>(null);



  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage(null, formData);

    setIsSubmitting(false);
    setStatus(result);

    if (result.success) {
      // Optional: reset the form
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="relative mt-4">
      {status?.success && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Thank you! Your message has been sent.</span>
        </div>
      )}

      {status?.error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{status.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        <div className="relative transition-all duration-300 group">
          <Label htmlFor="name" className="block mb-2 text-muted-soft group-focus-within:text-primary transition-colors">
            Full Name <span className="text-red-500/70">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="John Doe"
            className="input-glass mt-1 rounded-xl focus-visible:ring-primary/50 focus-visible:border-primary disabled:opacity-50 transition-all w-full shadow-sm bg-transparent border-white/10"
          />
        </div>

        <div className="relative transition-all duration-300 group">
          <Label htmlFor="email" className="block mb-2 text-muted-soft group-focus-within:text-primary transition-colors">
            Email address <span className="text-red-500/70">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            placeholder="johndoe@example.com"
            className="input-glass mt-1 rounded-xl focus-visible:ring-primary/50 focus-visible:border-primary disabled:opacity-50 transition-all w-full shadow-sm bg-transparent border-white/10"
          />
        </div>

        <div className="relative transition-all duration-300 group">
          <Label htmlFor="phone" className="block mb-2 text-muted-soft group-focus-within:text-primary transition-colors">
            Phone Number <span className="text-muted-soft/60 font-normal opacity-70">(Optional)</span>
          </Label>
          <Input
            id="phone"
            name="phoneNumber"
            type="tel"
            disabled={isSubmitting}
            placeholder="+1 (555) 000-0000"
            className="input-glass mt-1 rounded-xl focus-visible:ring-primary/50 focus-visible:border-primary disabled:opacity-50 transition-all w-full shadow-sm bg-transparent border-white/10"
          />
        </div>

        {/* <div className="relative transition-all duration-300 group flex flex-col z-10">
          <Label className="block mb-2 text-muted-soft group-focus-within:text-primary transition-colors">
            Service Required <span className="text-muted-soft/60 font-normal opacity-70">(Optional)</span>
          </Label>
          <Select name="service">
            <SelectTrigger className="input-glass text-muted-soft px-4  h-auto rounded-xl border-white/10 bg-transparent hover:bg-background/20 font-normal shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-[15px]">
              <SelectValue placeholder="Select a service..." />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
              {SERVICES.map((s) => (
                <SelectItem
                  key={s.value}
                  value={s.value}
                  className="cursor-pointer hover:bg-primary/20 focus:bg-primary/20 m-1 rounded-md"
                >
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <div className="w-full mt-5 group relative transition-all duration-300">
        <Label htmlFor="message" className="block mb-2 text-muted-soft group-focus-within:text-primary transition-colors">
          Message <span className="text-red-500/70">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          disabled={isSubmitting}
          className="input-glass mt-1 rounded-xl h-32 md:h-48 focus-visible:ring-primary/50 focus-visible:border-primary disabled:opacity-50 transition-all w-full shadow-sm resize-y bg-transparent border-white/10"
          placeholder="What's on your mind?"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 button-glow w-full sm:w-auto px-8 py-6 rounded-xl relative overflow-hidden disabled:opacity-70 transition-all font-semibold text-[15px] shadow-lg shadow-primary/20 hover:shadow-primary/40"
      >
        <span className={`flex items-center gap-2 ${isSubmitting ? "opacity-0" : "opacity-100"}`}>
          <AiOutlineMessage className="text-lg" />
          Send Message
        </span>

        {isSubmitting && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
      </Button>
    </form>
  );
}
