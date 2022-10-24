import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <h1 className="text-2xl font-medium text-slate-900 dark:text-white">
        Triplist
      </h1>
    </main>
  );
}
