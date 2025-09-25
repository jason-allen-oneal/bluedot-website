"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Nav from "@/components/Nav";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  
  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Register state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    
    if (!res?.error) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
    setIsLoading(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");
    setRegSuccess("");

    if (regPassword !== regPasswordConfirm) {
      setRegLoading(false);
      setRegError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: regUsername, 
          email: regEmail, 
          password: regPassword, 
          passwordConfirm: regPasswordConfirm 
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegError(data.error || "Registration failed");
      } else {
        setRegSuccess("Registration successful. You can now sign in.");
      }
    } catch (err) {
      setRegError("Network error");
    }
    setRegLoading(false);
  }

  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="flex items-center justify-center min-h-screen pt-14">
        <div className="card p-8 w-full max-w-md">
          <div className="mb-6 flex items-center justify-center gap-2">
            <button 
              onClick={() => setMode("login")} 
              className={`px-4 py-2 rounded ${mode === "login" ? "bg-primary text-white" : "bg-neutral-800 text-neutral-300"}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode("register")} 
              className={`px-4 py-2 rounded ${mode === "register" ? "bg-primary text-white" : "bg-neutral-800 text-neutral-300"}`}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
                <p className="text-muted">Sign in to access the admin dashboard</p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
                <button 
                  className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-muted">Register a new admin account</p>
              </div>
              
              {regError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {regError}
                </div>
              )}
              {regSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {regSuccess}
                </div>
              )}
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="reg-username" className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    id="reg-username"
                    className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Choose a username"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    disabled={regLoading}
                  />
                </div>
                
                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    disabled={regLoading}
                  />
                </div>
                
                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    id="reg-password"
                    className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    type="password"
                    placeholder="Create a password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    disabled={regLoading}
                  />
                </div>
                
                <div>
                  <label htmlFor="reg-password-confirm" className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="reg-password-confirm"
                    className="w-full p-3 border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    type="password"
                    placeholder="Re-enter your password"
                    value={regPasswordConfirm}
                    onChange={(e) => setRegPasswordConfirm(e.target.value)}
                    required
                    disabled={regLoading}
                  />
                </div>
                
                <button 
                  className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={regLoading}
                >
                  {regLoading ? "Creating..." : "Create Account"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}