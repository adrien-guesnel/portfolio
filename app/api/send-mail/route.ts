import { NextRequest, NextResponse } from "next/server"
import Mailjet from "node-mailjet"

export async function POST(req: NextRequest) {
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

    const mjApiKeyPublic = process.env.MJ_APIKEY_PUBLIC
    const mjApiKeyPrivate = process.env.MJ_APIKEY_PRIVATE
    const googleRecaptchaSecret = process.env.GOOGLE_RECAPTCHA_SECRET

    const contactEmail = process.env.CONTACT_EMAIL

    if (!mjApiKeyPublic || !mjApiKeyPrivate || !googleRecaptchaSecret) {
      throw new Error("API keys are missing")
    }

    if (!contactEmail) {
      throw new Error("Missing contact email")
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
          secret: googleRecaptchaSecret,
          response: token,
        }),
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error("Invalid reCAPTCHA token")
    }

    const mailjet = Mailjet.apiConnect(mjApiKeyPublic, mjApiKeyPrivate)

    void mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: contactEmail,
            Name: name,
          },
          To: [
            {
              Email: contactEmail,
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
