"use client";

import Link from "next/link";
import { useCookies } from "next-client-cookies";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import axios, { AxiosError } from "axios";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { initOtpForEmailVerification, verifyEmailOtp } from "@/service/user-service";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password should be 8 characters long").min(1),
});

const SignUp = () => {
  const [submit, setSubmit] = useState(false);
  const [phase, setPhase] = useState(1);
  const [otp, setOtp] = useState("");
  const cookies = useCookies();
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const emailCookie = cookies.get("sns_user_email");
    console.log('email cookie: ', emailCookie);
    if (emailCookie && phase === 1) {
      setPhase(2);
    }
  }, [cookies, phase]);

  async function onSubmit(userDetails: z.infer<typeof formSchema>) {
    setSubmit(true);
    try {
      const result = await axios.post("/api/users/signup", userDetails);
      console.log('on submit result: ', result);
      if (result.status === 201) {
        toast({
          variant: "success",
          description: "Welcome onboard!",
        });
        const userName = `${userDetails.firstName} ${userDetails.lastName}`;
        // cookieStore.set("sns_user_email", userDetails.email, { maxAge: 60 * 60 });
        await initOtpForEmailVerification(userDetails.email, userName);
        setPhase(2);
      }
      form.reset();
    } catch (error: any) {
      if (error.status === 400) {
        toast({
          variant: "destructive",
          description: "User already exist",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong please try again after some time",
        });
      }
    } finally {
      setSubmit(false);
    }
  }

  // Handle OTP verification (Phase 2)
  async function verifyOtp() {
    setSubmit(true);
    try {
      console.log("entered otp: ", otp);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 5000);
      });

      const emailCookie = cookies.get("sns_user_email");
      console.log('otp verify params: ', emailCookie, otp);
      const result = await verifyEmailOtp(emailCookie!, +otp);
      if (result.status === 200) {
        toast({
          variant: "success",
          description: "Email verified successfully!",
        });
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 2000);
        });
        window.location.href = "/sign-in";
        cookies.remove("sns_user_email");
      } else if (result.status === 401) {
        toast({
          variant: "destructive",
          description: "Invalid OTP. Please try again.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: "Invalid OTP, please try again.",
      });
    } finally {
      setSubmit(false);
    }
  }

  return (
    <>
      {phase === 1 && (
        <div className="w-full h-auto py-5 flex items-center justify-center">
          <div className="flex items-center justify-center p-8 border-2 rounded-md border-primary-foreground/40">
            <div className="grid gap-6 mx-auto">
              {phase === 1 && (
                <>
                  <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-balance text-foreground">Enter your information to create an account</p>
                  </div>
                  <Form {...form}>
                    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="firstName">First name</Label>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input placeholder="robe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input placeholder="robe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input placeholder="robe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                          </Link>
                        </div>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {submit ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button type="submit" className="w-full">
                          Create an account
                        </Button>
                      )}
                      <Button disabled variant="outline" className="w-full">
                        Sign up with GitHub
                      </Button>
                      <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="underline">
                          Sign in
                        </Link>
                      </div>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {phase === 2 && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="border-2 p-4 rounded-md border-primary-foreground/40">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Verify Your Email</h1>
              <p className="text-balance text-foreground">Enter the OTP sent to your email</p>
            </div>
            <div className="flex items-center justify-center m-4">
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {submit ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying
              </Button>
            ) : (
              <Button type="button" onClick={verifyOtp} className="w-full">
                Verify OTP
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
