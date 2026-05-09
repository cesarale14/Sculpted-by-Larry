import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Free 5-Day Sculpt Starter Plan | Sculpted by Larry",
  description:
    "Download Larry's free 5-day workout and nutrition starter plan. Kickstart your transformation with structured workouts and nutrition basics.",
};

export default function FreePlanPage() {
  return (
    <section className="min-h-screen bg-navy">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-24 md:py-32 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.05]">
          You&apos;ve started before.
        </h1>
        <p className="mt-3 font-heading italic text-2xl md:text-3xl text-gold leading-tight">
          You&apos;ve stopped before, too.
        </p>

        <div className="mt-12 font-body text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
          <p>
            Most people don&apos;t quit fitness because they&apos;re lazy.
            <br />
            They quit because nobody ever taught them what they were doing.
          </p>
          <p>This is a 5-day plan I built for that.</p>
          <p>
            Five workouts. The nutrition rule that actually matters.
            <br />
            No filler. No shortcuts. No &ldquo;just trust the process.&rdquo;
          </p>
          <p>
            If you want to feel what real programming feels like
            <br />
            before you ever pay anyone — start here.
          </p>
        </div>

        <p className="mt-10 font-body text-sm text-gray-400">
          — Larry, ISSA Certified Trainer · Tampa, FL
        </p>

        <div className="mt-10 bg-navy-light rounded-2xl p-6 md:p-8 border border-navy-lighter">
          <LeadCaptureForm />
        </div>

        <p className="mt-6 font-body text-xs text-gray-500">
          (One email. The plan. No spam. Reply if you want to talk.)
        </p>
      </div>
    </section>
  );
}
