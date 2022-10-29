import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getChecklist, updateChecklist } from "~/models/checklist.server";

type LoaderData = {
  checklist: Awaited<ReturnType<typeof getChecklist>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, `checklistId.id is required`);

  const checklist = await getChecklist(params.id);
  invariant(checklist, `Checklist not found: ${params.id}`);

  return json<LoaderData>({ checklist });
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.id, `checklistId is required`);

  await updateChecklist(params.id);

  return redirect("/");
};

export default function ChecklistScreen() {
  const { checklist } = useLoaderData() as LoaderData;

  console.log("checklist", checklist);

  if (!checklist) return <div>Checklist inesistente</div>;

  return (
    <Form method="post">
      <div className="mx-auto max-w-4xl">
        <h2 className="my-6 text-center text-3xl text-white">
          {checklist.title}
        </h2>
        <h3 className="my-6 text-center text-xl text-white">
          {checklist.description}
        </h3>
        <ul>
          {checklist.taskGroups.map((taskGroup) => (
            <li key={taskGroup.id}>
              <h4 className="text-lg text-gray-800 dark:text-white">
                {taskGroup.title}
              </h4>
              <ul>
                {taskGroup.tasks.map((task) => (
                  <li key={task.id}>
                    <p className="text-gray-800 dark:text-white">
                      {task.title}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          name="intent"
          //  value={isNewPost ? "create" : "update"}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          // disabled={isCreating || isUpdating}
        >
          Update
        </button>
      </div>
    </Form>
  );
}
