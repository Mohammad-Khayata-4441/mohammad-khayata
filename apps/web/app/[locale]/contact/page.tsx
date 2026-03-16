import LightsGenerator from "@/app/components/LightsGenerator";
import { Button } from "@/shared/components/ui/button";
import { AiOutlineMessage } from "react-icons/ai";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  BsWhatsapp,
} from "react-icons/bs";
import { CiAt, CiPhone } from "react-icons/ci";
 import { resume } from "@/data/resume";
import { generatePageMetadata } from "@/shared/lib/metaData";

export const metadata = generatePageMetadata({
  title: "Contact",
  description: `Get in touch with ${resume.contact.name}, a professional frontend developer. Available for freelance projects, collaboration opportunities, and full-time positions. Contact via email, phone, or social media.`,
  slug: "contact",
  keywords: [
    "Contact",
    "Hire Frontend Developer",
    "Freelance Developer",
    "React Developer for Hire",
    "Vue Developer Contact",
    "Web Development Services",
    "Professional Contact",
    "Remote Developer",
  ],
  type: "website",
});

export default function page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    await fetch(
      `https://api.web3forms.com/submit?access_key=${process.env.WEB3FORMS_ACCESS_KEY}&to=${process.env.NEXT_PUBLIC_EMAIL}&subject=Contact Form Submission - ${name}&message=${message}&replyTo=${email}`
    );
    // const formData = new FormData(event.target);
    // const response = await sendEmail(formData);
    // setStatus(response.message);
  }
  return (
    <div className="page flex flex-col justify-center relative z-0 ">
 
      <div className="page-overlay"></div>

      <div className="container mx-auto px-4 md:px-0">
        <section className="lg:flex section-aurora noise-overlay p-3 md:p-6">
          <div className="flex flex-col justify-center w-full p-8 lg:px-12 xl:px-20 lg:w-1/2  rounded-3xl">
            <h1 className="text-3xl font-semibold text-foreground capitalize lg:text-4xl headline-glow">
              Contact Me
            </h1>

            <p className="mt-4 text-muted-soft hero-subtitle text-base">
              I&apos;d love to connect and collaborate! Feel free to send me a
              message or reach out through my social media links below 🚀.
            </p>

            <div className="mt-6 md:mt-8">
              <h3 className="font-medium text-muted-soft mt-4 text-xl">
                Contact info{" "}
              </h3>
              <hr className="faded-divider" />

              <ul>
                <li className="my-4 ">
                  <span className="text-muted-soft hover:text-primary text-md flex gap-2 items-center transition-all">
                    {/* <icon name="fa:phone"></icon> */}
                    <CiPhone></CiPhone>
                    <a href="tel:+963956954441">
                      +963&nbsp;956&nbsp;954&nbsp;441
                    </a>
                  </span>
                </li>

                <li className="my-4 ">
                  <a
                    href="mailto:MohammadKhayata.gm@gmail.com"
                    className="text-muted-soft hover:text-primary text-md flex gap-2 items-center transition-all"
                  >
                    {/* <icon name="fa:at"></icon> */}
                    <CiAt></CiAt>
                    <span>MohammadKhayata.gm@gmail.com</span>
                  </a>
                </li>
              </ul>

              <h3 className="font-medium text-muted-soft mt-8 text-xl">
                Social Media{" "}
              </h3>
              <hr className="faded-divider" />
              <div className="flex mt-4 -mx-1.5 ">
                <a
                  className="mx-1.5 icon-tile text-muted-soft hover:text-primary transition-colors duration-300"
                  href="https://www.linkedin.com/in/mohammad-khayata-9169801a9"
                >
                  {/* <icon className="text-2xl mt-1" name="ri:linkedin-fill" /> */}
                  <BsLinkedin />
                </a>
                <a
                  className="mx-1.5 icon-tile text-muted-soft hover:text-primary transition-colors duration-300"
                  href="https://github.com/Mohammad-Khayata-4441"
                >
                  {/* <icon className="text-2xl mt-1" name="ri:github-fill" /> */}
                  <BsGithub></BsGithub>
                </a>

                <a
                  className="mx-1.5 icon-tile text-muted-soft hover:text-primary transition-colors duration-300"
                  href="https://t.me/Mohammadkh4441"
                >
                  {/* <icon className="text-2xl mt-1" name="fa-brands:telegram-plane" /> */}
                  <BsTelegram></BsTelegram>
                </a>

                <a
                  className="mx-1.5 icon-tile text-muted-soft hover:text-primary transition-colors duration-300"
                  href="https://www.facebook.com/mohammed.kh.165033/"
                >
                  {/* <icon className="text-2xl mt-1" name="fa-brands:facebook-f" /> */}
                  <BsFacebook />
                </a>

                <a
                  className="mx-1.5 icon-tile text-muted-soft hover:text-primary transition-colors duration-300"
                  href="https://www.instagram.com/mohammad_khayat4441/"
                >
                  {/* <icon className="text-2xl mt-1" name="mdi:instagram" /> */}
                  <BsInstagram></BsInstagram>
                </a>
                <a
                  className="mx-1.5 icon-tile text-muted-soft hover:text-primary transition-colors duration-300"
                  href="https://wa.me/+963956954441"
                >
                  <BsWhatsapp></BsWhatsapp>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full p-8 pt-4 lg:w-1/2 lg:px-12 xl:px-24  rounded-3xl">
            <form action={"https://api.web3forms.com/submit"} method="POST">
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label className="block mb-2 text-sm text-muted-soft">
                    Full Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="input-glass mt-2"
                  />
                </div>

                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-muted-soft">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    className="input-glass mt-2"
                  />
                </div>
              </div>

              <div className="w-full mt-4">
                <label className="block mb-2 text-sm text-muted-soft">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="input-glass mt-2 h-32 md:h-56"
                  placeholder="Message"
                ></textarea>
              </div>
              <input
                type="hidden"
                name="redirect"
                value="https://web3forms.com/success"
              />
              <input
                type="hidden"
                name="access_key"
                value={process.env.WEB3_FORM_KEY}
              />

              <Button type="submit" className="mt-4 button-glow">
                <AiOutlineMessage></AiOutlineMessage>
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
