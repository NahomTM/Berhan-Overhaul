import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-y-hidden">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[15%] p-4 h-full shadow-custom relative">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start ml-1 -mt-2"
        >
          <Image src="/BerhanLogo.svg" alt="logo" width={80} height={80} />
          <span className="hidden lg:block -mt-4 -ml-2 text-xl font-semibold">Berhan</span>
        </Link>
        <div className=" ml-1/5 hidden lg:block border-t-2 w-[190px] border-orange-200"><hr/></div>
        <div className="-mt-2"><Menu /></div>
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#fbfbfb] overflow-scroll flex flex-col">
        <div className="overflow-y-auto h-screen">
          <div className="mb-4"><Navbar /></div>
          {children}
        </div>
      </div>
    </div>
  );
}
