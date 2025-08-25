import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  sales: { label: "Sales", color: "var(--chart-1)" },
};

export function DailySalesLineChart({ data, days }) {
  return (
    <Card className="py-0">
      <CardHeader className="!pb-2">
        <CardTitle>Daily Sales (Last {days} days)</CardTitle>
        <CardDescription>Total by day</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={72}
              tickFormatter={(v) =>
                new Intl.NumberFormat("en-LK", {
                  style: "currency",
                  currency: "LKR",
                  maximumFractionDigits: 0,
                }).format(v)
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) =>
                    new Date(String(value)).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                  valueFormatter={(v) =>
                    new Intl.NumberFormat("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    }).format(Number(v))
                  }
                  nameKey="sales"
                />
              }
            />
            <Line
              dataKey="total"
              type="monotone"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
