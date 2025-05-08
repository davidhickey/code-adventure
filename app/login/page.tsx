// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    console.log("res", res);

    if (res?.ok) {
      router.push("/account");
    } else {
      alert("Invalid credentials");
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
    if (res?.ok) {
      router.push("/account");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="login-page-content">
      {!showSignup ? (
        <form onSubmit={handleLogin}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <Button type="submit">Log In</Button>
          <Button onClick={() => setShowSignup(true)}>Sign Up</Button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Sign Up</button>
          <Button onClick={() => setShowSignup(false)}>Log In</Button>
        </form>
      )}
    </div>
  );
}