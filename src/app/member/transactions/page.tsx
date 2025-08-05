import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MemberTransactionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A list of transactions will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
