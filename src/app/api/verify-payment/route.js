import { NextRequest,NextResponse } from "next/server";


export async function POST(request){
    
    const { reference } = await request.json()


    console.log(reference);
    

    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
        //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_TEST_SECRET_KEY}`, // secret key in .env
          Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`, // secret key in .env
        },
      });


      const data = await res.json();
      console.log(data)
      if (data.status && data.data.status === "success") {
        
        return NextResponse.json({ success: true, data: data.data });
      } else {
        return NextResponse.json({ success: false, error: data.message });
      }

}