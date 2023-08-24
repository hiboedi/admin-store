import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./mainNav";
import StoreSwitcher from "@/components/storeSwitcher";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prismaDB";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismaDB.store.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
