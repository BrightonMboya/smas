"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { api } from "~/utils/api";
import { Spinner } from "../ui/LoadingSkeleton";


export function Overview() {
  const { data, isLoading } = api.sales.yearlySales.useQuery({
    organizationEmail: ""
  });

  return (
    <>
      {isLoading && <Spinner />}
      {data === null && (
        <p>
          Your organization isnt registered yet, contact our team to get
          registered
        </p>
      )}
      {data !== null && (
        <ResponsiveContainer width="100%" height={350} className="ml-5">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `Rwf${value}k`}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
