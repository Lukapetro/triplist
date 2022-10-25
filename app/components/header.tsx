import { Link } from "@remix-run/react";
import ThemeToggle from "./themetoggle";

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
          </div>
          <div className="ml-10 space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
