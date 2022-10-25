import { Link } from "@remix-run/react";
import ThemeToggle from "./themetoggle";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

export default function Header() {
  return (
    <header>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b  py-6 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Triplist</span>
              <h1 className="text-2xl text-gray-800 dark:text-white">
                Triplist
              </h1>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block"></div>
          </div>
          <div className="ml-10 space-x-4">
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white "
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
