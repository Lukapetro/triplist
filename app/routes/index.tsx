import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getChecklists } from "~/models/checklist.server";

export async function loader() {
  const checklists = await getChecklists();

  return json({ checklists });
}

export default function Index() {
  const { checklists } = useLoaderData<typeof loader>();

  return (
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <h1 className="text-2xl font-medium text-slate-900 dark:text-white">
        Triplist ✈️
      </h1>
      <ul>
        {checklists.map((checklist) => (
          <li key={checklist.id}>
            <Link
              to={`checklist/${checklist.id}`}
              className="text-blue-600 underline"
            >
              {checklist.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
