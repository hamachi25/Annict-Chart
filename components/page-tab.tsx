import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PageTab() {
    const pathname = usePathname();

    return (
        <div className="text-center sm:text-left">
            <Tabs value={pathname === "/genres" ? "genres" : "overview"}>
                <TabsList className="w-[150px] md:w-[200px]">
                    <Link href={"/"} className="w-1/2">
                        <TabsTrigger value="overview" className="w-full h-full">
                            概要
                        </TabsTrigger>
                    </Link>

                    <Link href={"/genres"} className="w-1/2">
                        <TabsTrigger value="genres" className="w-full h-full">
                            ジャンル
                        </TabsTrigger>
                    </Link>
                </TabsList>
            </Tabs>
        </div>
    );
}
