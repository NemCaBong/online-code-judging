import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

interface ProgressData {
  done: number;
  total: number;
}

interface DashboardChartProps {
  challenges: ProgressData;
  classes: ProgressData;
  exercises: ProgressData;
}

export default function DashboardChart({
  challenges,
  classes,
  exercises,
}: DashboardChartProps) {
  const activityData = [
    {
      activity: "challenges",
      value: (challenges.done / challenges.total) * 100,
      label: `${challenges.done} / ${challenges.total}`,
      fill: "var(--color-challenges)",
    },
    {
      activity: "classes",
      value: (classes.done / classes.total) * 100,
      label: `${classes.done} / ${classes.total}`,
      fill: "var(--color-classes)",
    },
    {
      activity: "exercises",
      value: (exercises.done / exercises.total) * 100,
      label: `${exercises.done} / ${exercises.total}`,
      fill: "var(--color-exercises)",
    },
  ];

  return (
    <Card className="max-w-xl">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            challenges: {
              label: "Challenges",
              color: "hsl(var(--chart-1))",
            },
            classes: {
              label: "Classes",
              color: "hsl(var(--chart-2))",
            },
            exercises: {
              label: "Exercises",
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
            <div className="text-xs text-muted-foreground">Challenges</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {challenges.done}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Classes</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {classes.done}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Exercises</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {exercises.done}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
