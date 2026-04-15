import { BRAND } from "@/lib/constants";

type JsonLd = Record<string, unknown>;

export const localBusinessSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND.name,
  description:
    "ISSA certified personal trainer offering in-person and online coaching in Tampa, FL",
  url: BRAND.siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "27.9506",
    longitude: "-82.4572",
  },
  priceRange: "$49-$500",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "06:00",
    closes: "20:00",
  },
  sameAs: BRAND.instagram ? [BRAND.instagram] : [],
};

export const personSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Larry",
  jobTitle: "Personal Trainer",
  description: "ISSA Certified Personal Trainer",
  worksFor: {
    "@type": "LocalBusiness",
    name: BRAND.name,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
  },
};
