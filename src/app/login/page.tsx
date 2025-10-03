"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginWindow from "@/components/LoginWindow";
import Background from "@/components/Background";
import Nav from "@/components/Nav";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to admin
    if (session) {
      router.push("/admin");
    }
  }, [session, router]);

  // Don't show login form if already authenticated
  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-2xl px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <LoginWindow />
      </div>
    </div>
  );
}
