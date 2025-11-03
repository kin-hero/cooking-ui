import Link from "next/link";
import { FaGithub, FaReact, FaAws, FaRegUser } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Recipify</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A modern recipe platform for food enthusiasts. Discover, explore, and share delicious recipes from around the world.</p>
          </div>

          {/* Tech Stack Section */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Built With</h4>
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <SiNextdotjs className="text-3xl text-gray-900 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-600">Next.js</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <FaReact className="text-3xl text-[#61DAFB] group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-600">React</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <SiTypescript className="text-3xl text-[#3178C6] group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-600">TypeScript</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <SiTailwindcss className="text-3xl text-[#06B6D4] group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-600">Tailwind</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <FaAws className="text-3xl text-[#FF9900] group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-600">AWS</span>
              </div>
            </div>
          </div>

          {/* Creator & Social Section */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Connect</h4>
            <p className="text-gray-700 font-medium mb-1">Keane Putra Setiawan</p>
            <p className="text-sm text-gray-600 mb-4">Full-Stack Developer</p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-end gap-4">
              <Link
                href="https://www.keanesetiawan.com/projects/recipify"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 transition-all group"
              >
                <FaRegUser className="text-xl" />
                <span className="text-sm font-medium">Case Study</span>
              </Link>
              <Link
                href="https://github.com/kin-hero/Recipify"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 transition-all group"
              >
                <FaGithub className="text-xl" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
              <Link
                href="https://x.com/buildwithKin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-black hover:text-white text-gray-900 transition-all group"
              >
                <SiX className="text-xl" />
                <span className="text-sm font-medium">X</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2025 Recipify. Open Source Portfolio Project.</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Made with</span>
              <span className="text-red-500 text-lg">♥</span>
              <span className="text-sm text-gray-600">for learning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
