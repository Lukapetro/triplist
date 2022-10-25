import { Theme, useTheme } from "~/utils/theme-provider";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return theme === Theme.DARK ? (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center rounded-full border border-transparent  p-1 text-white shadow-sm"
    >
      <SunIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  ) : (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center rounded-full border border-transparent p-1 text-gray-800 shadow-sm"
    >
      <MoonIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
