// NodeMailer sending
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { Otp } from '@/lib/models/Otp';
import connectDB from "@/lib/db";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'getsetotp@gmail.com',
        pass: 'cokobcdridsvwjoo',
    },
});

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { email } = await request.json();
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);
        await Otp.create({ email, otp, expiry });


        await transporter.sendMail({
            from: 'getsetotp@gmail.com',
            to: email,
            subject: 'Your OTP to set Password',
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        });

        return NextResponse.json({ message: 'OTP sent to email' }, { status: 200 });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json({ error: 'Failed to send OTP. Try again later.' }, { status: 500 });
    }
}
