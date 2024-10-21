import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartData {
  easy: number;
  medium: number;
  hard: number;
}

const chartConfig = {
  challenges: {
    label: "Challenges",
  },
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
} satisfies ChartConfig;

export function PieChartDashboard({ data }: { data: PieChartData }) {
  const chartData = [
    { difficulty: "easy", challenges: data.easy, fill: "var(--color-easy)" },
    {
      difficulty: "medium",
      challenges: data.medium,
      fill: "var(--color-medium)",
    },
    { difficulty: "hard", challenges: data.hard, fill: "var(--color-hard)" },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg">Submissions By Difficulty</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="challenges" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="challenges"
                // innerRadius="60%"
                outerRadius="90%"
              >
                <LabelList
                  dataKey="difficulty"
                  // position="outside"
                  className="fill-foreground text-sm md:text-xs"
                  stroke="none"
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
