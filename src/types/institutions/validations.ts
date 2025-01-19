// src/app/api/institutions/validations.ts
import { Institution } from "./types";

export function validateInstitution(data: Partial<Institution>): boolean {
  if (!data.name || typeof data.name !== "string") return false;
  if (data.description && typeof data.description !== "string") return false;
  return true;
}
