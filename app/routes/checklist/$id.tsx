import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getChecklist } from "~/models/checklist.server";

type LoaderData = {
  checklist: Awaited<ReturnType<typeof getChecklist>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, `params.id is required`);

  const checklist = await getChecklist(params.id);
  invariant(checklist, `Checklist not found: ${params.id}`);

  return json<LoaderData>({ checklist });
};

export default function ChecklistScreen() {
  const { checklist } = useLoaderData() as LoaderData;

  console.log("checklist", checklist);

  if (!checklist) return <div>Checklist inesistente</div>;

  return (
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
                  <p className="text-gray-800 dark:text-white">{task.title}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
