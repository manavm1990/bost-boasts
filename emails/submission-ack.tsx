import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { EDITOR_EMAIL, SITE_NAME } from "@/lib/site-info";

type SubmissionAckEmailProps = {
  name: string;
  title?: string;
  siteUrl: string;
};

const PREVIEW_DEFAULTS = {
  name: "Jordan Lee",
  title: "Why the district needs a real town hall",
  siteUrl: "http://localhost:3000",
} satisfies SubmissionAckEmailProps;

export default function SubmissionAckEmail({
  name = PREVIEW_DEFAULTS.name,
  title = PREVIEW_DEFAULTS.title,
  siteUrl = PREVIEW_DEFAULTS.siteUrl,
}: SubmissionAckEmailProps = PREVIEW_DEFAULTS) {
  const preview = title
    ? `We received your editorial: ${title}`
    : "We received your editorial submission";

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={kicker}>{SITE_NAME}</Text>
          <Heading style={heading}>Submission received</Heading>
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Thanks for sending your editorial
              {title ? (
                <>
                  , <strong>{title}</strong>,
                </>
              ) : null}{" "}
              to {SITE_NAME}. It&apos;s in our review queue.
            </Text>
            <Text style={text}>
              Publication isn&apos;t guaranteed — we choose what runs based on
              sourcing, clarity, and fit for the district. We&apos;ll reply at
              this address if we have questions or need more sourcing before a
              piece can run.
            </Text>
            <Text style={text}>
              Guide and guidelines:{" "}
              <Link href={`${siteUrl}/editorials`} style={link}>
                {siteUrl}/editorials
              </Link>
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            {SITE_NAME}
            <br />
            <Link href={`mailto:${EDITOR_EMAIL}`} style={link}>
              {EDITOR_EMAIL}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

SubmissionAckEmail.PreviewProps = PREVIEW_DEFAULTS;

const main = {
  backgroundColor: "#f6f6f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "560px",
  border: "1px solid #e5e5e0",
};

const kicker = {
  color: "#b45309",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  margin: "0 0 12px",
};

const heading = {
  color: "#111111",
  fontSize: "22px",
  fontWeight: 800,
  lineHeight: "1.3",
  margin: "0 0 20px",
};

const text = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "1.55",
  margin: "0 0 14px",
};

const link = {
  color: "#b45309",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e5e5e0",
  margin: "24px 0 16px",
};

const footer = {
  color: "#737373",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: 0,
};
