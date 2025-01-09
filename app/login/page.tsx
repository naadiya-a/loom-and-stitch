'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement Firebase authentication
        signIn(email, password).then((user) => {
            router.push('/');
        }).catch((err: Error) => {
            alert(err);
        });
      };
      
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <Card className="w-full max-w-md pt-4">
        {/* <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader> */}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-sm text-center">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
      );
}