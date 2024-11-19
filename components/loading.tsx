import { useStore } from "@/lib/store";

export function Loading() {
    const { isLoading } = useStore();
    return (
        <div className="flex justify-center flex-col items-center text-center my-20 gap-4 sm:flex-row">
            <div
                className="w-8 h-8 rounded-full border-4 border-blue-500 animate-spin"
                style={{ borderTopColor: "transparent" }}
            />
            <span className="text-lg whitespace-pre-line">{isLoading.message}</span>
        </div>
    );
}
