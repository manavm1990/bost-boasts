import type { Metadata } from "next";
import Link from "next/link";
import { H1, Kicker, List, P, SectionHeading } from "@/components/typography";

export const metadata: Metadata = {
  title: "Reader Editorials",
  description:
    "Submission guide for IL-12 Dispatch reader editorials — opinion pieces from readers, reviewed for sourcing and libel exposure before publication.",
  alternates: {
    canonical: "/editorials",
  },
};

export default function EditorialsPage() {
  return (
    <main className="container mx-auto px-6 pt-11 pb-24">
      <div className="mx-auto max-w-190">
        <Kicker section="Opinion" />
        <H1 className="mt-3.5 font-extrabold">Reader Editorials</H1>

        <div className="my-8 border-l-4 border-brand bg-brand-tint px-6 py-5">
          <P className="mt-0 font-serif text-lg leading-relaxed text-slate-800 italic">
            Reader Editorials are opinion pieces submitted by IL-12 Dispatch
            readers. They reflect the views of their individual authors, not the
            Dispatch. They are reviewed for obvious factual errors, sourcing,
            and libel exposure before publication, but they are not held to the
            same verification standard as our reporting. Reporting and
            editorials are kept in separate sections for this reason.
          </P>
        </div>

        <SectionHeading className="mt-12">Submission Guide</SectionHeading>

        <Kicker section="Before You Write" className="mb-2.5" />
        <P className="mt-0 mb-2">
          Pick one point. One argument, stated in one sentence. If your sentence
          needs "and" or "also," you have two pieces, not one. Split them.
        </P>

        <Kicker section="What We're Looking For" className="mt-8 mb-2.5" />
        <div className="space-y-5">
          <P className="mt-0">
            <strong className="text-slate-900">A local hook.</strong> Tie your
            piece to something specific: a vote, a local event, a decision that
            affects IL-12. "Rep. Bost voted for X on [date]" beats "Congress is
            broken."
          </P>
          <P className="mt-0">
            <strong className="text-slate-900">
              One clear point, argued all the way through.
            </strong>{" "}
            Every paragraph should support the same central claim. Side points
            that don't serve the main argument get cut or the piece gets sent
            back.
          </P>
          <P className="mt-0">
            <strong className="text-slate-900">Plain language.</strong> Short
            sentences. No jargon. Write like you're explaining this to a
            neighbor, not lecturing them. Read your draft out loud before you
            send it. If it sounds like a lecture, rewrite it.
          </P>
          <P className="mt-0">
            <strong className="text-slate-900">A specific ending.</strong> Tell
            the reader what to do: contact an official, attend a meeting, look
            something up. "We must do better" is not an ending. "Call Rep.
            Bost's office at [number] and ask why he voted X" is.
          </P>
          <P className="mt-0">
            <strong className="text-slate-900">No name-calling.</strong> You can
            say someone's record contradicts their statements. You cannot call
            them a liar, a hypocrite, or worse. Let the contradiction speak.
            It's stronger than the insult.
          </P>
        </div>

        <Kicker
          section="Sourcing Requirements (Non-Negotiable)"
          className="mt-8 mb-2.5"
        />
        <P className="mt-0">
          Every factual claim needs a source you can hand us:
        </P>
        <List>
          <li>
            A vote record: link to the roll call (clerk.house.gov or ilga.gov)
          </li>
          <li>
            A quote: the exact words, plus where and when it was said, plus a
            link or screenshot
          </li>
          <li>
            A statistic: name the source (government data, a named study, a
            named news outlet) and provide a link
          </li>
          <li>
            "I heard," "I think," or "everyone knows" does not count as sourcing
          </li>
        </List>
        <P>
          If we can't verify a claim quickly from what you give us, we will send
          it back and ask for the source before it runs. This is the single
          biggest reason submissions get delayed. Save yourself the round trip:
          attach your sources when you submit.
        </P>

        <Kicker section="Format" className="mt-8 mb-2.5" />
        <List>
          <li>
            Aim for 1,000 words or under. Not a hard cutoff, but longer pieces
            are less likely to get read closely and more likely to get sent back
            for trimming.
          </li>
          <li>
            We’ll ask for your full name and a contact email when you submit.
            The email is for follow-up only and won’t be published.
          </li>
          <li>
            Submit through the{" "}
            <Link
              href="/editorials/submit"
              className="font-bold text-brand underline underline-offset-2"
            >
              submission form
            </Link>
          </li>
        </List>

        <Kicker section="What Gets Rejected Outright" className="mt-8 mb-2.5" />
        <List>
          <li>Attacks on private individuals (not public officials) by name</li>
          <li>Claims we can't verify and you can't source</li>
          <li>Multiple unrelated arguments crammed into one piece</li>
          <li>
            Anything libelous — a false factual claim, stated as fact, that
            damages someone's reputation
          </li>
        </List>

        <Kicker
          section="What Happens After You Submit"
          className="mt-8 mb-2.5"
        />
        <P className="mt-0 mb-10">
          The Dispatch is currently run by a small volunteer team. We will do a
          light check: obvious factual errors, sourcing, libel exposure. If
          something looks wrong and we have time to follow up, we may tell you
          what needs fixing so you can revise and resend. We can't promise a
          response to every submission, especially if something is missing key
          sourcing. Please don't take it personally.
        </P>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-8">
          <P className="mt-0 font-serif text-lg text-slate-900 italic">
            Publication isn't guaranteed. We choose what runs.
          </P>
          <Link
            href="/editorials/submit"
            className="inline-flex items-center gap-2.5 bg-brand px-6 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-dark"
          >
            Submit an Editorial &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
