import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const result = await sendMail({
      to: "jason@bluedot.it.com",
      subject: `Bluedot contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><pre>${message}</pre>`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, id: result.messageId });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
