import { Institution } from "./types";

export function validateInstitution(data: Partial<Institution>): boolean {
  // Campos obligatorios
  if (!data.name || typeof data.name !== "string") return false;
  if (!data.city || typeof data.city !== "string") return false;
  if (!data.province || typeof data.province !== "string") return false;
  if (!data.phone_number || typeof data.phone_number !== "string") return false;
  if (!data.email || typeof data.email !== "string") return false;

  // Campos opcionales
  if (data.description && typeof data.description !== "string") return false;

  return true;
}