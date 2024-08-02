import { NextRequest, NextResponse } from "next/server"
import Mailjet from "node-mailjet"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.json()

    const { name, email, message, companyName } = formData
    const token = formData[`g-recaptcha-response`]

    console.info("Received a new message:")
    console.info("Name:", name)
    console.info("Email:", email)
    console.info("Company Name:", companyName)
    console.info("Message:", message)
    console.info("Token:", token)

    if (
      !process.env.MJ_APIKEY_PUBLIC ||
      !process.env.MJ_APIKEY_PRIVATE ||
      !process.env.GOOGLE_RECAPTCHA_SECRET
    ) {
      throw new Error("API keys are missing")
    }

    if (!name || !email || !message || !token) {
      throw new Error("Missing required fields")
    }

    // Verify Google reCAPTCHA token
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.GOOGLE_RECAPTCHA_SECRET,
          response: token,
        }),
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error("Invalid reCAPTCHA token")
    }

    const mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE,
    )

    void mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: email,
            Name: name,
          },
          To: [
            {
              Email: "contact@aguesnel.fr",
            },
          ],
          Subject: `${name} contacts you on aguesnel.fr form`,
          TextPart: `Name:${name}\nEmail:${email}\nCompany name: ${companyName}\n\nMessage :\n${message}`,
        },
      ],
    })

    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "An error happened during the sent of the message" },
      { status: 500 },
    )
  }
}
