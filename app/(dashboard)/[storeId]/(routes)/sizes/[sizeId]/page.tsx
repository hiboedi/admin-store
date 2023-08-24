import prismaDB from "@/lib/prismaDB";
import React from "react";
import { SizeForm } from "./components/sizeForm";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismaDB.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
