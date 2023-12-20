"use client"

import Lottie from "lottie-react"

import computerAnimation from "./computer_animation.json"

export default function Hero() {
  return (
    <div className="container p-5 flex flex-col lg:flex-row min-h-screen justify-center items-center gap-16 mx-auto">
      <div className="max-w-sm">
        <h1 className="text-3xl">Hi, I&apos;m Adrien Guesnel</h1>
        <h2 className="text-3xl">
          I&apos;m a <span className="text-primary">Tech lead</span> specialist
          in <span className="text-primary">React.js / Node.js</span>
        </h2>
        <p className="text-xl mt-5">
          I&apos;m a french software engineer, currently working at{" "}
          <a className="link link-primary" href="https://www.guiild.fr/">
            Guiild
          </a>{" "}
          as a tech lead.
        </p>
        <a
          className="btn btn-primary mt-5"
          href="https://www.linkedin.com/in/adrien-guesnel/"
        >
          View my linkedin
        </a>
      </div>
      <div>
        <Lottie
          animationData={computerAnimation}
          loop={true}
          className="h-72"
        />
      </div>
    </div>
  )
}
