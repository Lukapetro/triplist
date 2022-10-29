import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import Header from "~/components/header";

import { createChecklist, getChecklists } from "~/models/checklist.server";
import { createUserSession } from "~/session.server";

export async function loader() {
  const checklists = await getChecklists();

  return json({ checklists });
}

export const action: ActionFunction = async ({ request, params }) => {
  const newChecklist = await createChecklist();

  return createUserSession({
    request,

    redirectTo: `/checklist/${newChecklist.id}`,
  });
};

export default function Index() {
  const { checklists } = useLoaderData<typeof loader>();
  const transition = useTransition();
  const isCreating = transition.submission?.formData.get("intent") === "create";

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
      <Form method="post" key={"new"}>
        <button className="rounded border p-2 text-gray-800 dark:text-white">
          Create checklist
        </button>

        <button
          type="submit"
          name="intent"
          value="delete"
          className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create"}
        </button>
      </Form>
      <Outlet />
    </main>
  );
}
