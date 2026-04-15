import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Cancelled | Sculpted by Larry",
  description: "No worries — your spot is still available.",
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 bg-navy">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-body text-[13px] font-medium uppercase tracking-[0.2em] text-gold">
          No Problem
        </p>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-white uppercase tracking-wide leading-[0.95]">
          Payment Cancelled
        </h1>

        <p className="mt-6 font-body text-lg text-gray-300 leading-relaxed">
          No worries &mdash; your spot is still available. If you have questions, book a free call and we&apos;ll figure out the right plan together.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center font-body text-[15px] font-medium bg-gold text-navy rounded-lg px-8 py-3.5 hover:bg-gold-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a Free Call
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center font-body text-[15px] font-medium bg-transparent border border-gold text-gold rounded-lg px-8 py-3.5 hover:bg-gold hover:text-navy transition-all duration-200"
          >
            View Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
