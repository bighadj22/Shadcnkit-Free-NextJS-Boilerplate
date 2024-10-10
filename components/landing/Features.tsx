"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import Link from 'next/link'
import Particles from "@/components/ui/particles"
import { useTheme } from 'next-themes'
import { TextGenerateEffect } from "../ui/text-generate-effect"

interface FeatureCardProps {
  title: string
  description: string
  feature: string
  imageUrl: string
  userLink: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, feature, imageUrl, userLink }) => {
  return (
    <Card className="bg-card shadow-lg rounded-3xl overflow-hidden w-full max-w-6xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row md:h-96">
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-primary mb-2">
            {feature}
          </h3>
          <h2 className="text-2xl font-bold mb-3 leading-tight text-card-foreground">
            {title}
          </h2>
          <p className="text-base text-muted-foreground mb-4">
            {description}
          </p>
          <Link href={userLink} className="text-primary hover:underline">
            Learn More
          </Link>
        </div>
        <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>
      </div>
    </Card>
  )
}

const cardData = [
  {
    title: "Next.js 13+ with App Router",
    description: "Build powerful and efficient web applications using the latest version of Next.js with the new App Router.",
    feature: "NEXT.JS 13+",
    imageUrl: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmV4dC5qc3x8fHx8fDE2ODY4NDg2MDQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    userLink: "/next-js-13"
  },
  {
    title: "Cloudflare D1 Database Integration",
    description: "Seamlessly integrate with Cloudflare's D1 database using Drizzle ORM for efficient data management.",
    feature: "CLOUDFLARE D1",
    imageUrl: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2xvdWRmbGFyZXx8fHx8fDE2ODY4NDg2ODI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    userLink: "/cloudflare-d1"
  },
  {
    title: "Logto Authentication",
    description: "Implement secure and user-friendly authentication with Logto, ensuring a smooth user experience.",
    feature: "LOGTO AUTH",
    imageUrl: "https://images.unsplash.com/photo-1504203700686-f21e703e5f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXV0aGVudGljYXRpb258fHx8fHwxNjg2ODQ4NzQw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    userLink: "/logto-authentication"
  },
  {  
    title: "Resend Email Functionality",
    description: "Easily send emails using Resend, a reliable and developer-friendly email service.",
    feature: "RESEND EMAILS",
    imageUrl: "https://images.unsplash.com/photo-1534445810636-67e8b1dbf706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZW1haWx8fHx8fHwxNjg2ODQ4ODM4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    userLink: "/resend-emails"
  },
  {
    title: "Blog System with Dynamic Routing",  
    description: "Create and manage a feature-rich blog with dynamic routing for an engaging user experience.",
    feature: "DYNAMIC BLOG",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmxvZ3x8fHx8fDE2ODY4NDg4ODE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080", 
    userLink: "/blog-system"
  },
  {
    title: "Internationalization Support",
    description: "Build multilingual applications with ease using the built-in internationalization (i18n) support.",
    feature: "INTERNATIONALIZATION",
    imageUrl: "https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZ3VhZ2V8fHx8fHwxNjg2ODQ4OTIy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    userLink: "/internationalization" 
  },
  {
    title: "Admin User Dashboard",
    description: "Manage and monitor your application with a powerful admin dashboard, accessible only to authorized users.",
    feature: "ADMIN DASHBOARD", 
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZGFzaGJvYXJkfHx8fHx8MTY4Njg1MDQyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    userLink: "/admin-dashboard"
  }
];

export default function Features() {
  const { theme } = useTheme()
  const [particleColor, setParticleColor] = useState("#ffffff")

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  return (
    <div className="relative w-full pt-5 pb-5 px-4 overflow-hidden mt-5">
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        staticity={50}
        ease={50}
        color={particleColor}
      />
      <div className="relative z-10">
        <div className="text-center mb-16">
          <AnimatedGradientText className="mb-4 w-max px-4 py-2 text-zinc-950 dark:text-white text-center mx-auto">
            Open Source Boilerplate Features
          </AnimatedGradientText>
          <h1 className="3xl:text-6xl z-[40] mx-auto mb-6 mt-4 max-w-[94%] text-3xl font-bold leading-[36px] text-foreground dark:text-card-foreground md:max-w-[70%] md:text-[50px] md:leading-[60px] lg:max-w-[76%] lg:text-[50px] lg:leading-[68px] xl:max-w-[60%] 2xl:max-w-[48%] 2xl:text-[50px] 2xl:leading-[68px]">
            <TextGenerateEffect
              words="Accelerate Development with ShadcnKit"  
              className="inline-block w-full"
              filter={false}
            />
          </h1>
        </div>
        <div className="space-y-12">
          {cardData.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}