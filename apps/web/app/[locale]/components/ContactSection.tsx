import React from "react";
import { CiAt, CiPhone } from "react-icons/ci";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  BsWhatsapp,
} from "react-icons/bs";
import ContactForm from "../contact/ContactForm";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

export const ContactSection = () => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <section className="lg:flex section-aurora noise-overlay p-4 md:p-8 lg:p-10 ">
        <div className="flex flex-col justify-center w-full p-6 lg:p-8 lg:w-5/12 xl:w-2/5 rounded-3xl">
          <h2 className="text-4xl font-bold text-foreground capitalize lg:text-5xl headline-glow tracking-tight">
            Let&apos;s Talk
          </h2>

          <p className="mt-6 text-muted-soft hero-subtitle text-lg leading-relaxed">
            I&apos;m always open to discussing product design work or partnership opportunities. Let&apos;s build something great together.
          </p>

          <div className="mt-8 md:mt-12 bg-background/30 p-6 rounded-2xl border-white/5 backdrop-blur-sm">
            <h3 className="font-semibold text-foreground tracking-wide uppercase text-sm mb-4">
              Get in touch
            </h3>

            <ul className="space-y-5">
              <li>
                <a href="tel:+963956954441" className="group flex items-center gap-4 text-muted-soft hover:text-primary transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CiPhone className="text-2xl text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">Phone</p>
                    <span className="font-medium">+963 956 954 441</span>
                  </div>
                </a>
              </li>

              <li>
                <a href="mailto:MohammadKhayata.gm@gmail.com" className="group flex items-center gap-4 text-muted-soft hover:text-primary transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CiAt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">Email</p>
                    <span className="font-medium">MohammadKhayata.gm@gmail.com</span>
                  </div>
                </a>
              </li>
            </ul>

            <hr className="faded-divider my-8" />

            <h3 className="font-semibold text-foreground tracking-wide uppercase text-sm mb-4">
              Social Profiles
            </h3>
            <div className="flex gap-3 flex-wrap">
              <a
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-white/5 text-muted-soft hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                href="https://www.linkedin.com/in/mohammad-khayata-9169801a9"
                target="_blank" rel="noreferrer"
              >
                <BsLinkedin />
              </a>
              <a
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-white/5 text-muted-soft hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                href="https://github.com/Mohammad-Khayata-4441"
                target="_blank" rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-white/5 text-muted-soft hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                href="https://t.me/Mohammadkh4441"
                target="_blank" rel="noreferrer"
              >
                <BsTelegram className="text-lg" />
              </a>
              <a
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-white/5 text-muted-soft hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                href="https://www.facebook.com/mohammed.kh.165033/"
                target="_blank" rel="noreferrer"
              >
                <BsFacebook />
              </a>
              <a
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-white/5 text-muted-soft hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                href="https://www.instagram.com/mohammad_khayat4441/"
                target="_blank" rel="noreferrer"
              >
                <BsInstagram className="text-lg" />
              </a>
              <a
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background border border-white/5 text-muted-soft hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                href="https://wa.me/+963956954441"
                target="_blank" rel="noreferrer"
              >
                <BsWhatsapp className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full p-6 lg:p-12 lg:w-7/12 xl:w-3/5 rounded-3xl mt-8 lg:mt-0 relative">
          <Card className="relative z-10 w-full mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">Send a Message</h2>
            </CardHeader>
            <CardContent className="mb-8 hidden lg:block">
              <p className="text-muted-soft mt-2">Fill out the form below and I'll get back to you within 24 hours.</p>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
