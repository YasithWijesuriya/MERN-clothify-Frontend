import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDailySalesQuery } from "@/lib/api";
import { DailySalesLineChart } from "@/components/DailySalesLineChart";

function Metric({ label, value }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3">
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default function SalesDashboard() {
  const [range, setRange] = useState(7);
  const q7 = useGetDailySalesQuery(7);
  const q30 = useGetDailySalesQuery(30);

  const active = range === 7 ? q7 : q30;
  const data = active.data ?? [];

  const total = data.reduce((a, c) => a + (c.total ?? 0), 0);
  const avg = data.length ? total / data.length : 0;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>

      <Tabs value={String(range)} onValueChange={(v) => setRange(Number(v))}>
        <TabsList>
          <TabsTrigger value="7">Last 7 days</TabsTrigger>
          <TabsTrigger value="30">Last 30 days</TabsTrigger>
        </TabsList>

        {/* Last 7 Days */}
        <TabsContent value="7" className="space-y-4">
          {q7.isLoading ? (
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          ) : q7.isError ? (
            <div className="text-red-500">Failed to load 7-day sales.</div>
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Metric
                  label="Total"
                  value={new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
                    q7.data.reduce((a, c) => a + c.total, 0)
                  )}
                />
                <Metric
                  label="Average / day"
                  value={new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
                    q7.data.reduce((a, c) => a + c.total, 0) / (q7.data.length || 1)
                  )}
                />
              </div>
              <DailySalesLineChart data={q7.data} days={7} />
            </>
          )}
        </TabsContent>

        {/* Last 30 Days */}
        <TabsContent value="30" className="space-y-4">
          {q30.isLoading ? (
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          ) : q30.isError ? (
            <div className="text-red-500">Failed to load 30-day sales.</div>
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Metric
                  label="Total"
                  value={new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
                    q30.data.reduce((a, c) => a + c.total, 0)
                  )}
                />
                <Metric
                  label="Average / day"
                  value={new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
                    q30.data.reduce((a, c) => a + c.total, 0) / (q30.data.length || 1)
                  )}
                />
              </div>
              <DailySalesLineChart data={q30.data} days={30} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
