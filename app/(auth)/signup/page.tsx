"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  //   async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault()
  //     const res = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password, name, company }),
  //     })
  //     if (res.ok) {
  //       router.push("/login")
  //     } else {
  //       const data = await res.json()
  //       setError(data.error || "Failed to sign up")
  //     }
  //   }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div>
          <Label className=" mb-5">Name</Label>
          <Input type="input" required />
        </div>
        <div>
          <Label className=" mb-5">Email</Label>
          <Input type="email" required />
        </div>
        <div>
          <Label className=" mb-5">Password</Label>
          <Input type="password" required />
        </div>
        <div>
          <Label className=" mb-5">Company</Label>
          <Input type="input" />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  );
}
