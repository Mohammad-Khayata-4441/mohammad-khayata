"use client";
import { Link } from "@/i18n";
import { useActiveLink } from "@/shared/hooks/useActivePath";
import { Newspaper } from "lucide-react";
import { SlidingCapsuleNav } from "@/components/satisui/sliding-capsule-nav";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import { CiGrid41, CiHome, CiPhone, CiUser } from "react-icons/ci";

const MyComponent: React.FC = () => {
  const isActivePath = useActiveLink();

  const navLinks = [
    {
      title: "Home",
      path: "/",
      disabled: false,
      icon: CiHome,
    },

    {
      title: "Portfolio",
      path: "/portfolio",
      disabled: false,
      icon: CiGrid41,
    },
    {
      title: "Contact",
      path: "/contact",
      disabled: false,
      icon: CiPhone,
    },
    {
      title: "Blog",
      path: "/blog",
      disabled: false,
      icon: Newspaper,
    },
  ];

  const activeTab = navLinks.find(link => isActivePath(link.path))?.path || "/";

  return (
    <header className="flex  fixed bottom-0 md:top-0 md:bottom-auto w-screen items-center justify-center  p-5 z-10">
      <div className="content hidden md:block col-span-3"></div>

      <div className="col-span-12 sm:col-span-8 flex justify-center w-full max-w-fit">
        <SlidingCapsuleNav
          tabs={navLinks.map((item) => ({
            title: item.title,
            url: item.path,
            icon: <item.icon className="text-2xl md:text-xl select-none" />,
          }))}
          currentTab={activeTab}
          className="rounded-2xl px-2 glass-paper py-2 md:py-2 md:px-8 backdrop-blur-xl border border-text hover:scale-[1.01] hover:border-secondary transition duration-3000 hover:shadow-2xl"
          tabClassName="py-2 md:py-2 flex space-x-1 items-center select-none font-bold !bg-transparent"
        />
      </div>

      <div className="content hidden col-span-3 lg:flex justify-end">
        <ul className="flex items-center gap-8 flex-col fixed right-5 top-1/2 -translate-y-1/2">
          <li>
            <Link
              href={"https://github.com/Mohammad-Khayata-4441"}
              className="text-lg text-text hover:text-white transition"
            >
              <BsGithub></BsGithub>
            </Link>
          </li>

          <li>
            <Link
              href={"https://www.instagram.com/mohammad_khayat4441/"}
              className="text-lg text-text hover:text-white transition"
            >
              <BsInstagram></BsInstagram>
            </Link>
          </li>
          <li>
            <Link
              href={"https://t.me/Mohammadkh4441"}
              className="text-lg text-text hover:text-white transition"
            >
              <BsTelegram></BsTelegram>
            </Link>
          </li>
          <li>
            <Link
              href={"https://wa.me/+963956954441"}
              className="text-lg text-text hover:text-white transition"
            >
              <BsWhatsapp></BsWhatsapp>
            </Link>
          </li>
          <li>
            <Link
              href={"https://www.linkedin.com/in/mohammad-khayata-9169801a9"}
              className="text-lg text-text hover:text-white transition"
            >
              <BsLinkedin></BsLinkedin>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MyComponent;
