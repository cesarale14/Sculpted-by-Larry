import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CalEmbed } from "@/components/booking/CalEmbed";

const CAL_LINK =
  process.env.NEXT_PUBLIC_CALCOM_LINK || "sculpted-by-larry/free-consultation";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Sculpted by Larry",
  description:
    "Book a free 15-minute consultation with Larry. No pressure, no commitment. Let's talk about your fitness goals and find the right program for you.",
};

const steps = [
  { num: "01", title: "Pick a Time", desc: "Choose a 15-minute slot that works for your schedule." },
  { num: "02", title: "Tell Me Your Goals", desc: "We'll discuss where you are now and where you want to be." },
  { num: "03", title: "Get Your Plan", desc: "I'll recommend the best program and we'll map out your next steps." },
];

export default function BookPage() {
  return (
    <>
      <section className="pt-32 pb-10 md:pt-40 md:pb-12 bg-navy text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Free Consultation"
            title="Book Your Free Call"
            subtitle="15 minutes. No pressure. Let's talk about your goals."
            variant="dark"
            as="h1"
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
            <div className="md:col-span-3">
              <div className="bg-navy-light rounded-2xl p-4 border border-navy-lighter min-h-[600px] overflow-hidden">
                <CalEmbed calLink={CAL_LINK} />
              </div>
            </div>

            <aside className="md:col-span-2">
              <h3 className="font-heading text-2xl font-semibold text-white uppercase tracking-wide">
                What to Expect
              </h3>
              <ol className="mt-8 space-y-8">
                {steps.map((step) => (
                  <li key={step.num} className="flex items-start gap-4">
                    <span className="font-heading text-3xl font-bold text-gold/40 shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <p className="font-body text-base font-medium text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 font-body text-sm text-gray-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <blockquote className="mt-10 font-body italic text-sm text-gray-300 border-l-2 border-gold/30 pl-4 leading-relaxed">
                No pressure. No commitment. Just a real conversation about your goals.
              </blockquote>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
