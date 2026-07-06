"use client";

import { useState } from "react";

// Shared field validators for the waiver intake (used by both /start and
// /waiver so the two flows can never validate the same fields differently).
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** The exact JSON body the /api/waiver route expects (minus `source`). */
export interface WaiverFormPayload {
  participantName: string;
  participantEmail: string;
  participantDob: string;
  participantPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  fitnessAttestation: boolean;
  agree: boolean;
  signatureName: string;
  agreedAt: string;
}

/**
 * Single source of truth for the waiver form's state, validation, and payload.
 *
 * Both the /start enrollment flow (waiver + plan + payment) and the standalone
 * /waiver flow (in-person clients, no payment) drive their identical
 * details/waiver/sign steps off this hook. Keeping the state + validity here
 * means the two flows can't drift — a field rule changed once changes both.
 */
export function useWaiverForm() {
  // Details
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantDob, setParticipantDob] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Waiver
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [fitnessAttestation, setFitnessAttestation] = useState(false);

  // Agree & sign
  const [agree, setAgree] = useState(false);
  const [signatureName, setSignatureName] = useState("");

  const emailOk = EMAIL_REGEX.test(participantEmail.trim());
  const detailsValid =
    participantName.trim() !== "" &&
    emailOk &&
    DATE_REGEX.test(participantDob) &&
    participantPhone.trim() !== "" &&
    emergencyName.trim() !== "" &&
    emergencyPhone.trim() !== "";
  const waiverValid = scrolledToEnd && fitnessAttestation;
  const signValid = agree && signatureName.trim() !== "";

  function buildPayload(): WaiverFormPayload {
    return {
      participantName: participantName.trim(),
      participantEmail: participantEmail.trim(),
      participantDob,
      participantPhone: participantPhone.trim(),
      emergencyName: emergencyName.trim(),
      emergencyPhone: emergencyPhone.trim(),
      fitnessAttestation,
      agree,
      signatureName: signatureName.trim(),
      agreedAt: new Date().toISOString(),
    };
  }

  return {
    participantName, setParticipantName,
    participantEmail, setParticipantEmail,
    participantDob, setParticipantDob,
    participantPhone, setParticipantPhone,
    emergencyName, setEmergencyName,
    emergencyPhone, setEmergencyPhone,
    scrolledToEnd, setScrolledToEnd,
    fitnessAttestation, setFitnessAttestation,
    agree, setAgree,
    signatureName, setSignatureName,
    detailsValid, waiverValid, signValid,
    buildPayload,
  };
}

export type WaiverFormApi = ReturnType<typeof useWaiverForm>;
