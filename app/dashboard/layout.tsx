import { auth } from "@/auth";
import SideNav from "@/app/components/sidenav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="p-6 flex-grow md:overflow-y-auto md:p-12">
        <h2 className="text-right">Hello,{session?.user?.email}</h2>
        {children}
      </div>
    </div>
  );
}
