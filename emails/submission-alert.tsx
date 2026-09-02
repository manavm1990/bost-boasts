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
import { SITE_NAME } from "@/lib/site-info";

type SubmissionAlertEmailProps = {
  name: string;
  email: string;
  title?: string;
  thesis: string;
  body: string;
  sources: string[];
  documentId: string;
  studioUrl: string;
};

const previewDefaults = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  title: "Why the district needs a real town hall",
  thesis:
    "Constituents deserve an unscripted forum with their representative before the next vote.",
  body: "Last month's closed-door briefing left more questions than answers. A public town hall is the minimum bar for accountability in IL-12.\n\nWe should insist on a date, an open mic, and a record of what was promised.",
  sources: [
    "https://example.com/coverage/town-hall",
    "House calendar, March session",
  ],
  documentId: "draft.submission.preview",
  studioUrl: "http://localhost:3000/studio",
} satisfies SubmissionAlertEmailProps;

export default function SubmissionAlertEmail({
  name,
  email,
  title,
  thesis,
  body,
  sources,
  documentId,
  studioUrl,
}: SubmissionAlertEmailProps) {
  const label = title || "(untitled)";
  const preview = `New editorial from ${name}: ${label}`;
  const bodyPreview =
    body.length > 600 ? `${body.slice(0, 600).trimEnd()}…` : body;

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={kicker}>{SITE_NAME} · editorial queue</Text>
          <Heading style={heading}>{label}</Heading>
          <Section>
            <Text style={meta}>
              <strong>{name}</strong>
              {" · "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            <Text style={labelText}>One-sentence point</Text>
            <Text style={text}>{thesis}</Text>
            <Text style={labelText}>Draft (excerpt)</Text>
            <Text style={pre}>{bodyPreview}</Text>
            <Text style={labelText}>Sources</Text>
            {sources.map((source) => (
              <Text key={source} style={sourceLine}>
                • {source}
              </Text>
            ))}
            <Text style={text}>
              <Link href={studioUrl} style={link}>
                Open in Studio
              </Link>
              <br />
              <span style={muted}>Document id: {documentId}</span>
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Reply to this email to reach the submitter directly.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Used by `email dev` when no runtime props are passed.
SubmissionAlertEmail.PreviewProps = previewDefaults;

const main = {
  backgroundColor: "#f6f6f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "600px",
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
  margin: "0 0 12px",
};

const meta = {
  color: "#333333",
  fontSize: "14px",
  margin: "0 0 20px",
};

const labelText = {
  color: "#737373",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  margin: "16px 0 6px",
};

const text = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "1.55",
  margin: "0 0 8px",
};

const pre = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap" as const,
  margin: "0 0 8px",
};

const sourceLine = {
  color: "#333333",
  fontSize: "13px",
  lineHeight: "1.45",
  margin: "0 0 4px",
};

const link = {
  color: "#b45309",
  textDecoration: "underline",
};

const muted = {
  color: "#737373",
  fontSize: "12px",
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
