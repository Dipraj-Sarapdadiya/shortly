import NextAuth from "next-auth";
import { authOptions } from "@/auth";

export const GET = NextAuth(authOptions).handlers.GET;
export const POST = NextAuth(authOptions).handlers.POST;


