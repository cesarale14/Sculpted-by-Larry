import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Free 5-Day Sculpt Starter Plan",
  description:
    "Get Larry's free 5-Day Sculpt Starter Plan delivered to your inbox. Start your fitness transformation today.",
};

const included = [
  "5-day structured workout plan",
  "Basic nutrition framework",
  "Exercise demonstrations",
  "Hydration & recovery guide",
];

export default function FreePlanPage() {
  return (
    <section className="min-h-screen bg-navy">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-24 md:py-32 text-center">
        <p className="font-body text-[13px] font-medium uppercase tracking-[0.2em] text-gold mb-4">
          Free Download
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase tracking-wide leading-[0.95]">
          Get Larry&apos;s Free
        </h1>
        <h2 className="mt-2 font-heading text-4xl md:text-5xl font-bold text-gold uppercase tracking-wide leading-[0.95]">
          5-Day Sculpt Plan
        </h2>
        <p className="mt-6 font-body text-lg text-gray-300 leading-relaxed">
          5 days of workouts + nutrition basics to kickstart your transformation.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {included.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <Check size={18} strokeWidth={1.5} className="text-gold shrink-0" />
              <span className="font-body text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-navy-light rounded-2xl p-6 md:p-8 border border-navy-lighter">
          <LeadCaptureForm />
        </div>

        <p className="mt-6 font-body text-sm text-gray-500">
          Join 100+ people who&apos;ve started their journey.
        </p>
      </div>
    </section>
  );
}
