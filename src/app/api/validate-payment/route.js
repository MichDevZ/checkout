import { WebpayPlus } from 'transbank-sdk'; 
import { NextResponse } from 'next/server';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; 
import axios from 'axios';



const tx = new WebpayPlus.Transaction(new Options(process.env.Tbk_Api_Key_Id, process.env.Tbk_Api_Key_Secret, Environment.Production));
export async function POST(req) { 

    try {
        const { token } = await req.json();

       const response = await tx.commit(token);

        const response2 = await tx.refund('123183ac75eda4631c08ba059c2c09d0a6be20a365a99f7fd1672befa944512d', 23816 )

        console.log(response2)

        return NextResponse.json(response);
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }



}
