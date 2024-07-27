"use client"

import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ContactImg from "@public/img/contact.png"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { FormEvent, RefObject, useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { toast } from "react-toastify"

import { Button } from "@components/Button"
import Input from "@components/Input"
import Textarea from "@components/Textarea"

interface HeroProps {
  className?: string
}

export default function Contact({ className }: HeroProps) {
  const t = useTranslations("Contact")
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null)

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
      setEmail(data?.email as string)

      if (response.ok) {
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
      className={clsx("bg-[#eed3b9] dark:bg-[#2e1300] py-10", className)}
    >
      <div className="container flex flex-col lg:flex-row min-h-screen justify-center items-center mx-auto text-black dark:text-lightBrown gap-2">
        <div className="max-w-xl flex flex-col gap-6 text-center">
          <h2 className="h2">{t("contactMe")}</h2>
          <p className="body-medium">{t("contactMeDescription")}</p>
          <Image src={ContactImg} alt="Contact me" placeholder="blur" />
        </div>
        <div className="w-full max-w-xl">
          {emailSent ? (
            <div className="flex flex-col gap-5 items-center">
              <FontAwesomeIcon
                icon={faEnvelopeCircleCheck}
                size="5x"
                className="text-primary mx-auto"
              />
              <p className="body-large text-center">
                {t("messageSent", { email })}
              </p>
            </div>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubmit}>
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
                className="self-end mr-5"
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE!}
                ref={recaptcha}
              />
              <Button
                type="submit"
                className="button-contained w-fit self-end mr-5 mt-5"
              >
                {t("submit")}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
