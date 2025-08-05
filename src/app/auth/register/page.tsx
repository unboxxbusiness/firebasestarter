
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, limit } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FirebaseError } from "firebase/app";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill out all fields.",
      });
      return;
    }
    setIsLoading(true);
    try {
      // Check if any user exists to determine the role
      const usersRef = collection(db, "users");
      const q = query(usersRef, limit(1));
      const querySnapshot = await getDocs(q);
      const isFirstUser = querySnapshot.empty;
      const role = isFirstUser ? "admin" : "member";

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore with the determined role
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        role, // Use the dynamically determined role
        createdAt: new Date(),
      });

      toast({
        title: "Registration Successful",
        description: `Your account has been created with the role: ${role}.`,
      });

      // Redirect to the appropriate dashboard
      if (role === 'admin') {
        router.push("/admin/dashboard");
      } else {
        router.push("/member/dashboard");
      }

    } catch (error) {
      console.error("Registration error:", error);
      let description = "An unexpected error occurred.";
       if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            description = "This email is already registered.";
            break;
          case "auth/weak-password":
            description = "The password is too weak. Please use at least 6 characters.";
            break;
          case "auth/invalid-email":
            description = "The email address is not valid.";
            break;
          default:
            description = "Failed to create an account. Please try again.";
        }
      }
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button onClick={handleRegister} disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="animate-spin mr-2" />}
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
