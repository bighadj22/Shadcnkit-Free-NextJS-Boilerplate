import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { EmailSignature } from "./EmailSignature";

interface ShadcnKitWelcomeEmailProps {
  email: string;
}

const baseUrl = "https://shadcnkit.com";

export const ShadcnKitWelcomeEmail: React.FC<ShadcnKitWelcomeEmailProps> = ({
  email,
}) => {
  const firstName = email.split('@')[0].split('.')[0];

  return (
    <Html>
      <Head />
      <Preview>Welcome to ShadcnKit "Free" Demo </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#4A90E2",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Container className="my-20">
            <Link href={baseUrl} className="mx-auto block w-fit">
              <Img
                src="https://shadcnkit.com/shadcnkit.png"
                width="200"
                height="75"
                alt="ShadcnKit Logo"
                style={{ margin: '0 auto' }}
              />
            </Link>
          </Container>
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8 text-purple-800">
              Welcome to ShadcnKit!
            </Heading>

            <Section>
              <Text style={{ color: '#4A5568' }}>
                Hey there, {firstName}! We're thrilled you're trying out the ShadcnKit "Free" demo.
              </Text>

              <Text style={{ color: '#4A5568' }}>
                ShadcnKit is designed to make your UI development process smoother and more efficient. With our comprehensive set of React components built with Tailwind CSS, you're about to experience a new level of ease in creating beautiful, responsive user interfaces.
              </Text>

              <Text style={{ color: '#4A5568' }}>
                Your ShadcnKit demo is all set up and ready to go. Want to see it in action? Head over to your dashboard and start exploring our components. We think you'll find them pretty impressive!
              </Text>
            </Section>

            <Section className="text-center">
              <Button
                href={`${baseUrl}/en/dashboard`}
                style={{
                  backgroundColor: '#4A90E2',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Explore Your Dashboard
              </Button>
            </Section>

            <Section>
              <Text style={{ color: '#4A5568' }}>
                We're excited to see what you'll create with ShadcnKit. If you have any questions or need assistance, don't hesitate to reach out. Our team is here to help you make the most of our UI components.
              </Text>

              <Text style={{ color: '#4A5568' }}>
                P.S. We'd love to hear your feedback on the ShadcnKit demo. Your insights will help us continue to improve and expand our offerings!
              </Text>
            </Section>

            <EmailSignature
              name="The ShadcnKit Team"
              position="UI Enthusiasts"
              company="ShadcnKit"
            />
          </Container>

          <Container className="mt-20">
            <Text className="text-center text-gray-400 mb-45">
              Shadcnkit, 651 N Broad St, Middletown, DE 19709, New Castle County
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ShadcnKitWelcomeEmail;