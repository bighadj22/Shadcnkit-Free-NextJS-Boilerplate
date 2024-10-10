"use client"
import React, { useEffect, useState } from 'react';
import Marquee from "@/components/ui/marquee";
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Particles from "@/components/ui/particles";
import { useTheme } from 'next-themes';

// Mock data for testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechCorp",
    testimonial: "ShadcnKit's free starter kit is a game-changer for rapid prototyping. It's saved us so much time!",
    avatar: "/1.jpeg",
  },
  {
    name: "Michael Chen",
    company: "InnovateLab",
    testimonial: "The documentation for ShadcnKit free version is top-notch. It made our learning curve so much smoother.",
    avatar: "/2.jpeg",
  },
  {
    name: "Emily Rodriguez",
    company: "DesignHub",
    testimonial: "We love how customizable ShadcnKit is, even in its free version. It's perfect for our design needs.",
    avatar: "/3.jpeg",
  },
  {
    name: "David Kim",
    company: "StartupX",
    testimonial: "ShadcnKit's free starter kit gave us a solid foundation to build upon. It's been crucial for our MVP.",
    avatar: "/4.jpeg",
  },
  {
    name: "Lisa Thompson",
    company: "GrowthCo",
    testimonial: "The components in ShadcnKit's free version are so well-designed. It's improved our UI consistency greatly.",
    avatar: "/5.jpeg",
  },
  {
    name: "Alex Patel",
    company: "FutureTech",
    testimonial: "We started with ShadcnKit's free version and it's already revolutionized our development process.",
    avatar: "/6.jpeg",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

interface TestimonialCardProps {
  avatar: string;
  name: string;
  company: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, name, company, testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "relative flex w-64 flex-col items-center justify-start px-6 py-8 text-center m-4 transition-all duration-300 rounded-2xl",
        isHovered ? 'shadow-lg transform -translate-y-2' : '',
        "bg-card text-card-foreground"
      )}
      style={{
        '--tw-shadow': isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center mb-3">
        <Image
          src={avatar}
          alt={`${name}'s avatar`}
          width={80}
          height={80}
          className="rounded-full border-4"
          style={{ borderColor: 'hsl(var(--primary))' }}
        />
      </div>
      <h3 className="mt-2 mb-1 text-lg font-bold">
        {name}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {company}
      </p>
      <blockquote className="text-xs italic">
        {testimonial}
      </blockquote>
    </Card>
  );
};

const TestimonialSection: React.FC = () => {
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <section className="relative z-[2] flex w-full flex-col pt-5 pb-5 mt-5 overflow-hidden">
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        staticity={50}
        ease={50}
        color={particleColor}
      />
      <div className="flex max-w-[unset] flex-col px-5 md:px-10 xl:px-0 relative z-10">
        <div className="mb-10 flex w-[stretch] flex-col">
          <div className="mx-auto flex flex-col items-center text-center">
            <AnimatedGradientText className="mx-auto mb-2.5 w-max px-4 py-2 text-foreground">
              What Our Clients Say
            </AnimatedGradientText>
            <h2 className="mx-auto mb-5 w-full text-center text-3xl font-extrabold text-foreground md:mb-8 md:w-[100%] md:text-[48px] md:leading-[60px] lg:w-[90%] xl:w-[70%] xl:text-6xl xl:leading-[70px] 2xl:w-[60%]">
              Hear from our satisfied customers
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden py-10">
          <Marquee pauseOnHover className="[--duration:40s] mb-8">
            {firstRow.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s]">
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;