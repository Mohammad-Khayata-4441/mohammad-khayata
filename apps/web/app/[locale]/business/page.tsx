import type { Metadata } from "next";
import Image from "next/image";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { ArrowLeft, Check, CircleCheck, Plus } from "lucide-react";
import { BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { Link } from "@/i18n";
import { Scales } from "@/components/ui/scales";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ClientsMarquee } from "./components/ClientsMarquee";
import {
  LINKEDIN_URL,
  WHATSAPP_URL,
  behindTheScenes,
  decisionLadder,
  discoveryQuestions,
  images,
  possibleSolutions,
  services,
  solutions,
  steps,
} from "./data";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "حلول تقنية للأعمال",
  description:
    "مواقع، أنظمة داخلية، تجارة إلكترونية، أتمتة وتكامل بين الأنظمة — نختار الحل المناسب لاحتياجك، وننفذه بأبسط طريقة عملية.",
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-primary text-sm font-semibold mb-4">{children}</p>
);

const WhatsAppButton = ({ className }: { className?: string }) => (
  <Button asChild size="lg" className={cn("h-12 text-base", className)}>
    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
      <BsWhatsapp className="size-5" />
      تحدث معي عبر واتساب
    </a>
  </Button>
);

const PortfolioButton = ({ label }: { label: string }) => (
  <Button asChild size="lg" variant="outline" className="h-12 text-base">
    <Link href="/portfolio">
      شاهد بعض أعمالي
      <ArrowLeft className="size-4" />
    </Link>
  </Button>
);

const Hero = () => (
  <section className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
    <div className="lg:col-span-7">
      {/* <div className="flex items-center gap-4 mb-8">
        <div className="relative size-14 shrink-0 rounded-full overflow-hidden border-2 border-primary/40">
          <Image src="/about/photo.png" alt="محمد خياطة" fill sizes="56px" className="object-cover" />
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">محمد خياطة</p>
          <p className="text-sm text-foreground/60">
            مهندس برمجيات وخبير في الحلول التقنية للشركات والمؤسسات
          </p>
        </div>
      </div> */}
      <h1 className="text-4xl md:text-6xl font-bold leading-[1.3] md:leading-[1.25] text-foreground text-balance">
        حلول تقنية تساعد عملك على <span className="text-primary">العمل بشكل أفضل</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/70 max-w-2xl">
        مواقع، أنظمة داخلية، تجارة إلكترونية، أتمتة وتكامل بين الأنظمة — نختار الحل المناسب
        لاحتياجك، وننفذه بأبسط طريقة عملية.
      </p>
      <div className="mt-8 space-y-2 text-foreground/60 leading-relaxed max-w-xl border-s-2 border-primary/40 ps-5">
        <p>لست بحاجة دائمًا إلى بناء نظام من الصفر.</p>
        <p>
          أحيانًا يكون الحل الأفضل نظامًا جاهزًا، أو خدمة موجودة، أو ربطًا بسيطًا بين عدة أدوات، أو
          تعاونًا مع جهة متخصصة.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <WhatsAppButton />
        <PortfolioButton label="شاهد نماذج من أعمالنا" />
      </div>
    </div>

    <div className="lg:col-span-5 relative">
      <div className="relative mx-auto w-full max-w-sm">
        <div className="relative aspect-[4/5] w-full">
          <div className="absolute -inset-y-[15%] -left-10 h-[130%] w-8 mask-t-from-90% mask-b-from-90%">
            <Scales size={8} className="rounded-lg" />
          </div>
          <div className="absolute -inset-y-[15%] -right-10 h-[130%] w-8 mask-t-from-90% mask-b-from-90%">
            <Scales size={8} className="rounded-lg" />
          </div>
          <div className="absolute -inset-x-[15%] -top-10 h-8 w-[130%] mask-r-from-90% mask-l-from-90%">
            <Scales size={8} className="rounded-lg" />
          </div>
          <div className="absolute -inset-x-[15%] -bottom-10 h-8 w-[130%] mask-r-from-90% mask-l-from-90%">
            <Scales size={8} className="rounded-lg" />
          </div>

          <div className="relative z-10 h-full w-full overflow-hidden border border-white/[0.08] shadow-sm">
            <Image
              src={images.hero}
              alt="محمد خياطة"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /> */}
          </div>
        </div>
{/* 
        <div className="glass absolute -bottom-6 start-4 end-4 rounded-2xl p-5 flex items-center gap-4 z-20">
          <div className="size-11 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
            <CircleCheck className="size-6 text-primary" />
          </div>
          <p className="font-semibold text-foreground leading-snug">
            المهم أن يعمل الحل ويخدم عملك.
          </p>
        </div> */}
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="container mx-auto px-4">
    <div className="max-w-2xl mb-12">
      <Eyebrow>الخدمات</Eyebrow>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight">ماذا يمكنني أن أساعدك فيه؟</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      {services.map(({ icon: Icon, title, body, items, note, image, formula }) => (
        <article
          key={title}
          className="glass-card rounded-3xl overflow-hidden flex flex-col transition-colors duration-300"
        >
          {image && (
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-80" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" /> */}
            </div>
          )}
          <div className="p-7 md:p-8 flex flex-col gap-4 flex-1">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon className="size-6 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-foreground/65 leading-relaxed">{body}</p>

            {items && (
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-1">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-foreground/80 text-[15px]">
                    <Check className="size-4 text-primary mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {formula && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {formula.map((part, i) => (
                  <span key={part} className="flex items-center gap-2">
                    {i > 0 && <Plus className="size-4 text-primary" />}
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold">
                      {part}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {note && <p className="mt-auto pt-4 text-sm text-foreground/50 border-t border-white/[0.06]">{note}</p>}
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Approach = () => (
  <section className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <div>
      <Eyebrow>طريقة التفكير</Eyebrow>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight">
        لا نبدأ بالبناء…
        <br />
        <span className="text-primary">نبدأ بفهم المشكلة</span>
      </h2>
      <p className="mt-6 text-lg text-foreground/65 leading-relaxed">
        عندما تخبرنا أنك تحتاج إلى &quot;نظام&quot;، لن نبدأ مباشرة بكتابة الكود. سنحاول أولًا فهم:
      </p>

      <ol className="mt-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {discoveryQuestions.map((question, i) => (
          <li key={question} className="flex items-baseline gap-5 py-4">
            <span className="text-sm font-semibold text-primary/80 tabular-nums">0{i + 1}</span>
            <span className="text-lg md:text-xl font-semibold">{question}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="space-y-6">
      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/[0.08]">
        <Image src={images.planning} alt="فريق يخطط على السبورة" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="glass-card rounded-3xl p-7">
        <p className="text-foreground/65 mb-4">ثم نبحث عن أبسط حل مناسب. قد يكون الحل:</p>
        <div className="flex flex-wrap gap-2">
          {possibleSolutions.map((solution) => (
            <span
              key={solution}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-foreground/85"
            >
              {solution}
            </span>
          ))}
        </div>
        <p className="mt-5 font-semibold text-primary">لا نعيد بناء ما هو موجود دون سبب.</p>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <Eyebrow>الخبرة</Eyebrow>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
        خبرة في بناء الأنظمة، وليس مجرد مواقع
      </h2>
      <p className="mt-6 text-lg text-foreground/65 leading-relaxed">
        خلال سنوات العمل، شاركت في بناء وإطلاق عدد من المنصات والأنظمة المستخدمة فعليًا في الأعمال،
        من منصات التجارة الإلكترونية وSaaS إلى أنظمة ERP والأنظمة التشغيلية. لذلك نهتم ليس فقط بشكل
        الواجهة، وإنما أيضًا بما يحدث خلفها:
      </p>
      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {behindTheScenes.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-primary/20 bg-primary/[0.06] px-5 py-3 font-semibold text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Solutions = () => (
  <section className="container mx-auto px-4">
    <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
      <div className="max-w-2xl">
        <Eyebrow>من أعمالنا</Eyebrow>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">بعض الحلول التي عملنا عليها</h2>
      </div>
      <PortfolioButton label="عرض جميع الأعمال" />
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      {solutions.map(({ title, body, image, featured }) => (
        <article
          key={title}
          className={cn(
            "group relative rounded-3xl overflow-hidden border border-white/[0.08] flex flex-col justify-end",
            featured ? "min-h-[26rem]" : "min-h-[20rem]"
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/10" />
          <div className="relative p-7 md:p-9">
            <h3 className="text-2xl md:text-3xl font-bold" dir="auto">
              {title}
            </h3>
            <p className="mt-3 text-foreground/70 leading-relaxed max-w-lg">{body}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Decision = () => (
  <section className="container mx-auto px-4 grid lg:grid-cols-12 gap-10 lg:gap-16">
    <div className="lg:col-span-5">
      <Eyebrow>سؤال نسمعه كثيرًا</Eyebrow>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight">هل أحتاج إلى تطوير نظام خاص؟</h2>
      <p className="mt-6 text-4xl md:text-5xl font-bold text-primary">ليس بالضرورة.</p>
      <p className="mt-6 text-lg text-foreground/65 leading-relaxed">
        نفضل دائمًا الاستفادة من الحلول الموجودة قبل البدء من الصفر.
      </p>
    </div>

    <ol className="lg:col-span-7 space-y-3">
      {decisionLadder.map(({ when, then }) => (
        <li
          key={when}
          className="glass-card rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-3"
        >
          <span className="text-foreground/75">{when}</span>
          <span className="font-bold">{then}</span>
        </li>
      ))}
      <li className="rounded-2xl px-6 py-6 bg-primary text-primary-foreground">
        <p className="text-primary-foreground/85">
          وإذا لم يوجد حل مناسب، أو كانت احتياجاتك تتطلب شيئًا خاصًا،
        </p>
        <p className="mt-1 text-2xl font-bold">نبني الحل الذي تحتاجه.</p>
      </li>
    </ol>
  </section>
);

const Process = () => (
  <section className="container mx-auto px-4">
    <div className="max-w-2xl mb-12">
      <Eyebrow>خطوات العمل</Eyebrow>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight">كيف نعمل؟</h2>
    </div>
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {steps.map(({ title, body }, i) => (
        <li key={title} className="relative border-t-2 border-white/10 pt-6">
          <span className="absolute -top-[2px] start-0 h-[2px] w-12 bg-primary" />
          <span className="text-5xl font-bold text-foreground/15 tabular-nums">0{i + 1}</span>
          <h3 className="mt-3 text-xl font-bold">{title}</h3>
          <p className="mt-3 text-foreground/60 leading-relaxed">{body}</p>
        </li>
      ))}
    </ol>
  </section>
);

const FinalCta = () => (
  <section className="container mx-auto px-4">
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08]">
      <Image src={images.planning} alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-black/60" />
      <div className="relative px-6 py-16 md:px-14 md:py-24 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
          لديك مشروع أو مشكلة تحتاج إلى حل؟
        </h2>
        <p className="mt-6 text-lg text-foreground/65 leading-relaxed">
          لا تحتاج إلى معرفة اسم التقنية أو نوع النظام الذي تحتاجه.
        </p>
        <p className="mt-3 text-xl md:text-2xl font-bold">
          أخبرنا فقط بما تريد أن يصبح أسهل في عملك.
        </p>
        <p className="mt-3 text-foreground/65">سنساعدك على تحديد الطريقة الأنسب للوصول إليه.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <WhatsAppButton />
          <PortfolioButton label="شاهد الأعمال السابقة" />
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <footer className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 border-t border-white/[0.06] pt-16">
      <div>
        <h2 className="text-3xl font-bold">محمد خياطة</h2>
        <p className="mt-2 text-primary font-semibold">حلول تقنية وأنظمة أعمال</p>
        <p className="mt-6 text-foreground/65 leading-relaxed max-w-lg">
          أساعد الشركات والأعمال على بناء حلول رقمية عملية، من المواقع والأنظمة الداخلية إلى التجارة
          الإلكترونية والأتمتة والتكامل بين الأنظمة.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <BsWhatsapp /> WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <BsLinkedin /> LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/portfolio">الأعمال السابقة</Link>
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm text-foreground/50 mb-4">المبدأ بسيط:</p>
        <blockquote className="border-s-2 border-primary ps-6 text-xl md:text-2xl font-semibold leading-relaxed">
          لا نبني من الصفر ما يمكن استخدامه جاهزًا، ولا نستخدم حلًا جاهزًا عندما تكون هناك حاجة حقيقية
          إلى شيء مخصص.
        </blockquote>
        <div className="mt-8 text-foreground/65 leading-relaxed">
          <p>الهدف ليس بناء برنامج جميل.</p>
          <p className="text-foreground font-bold">الهدف أن يعمل الحل لصالح عملك.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default function BusinessPage() {
  return (
    <div
      dir="rtl"
      lang="ar"
      className={cn(plexArabic.className, "relative bg-background text-foreground pt-12 md:pt-32 pb-32")}
    >
      <main className="space-y-24 md:space-y-36">
        <div className="relative isolate space-y-20 md:space-y-28">
    
          <Hero />
          <ClientsMarquee />
        </div>
        <Services />
        <Approach />
        <Experience />
        <Solutions />
        <Decision />
        <Process />
        <FinalCta />
        <About />
      </main>
    </div>
  );
}
