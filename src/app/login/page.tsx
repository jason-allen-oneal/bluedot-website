"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, LogIn } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) router.push("/admin");
  }, [session, router]);

  if (session) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username: form.username,
      password: form.password,
    });

    setIsSubmitting(false);
console.log('result', result);
    if (result?.error) {
      setError("Invalid username or password.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-gray-950" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <Image
          src="/bluedot-logo.png"
          alt="Bluedot Logo"
          width={80}
          height={80}
          className="opacity-90"
          priority
        />
        <h1 className="text-2xl font-bold text-white mt-2">Bluedot Admin</h1>
      </div>

      {/* Login Card */}
      <Card className="relative w-full max-w-md bg-gray-950/60 backdrop-blur-md border border-white/90 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
            <Lock className="h-7 w-7 text-blue-400" />
          </div>
          <CardTitle className="text-2xl text-white">Sign In</CardTitle>
          <CardDescription className="text-gray-400">
            Access your admin dashboard securely
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="bg-gray-900/50 border-white/30 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-gray-900/50 border-white/30 text-white mt-1"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full mt-2 gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Subtle Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Bluedot Systems. All rights reserved.
      </div>
    </div>
  );
}
