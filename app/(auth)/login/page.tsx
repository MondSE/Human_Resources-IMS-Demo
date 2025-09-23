"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault();
  //     const res = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });
  //     if (res?.error) {
  //       setError("Invalid credentials");
  //     } else {
  //       router.push("/"); // redirect to dashboard
  //     }
  //   }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div>
          <Label>Email</Label>
          <Input type="email" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}
