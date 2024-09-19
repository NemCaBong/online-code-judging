import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

interface ActivityData {
  activity: string;
  value: number;
  label: string;
  fill: string;
}

interface SummaryData {
  easy: number;
  hard: number;
  medium: number;
}

interface SummaryChartProps {
  activityData: ActivityData[];
  summaryData: SummaryData;
}

export default function SummaryChart({
  activityData,
  summaryData,
}: SummaryChartProps) {
  return (
    <Card className="max-w-xl">
      <CardContent className="flex gap-4 p-4 pb-2 ">
        <ChartContainer
          config={{
            easy: {
              label: "Easy",
              color: "hsl(var(--chart-1))",
            },
            medium: {
              label: "Medium",
              color: "hsl(var(--chart-2))",
            },
            hard: {
              label: "Hard",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[150px] w-full"
        >
          <BarChart
            margin={{
              left: 10,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={activityData}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Easy</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {summaryData.easy}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Medium</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {summaryData.medium}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Hard</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {summaryData.hard}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
