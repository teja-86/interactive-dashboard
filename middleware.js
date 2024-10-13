import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const res = NextResponse.next();
    const superbase = createMiddlewareClient({req, res});
    await superbase.auth.getSession();
    return res;
}