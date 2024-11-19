import { Card } from "@/components/ui/card";

type Props = {
    children: React.ReactNode;
    title: React.ReactNode;
    data: number | undefined;
};

export function GridInfoCard({ children, title, data }: Props) {
    return (
        <Card className="flex flex-col">
            <div className="flex h-full gap-4 px-3 py-4 items-center lg:gap-6 md:px-4 lg:px-9">
                <div className="border rounded-full p-2 bg-[hsl(var(--muted))] [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {children}
                </div>
                <div>
                    <div className="text-2xl font-bold">{data}</div>
                    <div className="text-xs text-gray-500 sm:text-sm [&>span]:keep-all-break-word [&>span]:inline-block [&>span]:leading-tight">
                        {title}
                    </div>
                </div>
            </div>
        </Card>
    );
}
