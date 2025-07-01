// app/api/apply-promo/route.js
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ success: false, message: "Promo code is required" }, { status: 400 });
    }

    const promo = await client.fetch(
     `*[_type == "promo" && code == $code && active == true][0]`,
      { code: code.toUpperCase() }
    );

    if (!promo) {
      return NextResponse.json({ success: false, message: "Invalid or expired promo code" }, { status: 404 });
    }

    const now = new Date();
    const expiry = promo.expiresAt ? new Date(promo.expiresAt) : null;

    if (expiry && now > expiry) {
      return NextResponse.json({ success: false, message: "Promo code has expired" }, { status: 400 });
    }

    if (promo.usageLimit && promo.timesUsed >= promo.usageLimit) {
      return NextResponse.json({ success: false, message: "Promo code usage limit reached" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      discount: promo.discount,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
