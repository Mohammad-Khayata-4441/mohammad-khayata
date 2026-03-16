import Animator from "@/app/components/Animator";
import { Button } from "@/shared/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export const PersonalInfoSection = () => (
  <section className="overflow-hidden mx-auto max-w-(--breakpoint-xl) px-4 md:px-0 section-aurora p-6 md:p-8 noise-overlay">
    <Animator>
      <h1 className="hero-title text-center mb-16 md:mb-20 text-3xl md:text-5xl">
        Personal Information
      </h1>
    </Animator>

    <div className="grid info grid-cols-12">
      <div className="img col-span-12 lg:col-span-4 w-full flex md:justify-center">
        <Animator
          variant="fade"
          className="relative w-[300px] h-[300px] bg-card/70 rounded-4xl overflow-hidden shadow-glow-cyan border-gradient mx-auto lg:mx-0"
        >
          <Image
            style={{ objectPosition: "0 -45px" }}
            objectFit="cover"
            fill
            src="/about/photo.png"
            className="rounded-4xl object-cover object-bottom"
            alt="personal"
          ></Image>
        </Animator>
      </div>

      <div className="info-text col-span-12 lg:col-span-8 grid grid-cols-12 gap-y-8 lg:space-y-0 p-5 md:mt-10 lg:mt-0  rounded-3xl">
        <Animator className="col-span-12 md:col-span-6 flex lg:space-x-4 flex-col lg:flex-row md:items-center lg:items-start w-full">
          <span className="text-muted-soft">Full Name</span>
          <span className="text-foreground font-semibold">
            Mohammad Sabah Khayata
          </span>
        </Animator>
        <Animator className="col-span-12 md:col-span-6 flex lg:space-x-4 flex-col lg:flex-row md:items-center lg:items-start w-full">
          <span className="text-muted-soft">Birthday</span>
          <span className="text-foreground font-semibold">2 May 2001</span>
        </Animator>
        <Animator className="col-span-12 md:col-span-6 flex lg:space-x-4 flex-col lg:flex-row md:items-center lg:items-start w-full">
          <span className="text-muted-soft">Nationality</span>
          <span className="text-foreground font-semibold">Syrian</span>
        </Animator>
        <Animator className="col-span-12 md:col-span-6 flex lg:space-x-4 flex-col lg:flex-row md:items-center lg:items-start w-full">
          <span className="text-muted-soft">Current Address</span>
          <span className="text-foreground font-semibold">Aleppo / Syria</span>
        </Animator>
        <Animator className="col-span-12 md:col-span-6 flex lg:space-x-4 flex-col lg:flex-row md:items-center lg:items-start w-full">
          <span className="text-muted-soft">Email</span>
          <span className="text-foreground font-semibold">
            <a
              className="hover:text-primary"
              href="mailto:mohammad_khayata@outlook.com"
            >
              MohammadKhayata.gm@gmail.com
            </a>
          </span>
        </Animator>
        <Animator className="col-span-12 md:col-span-6 flex lg:space-x-4 flex-col lg:flex-row md:items-center lg:items-start w-full">
          <span className="text-muted-soft">Phone</span>
          <span className="text-foreground font-semibold">
            <a className="hover:text-primary" href="tel:+963956954441">
              +963&nbsp;956&nbsp;954&nbsp;441
            </a>
          </span>
        </Animator>
        <div className="col-span-12">
          <Animator>
            <Button variant={"outline"} className="button-glow">
              Contact <ArrowRightIcon />{" "}
            </Button>
          </Animator>
        </div>
      </div>
    </div>
  </section>
);
