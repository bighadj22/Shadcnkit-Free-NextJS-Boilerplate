"use client"
import React, { useEffect, useState } from 'react';
import Marquee from "@/components/ui/marquee";
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Particles from "@/components/ui/particles";
import { useTheme } from 'next-themes';

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

interface TestimonialSectionProps {
  translations: {
    title: string;
    subtitle: string;
    testimonials: Array<{
      name: string;
      company: string;
      testimonial: string;
    }>;
  };
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ translations }) => {
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const avatars = ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg", "/6.jpeg"];
  const testimonials = translations.testimonials.map((t, i) => ({ ...t, avatar: avatars[i] }));

  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <section className="relative z-[2] flex w-full flex-col pt-10 pb-5 overflow-hidden">
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        staticity={50}
        ease={50}
        color={particleColor}
      />
      <div className="flex max-w-[unset] flex-col px-5 md:px-10 xl:px-0 relative z-10">
        <div className="mb-10 flex w-full flex-col">
          <div className="mx-auto flex flex-col items-center text-center">
            <AnimatedGradientText className="mb-4 w-max px-4 py-2 text-foreground">
              {translations.title}
            </AnimatedGradientText>
            <h2 className="mx-auto w-full max-w-3xl text-center text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              {translations.subtitle}
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