import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-navy px-6 py-24">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-heading text-8xl md:text-9xl font-bold text-gold/20 leading-none">
          404
        </p>
        <h1 className="mt-4 font-heading text-3xl md:text-4xl font-semibold text-white uppercase tracking-wide">
          Page Not Found
        </h1>
        <p className="mt-3 font-body text-base text-gray-300 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-body text-[15px] font-medium bg-gold text-navy rounded-lg px-8 py-3.5 hover:bg-gold-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            Back to Home
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
