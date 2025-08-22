"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ArrowLeft, User, Shield, Mic } from "lucide-react"
import Link from "next/link"

type AuthMode = "admin-login" | "admin-signup" | "user-login" | "user-signup"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("admin-login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { theme, setTheme } = useTheme()

  const isAdmin = mode.includes("admin")
  const isLogin = mode.includes("login")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    if (isAdmin && isLogin) {
      window.location.href = "/admin"
    } else if (!isAdmin && isLogin) {
      window.location.href = "/user"
    } else {
      alert("Account created successfully!")
    }
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Password reset email sent!")
    setShowForgotPassword(false)
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-foreground rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-tight">VoiceAuth</span>
                  <span className="text-xs text-muted-foreground -mt-1">Secure Voice ID</span>
                </div>
              </div>
            </div>
            <CardTitle className="font-serif text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your email to receive a reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgotPassword(false)}>
                Back to Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="relative"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Mic className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-foreground rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight">VoiceAuth</span>
                <span className="text-xs text-muted-foreground -mt-1">Secure Voice ID</span>
              </div>
            </div>
          </div>
          <CardTitle className="font-serif text-2xl">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>{isLogin ? "Sign in to your account" : "Get started with VoiceAuth"}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mode Selection */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="grid grid-cols-2 gap-1">
              <Button
                variant={mode === "admin-login" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("admin-login")}
                className="text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Button>
              <Button
                variant={mode === "user-login" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("user-login")}
                className="text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                User
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Button
                variant={mode.includes("login") ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(isAdmin ? "admin-login" : "user-login")}
                className="text-xs"
              >
                Login
              </Button>
              <Button
                variant={mode.includes("signup") ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(isAdmin ? "admin-signup" : "user-signup")}
                className="text-xs"
              >
                Signup
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter username" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter password" required />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uniqueId">{isAdmin ? "Unique Lock ID" : "Unique Panel ID"}</Label>
                  <Input id="uniqueId" placeholder={`Enter ${isAdmin ? "lock" : "panel"} ID`} required />
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            {isLogin && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
