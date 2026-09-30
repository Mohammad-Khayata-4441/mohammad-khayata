"use client";
import Marquee from "react-fast-marquee";
import { clients } from "../data";

export const ClientsMarquee = () => {
  return (
    <section aria-label="عملاء عملنا معهم" className="border-y border-white/[0.06] py-10">
      <p className="text-center text-sm text-foreground/50 mb-8">
        شركات وأعمال عملنا معها
      </p>
      {/* Marquee is kept LTR: its translate animation misbehaves inside an RTL parent */}
      <div dir="ltr">
        <Marquee gradient gradientColor="#000000" gradientWidth={120} speed={35} pauseOnHover>
          {clients.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="mx-8 md:mx-12 flex items-center gap-3 text-foreground/40 hover:text-foreground transition-colors duration-300"
            >
              <Icon className="size-7" strokeWidth={1.5} />
              <span className="text-lg font-semibold tracking-tight whitespace-nowrap">{name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
