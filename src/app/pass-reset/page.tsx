"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { resetPassInDb, sendOtpForPassReset, verifyPassResetOtp } from "@/service/user-service";

import { useRouter } from "next/navigation";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      const result = await sendOtpForPassReset(email);

      if (result?.error) {
        toast({
          variant: "destructive",
          description: "Invalid email!",
        });
      } else if (result.status && result.status === 200) {
        setIsOtpSent(true);
        toast({
          variant: "default",
          title: "OTP Sent successful!",
          description: "Kindly check you mail for OTP!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const result = await verifyPassResetOtp(email, +otp);

      if (result.status === 200) {
        setIsOtpVerified(true);
      } else if (result.status === 401) {
        toast({
          variant: "destructive",
          description: "Invalid otp!",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong please try again later!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    setIsLoading(true);
    try {
      const result = await resetPassInDb(email, newPassword);
      if (result.status === 200) {
        toast({
          variant: "default",
          description: "Password changes successfully!",
        });
        await new Promise((res) => {
          setTimeout(() => {
            return res(1);
          }, 5000);
        })
        router.push("sign-in");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center justify-center p-8 border-2 rounded-md border-primary-foreground/40">
        <div className="mx-auto grid">
          <div className="grid gap-2 text-center mb-6">
            <h1 className="text-3xl font-bold">Forget Password</h1>
            <p className="text-balance text-foreground">Enter your email below to reset password</p>
          </div>
          <div className="grid gap-2 my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isOtpSent}
            />
          </div>
          {!isOtpSent ? (
            <div className="mt-2 flex">
              {isLoading ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full" onClick={handleSendOtp}>
                  Send OTP
                </Button>
              )}
            </div>
          ) : !isOtpVerified ? (
            <>
              <div className="grid gap-2">
                <Label>OTP</Label>
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
              <div className="mt-4">
                {isLoading ? (
                  <Button className="w-full" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="text-red-500 text-sm mb-4">*{errorMessage}</p>}
              {/* <Button onClick={handleResetPassword}>Reset Password</Button> */}
              <div className="mt-4">
                {isLoading ? (
                  <Button className="w-full" disabled>
                    <Loader2 className="mr-2 h-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
