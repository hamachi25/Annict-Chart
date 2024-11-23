import { GoPulse } from "react-icons/go";
import { BiCameraMovie } from "react-icons/bi";
import { MdMovieEdit } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { GridInfoCard } from "@/components/overview/grid-info-card";

import { SkeltonTimeSeriesChart } from "@/components/chart/skelton-time-series-chart";
import { useStore } from "@/lib/store";

export function SkeltonOverviewPage() {
    const { statusCount, recordDataSets, statusDataSets, activeDays } = useStore();

    return (
        <div className="flex flex-col gap-4 md:gap-5">
            {/* prettier-ignore */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                <GridInfoCard
                    title={<span>視聴中の<wbr />アニメ</span>}
                    data={ statusCount.find((count) => count.type === "watchingCount")?.value ?? 0}
                >
                    <GoPulse size={25} color={"hsl(var(--grid-info))"} />
                </GridInfoCard>
                <GridInfoCard
                    title={<span>記録した<wbr />アニメ</span>}
                    data={
                        statusDataSets.All?.length > 0
                            ? statusDataSets.All[statusDataSets.All.length - 1]?.totalValue ?? 0
                            : 0
                    }
                >
                    <BiCameraMovie size={25} color={"hsl(var(--grid-info))"} />
                </GridInfoCard>
                <GridInfoCard
                    title={<span>記録した<wbr />エピソード</span>}
                    data={
                        recordDataSets.All?.length > 0
                            ? recordDataSets.All[recordDataSets.All.length - 1]?.totalValue ?? 0
                            : 0
                    }
                >
                    <MdMovieEdit size={25} color={"hsl(var(--grid-info))"} />
                </GridInfoCard>
                <GridInfoCard
                    title={<span>アニメを<wbr />視聴した日数</span>}
                    data={activeDays}
                >
                    <FaRegCalendarAlt size={20} color={"hsl(var(--grid-info))"} />
                </GridInfoCard>
            </div>

            <SkeltonTimeSeriesChart
                title="記録したアニメ"
                description="全期間に記録したアニメ数の推移"
                chartData={statusDataSets}
            />
            <SkeltonTimeSeriesChart
                title="記録したエピソード"
                description="全期間に記録したエピソード数の推移"
                chartData={statusDataSets}
            />
        </div>
    );
}
