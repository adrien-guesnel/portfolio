"use client"

import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ContactImg from "@public/img/contact.webp"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { toast } from "sonner"

import { Button } from "@/src/app/components/Button"
import Input from "@/src/app/components/Input"
import Textarea from "@/src/app/components/Textarea"

interface HeroProps {
  className?: string
}

export default function Contact({ className }: HeroProps) {
  const t = useTranslations("Contact")
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const recaptcha = useRef<ReCAPTCHA>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })

      recaptcha?.current?.reset()

      if (response.ok) {
        setEmail(data?.email as string)
        setEmailSent(true)
      } else {
        console.error("Failed to send email")
        toast.error(t("emailFailed"))
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast.error(t("emailFailed"))
    }
  }

  return (
    <div
      id="contact"
      className={clsx("bg-[#eed3b9] dark:bg-[#2e1300]", className)}
    >
      <div className="dark:text-light-brown container mx-auto flex flex-col justify-center gap-2 text-black lg:flex-row">
        <div className="flex max-w-2xl flex-col justify-between">
          <div className="mt-20 flex flex-col gap-6 text-center lg:mt-32">
            <h2 className="h2">{t("contactMe")}</h2>
            <p className="body-medium">{t("contactMeDescription")}</p>
          </div>
          <Image
            src={ContactImg}
            alt="Illustration of Adrien on the phone"
            placeholder="blur"
            className="hidden lg:block"
          />
        </div>
        <div
          className={clsx(
            "mx-auto w-full max-w-lg lg:m-0",
            emailSent ? "self-center" : "",
          )}
        >
          {emailSent ? (
            <div className="flex flex-col items-center gap-5 py-8">
              <FontAwesomeIcon
                icon={faEnvelopeCircleCheck}
                size="5x"
                className="text-primary mx-auto"
              />
              <p className="body-large text-center">
                {t("messageSent", { email: email ?? "" })}
              </p>
            </div>
          ) : (
            <form
              className="my-10 flex flex-col lg:my-20"
              onSubmit={handleSubmit}
            >
              <Input
                label={t("name")}
                name="name"
                isRequired
                type="text"
                placeholder={t("placeholderName")}
              />
              <Input
                label={t("companyName")}
                name="companyName"
                type="text"
                placeholder={t("placeholderCompanyName")}
              />
              <Input
                label={t("email")}
                name="email"
                isRequired
                type="email"
                placeholder={t("placeholderEmail")}
              />
              <Textarea
                label={t("message")}
                name="message"
                isRequired
                rows={5}
                placeholder={t("placeholderMessage")}
              />
              <ReCAPTCHA
                size="normal"
                className="mr-5 self-end"
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE!}
                ref={recaptcha}
              />
              <Button
                type="submit"
                className="button-contained mt-5 mr-5 w-fit self-end"
              >
                {t("submit")}
              </Button>
            </form>
          )}
        </div>
      </div>
      <Image
        src={ContactImg}
        alt="Illustration of Adrien on the phone"
        placeholder="blur"
        className="mx-auto block max-w-lg lg:hidden"
      />
    </div>
  )
}
