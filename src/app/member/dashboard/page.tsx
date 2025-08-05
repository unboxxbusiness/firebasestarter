import { Wallet, FileText, BadgeCheck, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const emiSchedule = [
  {
    dueDate: "2024-08-05",
    amount: 250.75,
    status: "Paid",
  },
  {
    dueDate: "2024-09-05",
    amount: 250.75,
    status: "Paid",
  },
  {
    dueDate: "2024-10-05",
    amount: 250.75,
    status: "Due",
  },
  {
    dueDate: "2024-11-05",
    amount: 250.75,
    status: "Upcoming",
  },
  {
    dueDate: "2024-12-05",
    amount: 250.75,
    status: "Upcoming",
  },
];

export default function MemberDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome, Member</h1>
      <p className="text-lg text-muted-foreground">
        Here is a summary of your account.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,231.89</div>
            <p className="text-xs text-muted-foreground">
              Available for withdrawal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Loan Outstanding
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,750.00</div>
            <p className="text-xs text-muted-foreground">
              Next EMI due on 2024-10-05
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>EMI Schedule</CardTitle>
          <CardDescription>
            Your upcoming loan repayment schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emiSchedule.map((emi) => (
                <TableRow key={emi.dueDate}>
                  <TableCell className="font-medium">
                    {new Date(emi.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    ${emi.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        emi.status === "Paid"
                          ? "default"
                          : emi.status === "Due"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                      style={
                        emi.status === "Paid"
                          ? { backgroundColor: "hsl(var(--accent))" }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-1">
                        {emi.status === "Paid" && (
                          <BadgeCheck className="h-3 w-3" />
                        )}
                        {emi.status !== "Paid" && (
                          <Clock className="h-3 w-3" />
                        )}
                        {emi.status}
                      </div>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
