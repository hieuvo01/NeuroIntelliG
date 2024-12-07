import { Facebook, Instagram, Link, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ui/modetoggle";
import MusicPlayer from "./ui/MusicPlayer";

function Footer() {
  return (
    <div>
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <MusicPlayer />
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Free photos and videos shared by talented creators.
            </h2>
            <p>Download one of our apps.</p>
            <div className="flex space-x-2">
              <button className="bg-white text-black px-4 py-2 rounded-md flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-md flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.523 15.3414c-.5511.2396-1.1322.3638-1.7311.3638-.3192 0-.6384-.0241-.9576-.0723-1.0793-.1928-1.9879-.7934-2.5631-1.6911l-.0723-.1205-.0723.0964c-.5269.7211-1.3203 1.2239-2.2297 1.3444-.0964.0241-.1928.0241-.2892.0241-.3434 0-.6868-.0482-1.0061-.1446-.9094-.2892-1.6911-.9817-2.1215-1.8911-.2651-.5752-.3876-1.205-.3876-1.8348 0-.3434.0482-.6868.1205-1.0302.2651-.9576.9094-1.7793 1.7793-2.2538.4789-.2651 1.0061-.4096 1.5574-.4096.1928 0 .3855.0241.5752.0482.9817.1928 1.8107.8416 2.2779 1.7311l.0482.0964.0723-.0723c.5511-.7452 1.3927-1.2722 2.3502-1.3927.0723-.0241.1687-.0241.2651-.0241.3434 0 .6868.0482 1.0061.1446.9094.2892 1.6911.9817 2.1215 1.8911.2651.5752.3876 1.205.3876 1.8348 0 .3434-.0482.6868-.1205 1.0302-.2892.9817-.9817 1.8107-1.8911 2.2538zm2.6836-9.5762l-7.2511-4.3025c-.7211-.4307-1.6188-.4307-2.3399 0L3.3675 5.7652c-.7211.4307-1.1799 1.2239-1.1799 2.0714v8.5808c0 .8657.4307 1.6429 1.1799 2.0714l7.2511 4.3025c.3614.2169.7693.3192 1.1799.3192.4106 0 .8185-.1205 1.1799-.3192l7.2511-4.3025c.7211-.4307 1.1799-1.2239 1.1799-2.0714V7.8366c-.0241-.8476-.4548-1.6188-1.1799-2.0714z" />
                </svg>
                Android
              </button>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-300">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <div className="space-y-2 mb-6">
              <p>
                Led by Mr. Vo 'Marcus' Minh Hieu, NeuroIntelliG is committed to
                delivering innovative solutions with a focus on quality and
                customer satisfaction. We strive to bring the best in technology
                and service to every project.
              </p>
              <span>Let us know if you would like further adjustments!</span>
            </div>
          </div>

          <ModeToggle />
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base hover:bg-gray-700 transition-colors"
                >
                  {" "}
                  Members{" "}
                </a>
                <p>Minh Hieu</p>
                <p>Dinh Hieu</p>
                <p>Nam Duong</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our service</h3>
            <div className="flex flex-wrap gap-2 text-white">
              {[
                "Black and white photography",
                "Happy birthday images",
                "Free business videos",
                "Happy new year images",
              ].map((tag) => (
                <Link
                  key={tag}
                  href="#"
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-wrap justify-between items-center">
          <p>&copy; 2024 NeuroVision</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {[
              "Terms of Use",
              "Privacy Policy",
              "License",
              "Imprint",
              "Cookies Policy",
            ].map((item) => (
              <Link key={item} href="#" className="text-sm hover:underline">
                {item}
              </Link>
            ))}
          </div>
          <button className="mt-4 sm:mt-0 px-4 py-2 bg-gray-800 rounded-md flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
              <path d="M12 6a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V7a1 1 0 011-1z" />
            </svg>
            English
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
