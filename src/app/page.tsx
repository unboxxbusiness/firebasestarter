
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="w-full max-w-md p-4">
        <Card className="shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center">
            <Icons.logo className="mx-auto h-16 w-16 text-primary" />
            <CardTitle className="mt-4 text-4xl font-bold">
              Amulya Nidhi
            </CardTitle>
            <CardDescription className="text-lg">
              Your Trusted Financial Partner
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
             <Link href="/auth/login">
                <Button size="lg" className="font-bold w-full">
                    Get Started
                </Button>
             </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
