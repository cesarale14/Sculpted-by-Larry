/**
 * Activity Waiver — single source of truth for the document text.
 *
 * Both the /start page (rendered on-screen, scroll-required) and the
 * server-side PDF generator import this module, so the text the participant
 * reads is byte-for-byte the text in the executed PDF.
 *
 * VERSION the text whenever the wording changes — the version string is stored
 * on every waiver row (waiver_version) and stamped into the PDF audit footer,
 * so we always know which document a given participant agreed to.
 *
 * NOTE: This wording is pending legal review by a Florida attorney for
 * e-signature validity. See the go-live checklist.
 */

export const WAIVER_VERSION = "v1-2026-05";
export const ACTIVITY_PROVIDER = "Sculpted by Larry of Larry Faria";
export const GOVERNING_STATE = "Florida";

export const WAIVER_TITLE = "Activity Waiver";

/**
 * Intro paragraph. Contains [date] and [participant name] placeholders that
 * get filled in at execution time (on the PDF) and shown as the live values
 * on-screen.
 */
export const WAIVER_INTRO =
  'THIS ACTIVITY WAIVER FORM (this "Waiver") dated this [date] day of [month, year]. ' +
  "IN CONSIDERATION of being allowed to participate in the Activity and other good and " +
  "valuable consideration, the receipt of which is hereby acknowledged, I [participant name] " +
  '(the "Participant") agree with Sculpted by Larry of Larry Faria (the "Activity Provider") ' +
  "to the following:";

export interface WaiverClause {
  /** Clause number as it appears in the document (1–8). */
  n: number;
  text: string;
  /** Clause 5 is the explicit fitness/health attestation (checkbox). */
  attestation?: boolean;
}

export interface WaiverSection {
  heading: string;
  clauses: WaiverClause[];
}

export const WAIVER_SECTIONS: WaiverSection[] = [
  {
    heading: "DETAILS OF ACTIVITY",
    clauses: [
      {
        n: 1,
        text:
          "The Participant will be participating in the following activity: Personal " +
          'Fitness Coaching (the "Activity") provided by the Activity Provider.',
      },
    ],
  },
  {
    heading: "CONSIDERATION",
    clauses: [
      {
        n: 2,
        text:
          "Being of lawful age and in consideration of being permitted to participate in " +
          "the Activity, the Participant releases and forever discharges the Activity " +
          "Provider, its owners, directors, officers, employees, agents, assigns, legal " +
          "representatives, and successors from all manner of actions, causes of action, " +
          "debts, accounts, bonds, contracts, claims, and demands for or by reason of any " +
          "injury to person or property, including injury resulting in the death of the " +
          "Participant, which has been or may be sustained as a consequence of the " +
          "Participant's participation in the Activity, and not withstanding that such " +
          "damage, loss, or injury may have been caused solely or partly by the negligence " +
          "of the Activity Provider.",
      },
      {
        n: 3,
        text:
          "The Participant understands that the Activity Provider would not be permitted to " +
          "participate in the Activity unless the Participant signed this Waiver.",
      },
    ],
  },
  {
    heading: "CONCURRENT RELEASE",
    clauses: [
      {
        n: 4,
        text:
          "The Participant acknowledges that this Waiver is given with the express intention " +
          "of effecting the extinguishment of certain obligations owed to the Participant by " +
          "the Activity Provider, and with the intention of binding the Participant's spouse, " +
          "heirs, executors, administrators, legal representatives, and assigns.",
      },
    ],
  },
  {
    heading: "FITNESS TO PARTICIPATE",
    clauses: [
      {
        n: 5,
        attestation: true,
        text:
          "The Participant acknowledges to the Activity Provider that the Participant does " +
          "not have any physical limitations, medical ailments, or physical or mental " +
          "disabilities that would limit or prevent the Participant from participating in the " +
          "Activity. If required, the Participant will obtain a medical examination and " +
          "clearance.",
      },
    ],
  },
  {
    heading: "FULL AND FINAL SETTLEMENT",
    clauses: [
      {
        n: 6,
        text:
          "The Participant acknowledges and agrees with the Activity Provider that: (1) the " +
          "Activity Provider has given the Participant sufficient time to carefully read this " +
          "Waiver, (2) the Participant has been given the opportunity and has been encouraged " +
          "to seek independent legal advice prior to signing this Waiver, (3) the Participant " +
          "fully understands the risks and claims that the Participant is waiving to " +
          "participate in the Activity, (4) the Participant is freely and voluntarily " +
          "executing this Waiver, and (5) the Participant is forever prevented from suing or " +
          "otherwise claiming against the Activity Provider for any property loss or personal " +
          "injury that the Participant may sustain while participating in or preparing for " +
          "the Activity.",
      },
    ],
  },
  {
    heading: "GOVERNING LAW",
    clauses: [
      {
        n: 7,
        text:
          "This Waiver will be governed by and construed in accordance with the laws of the " +
          "State of Florida.",
      },
    ],
  },
  {
    heading: "EMERGENCY CONTACT",
    clauses: [
      {
        n: 8,
        text:
          "The Participant has provided the name and phone number of an emergency contact, " +
          "recorded with this Waiver.",
      },
    ],
  },
];

/** Clause 5 text, surfaced as the explicit attestation checkbox label. */
export const FITNESS_ATTESTATION_TEXT = WAIVER_SECTIONS.find((s) =>
  s.clauses.some((c) => c.attestation),
)!.clauses.find((c) => c.attestation)!.text;

/**
 * Fill the intro placeholders with live values.
 * @param dateLabel e.g. "4th" (day) — passed pre-formatted
 * @param monthYear e.g. "June, 2026"
 * @param participantName the participant's typed legal name
 */
export function fillIntro(
  participantName: string,
  dateLabel: string,
  monthYear: string,
): string {
  return WAIVER_INTRO.replace("[date]", dateLabel)
    .replace("[month, year]", monthYear)
    .replace("[participant name]", participantName || "the Participant");
}
