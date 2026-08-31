import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-24 pb-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col justify-between md:col-span-2">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-100 uppercase mb-4">
                MISFITT
              </h2>
              <p className="text-sm max-w-xs">
                Disrupt the ordinary. Redefine Tokyo. <br />
                Luxury private tours, editorial photography, and guide academy.
              </p>
            </div>
            <div className="mt-12">
              <p className="font-mono text-xs tracking-widest text-neutral-500">
                35&deg;39&apos;29&quot;N 139&deg;41&apos;33&quot;E
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-6 font-mono text-xs tracking-widest text-neutral-100">
              NAVIGATION
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#services" className="hover:text-neutral-100 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#archive" className="hover:text-neutral-100 transition-colors">
                  Photo Archive
                </Link>
              </li>
              <li>
                <Link href="#founder" className="hover:text-neutral-100 transition-colors">
                  Founder
                </Link>
              </li>
              <li>
                <Link href="#inquire" className="hover:text-neutral-100 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="mb-6 font-mono text-xs tracking-widest text-neutral-100">
              SOCIAL
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 transition-colors">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-100 transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} MISFITT.TOKYO. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="#" className="hover:text-neutral-100 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-neutral-100 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
