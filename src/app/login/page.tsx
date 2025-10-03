"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginWindow from "@/components/LoginWindow";
import bluedot from "@/assets/img/bluedot-logo.png";

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
    <div className="fixed inset-0 w-full h-full select-none overflow-hidden text-slate-100">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950" style={{
          backgroundImage: `url(${bluedot.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "400px",
        }}/>

      {/* Single subtle accent */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
      />

      {/* Login Window */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-2xl border border-cyan-400/30 overflow-hidden">
          <LoginWindow onClose={() => router.push("/")} />
        </div>
      </div>
    </div>
  );
}
