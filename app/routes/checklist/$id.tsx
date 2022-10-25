import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Checklist } from "~/models/checklist.server";
import { getChecklist } from "~/models/checklist.server";
import invariant from "tiny-invariant";

type LoaderData = { checklist: Checklist };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, `params.id is required`);

  const checklist = await getChecklist(params.id);
  invariant(checklist, `Checklist not found: ${params.id}`);

  return json({ checklist });
};

export default function ChecklistScreen() {
  const { checklist } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 text-center text-3xl text-white">
        {checklist.title}
      </h1>
      <h1 className="my-6 text-center text-xl text-white">
        {checklist.description}
      </h1>
    </div>
  );
}
