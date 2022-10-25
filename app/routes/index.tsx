import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/header";

import { getChecklists } from "~/models/checklist.server";

export async function loader() {
  const checklists = await getChecklists();

  return json({ checklists });
}

export default function Index() {
  const { checklists } = useLoaderData<typeof loader>();

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Header />
      <ul>
        {checklists.map((checklist) => (
          <li key={checklist.id}>
            <Link
              to={`checklist/${checklist.id}`}
              className="text-slate-800 dark:text-white"
            >
              {checklist.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  );
}
