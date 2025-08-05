import {
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  Users,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionCategorizer } from "@/components/transaction-categorizer";

const chartData = [
  { month: "Jan", deposits: 18600, withdrawals: 8000 },
  { month: "Feb", deposits: 30500, withdrawals: 12000 },
  { month: "Mar", deposits: 23700, withdrawals: 15000 },
  { month: "Apr", deposits: 7300, withdrawals: 18000 },
  { month: "May", deposits: 20900, withdrawals: 13000 },
  { month: "Jun", deposits: 21400, withdrawals: 19000 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawals
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$21,890.50</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,500.00</div>
            <p className="text-xs text-muted-foreground">+5 since last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Monthly deposits vs. withdrawals.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="month"
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
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <Bar
                  dataKey="deposits"
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="withdrawals"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="lg:col-span-1">
          <TransactionCategorizer />
        </div>
      </div>
    </div>
  );
}
