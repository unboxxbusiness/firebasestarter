import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MemberProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p>User profile information and settings will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
