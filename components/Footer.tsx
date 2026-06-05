import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-2">About College Compass</h3>
            <p className="text-gray-400">
              Find and compare engineering colleges with ease. Make informed decisions about your future.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/favorites" className="hover:text-white transition">Favorites</a></li>
              <li><a href="/compare" className="hover:text-white transition">Compare</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-2">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition"><FiGithub size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><FiLinkedin size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><FiMail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 College Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
