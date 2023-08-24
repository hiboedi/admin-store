import prismaDB from "@/lib/prismaDB";
import React from "react";
import { BillboardForm } from "./components/billboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
