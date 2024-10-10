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
  learnMore: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, feature, imageUrl, learnMore }) => {
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
          <Link href="#" className="text-primary hover:underline">
            {learnMore}
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

interface FeaturesProps {
  translations: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
      feature: string;
      learnMore: string;
    }>;
  };
}

const Features: React.FC<FeaturesProps> = ({ translations }) => {
  const { theme } = useTheme()
  const [particleColor, setParticleColor] = useState("#ffffff")

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  const imageUrls = [
    "/nextjs14.png",
    "/cloudflare.webp",
    "/logtoio.png",
    "/resend.png",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=4076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681488098851-e3913f3b1908?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1515847049296-a281d6401047?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

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
            {translations.title}
          </AnimatedGradientText>
          <h1 className="3xl:text-6xl z-[40] mx-auto mb-6 mt-4 max-w-[94%] text-3xl font-bold leading-[36px] text-foreground dark:text-card-foreground md:max-w-[70%] md:text-[50px] md:leading-[60px] lg:max-w-[76%] lg:text-[50px] lg:leading-[68px] xl:max-w-[60%] 2xl:max-w-[48%] 2xl:text-[50px] 2xl:leading-[68px]">
            <TextGenerateEffect
              words={translations.subtitle}
              className="inline-block w-full"
              filter={false}
            />
          </h1>
        </div>
        <div className="space-y-12">
          {translations.cards.map((card, index) => (
            <FeatureCard key={index} {...card} imageUrl={imageUrls[index]} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features;