import { User } from "@/types/users/types";

export function validateUser(user: Partial<User>): boolean {
    if (!user.email || typeof user.email !== 'string') return false;
    if (!user.auth_id || typeof user.auth_id !== 'string') return false;
    if (!user.user_id || typeof user.user_id !== 'string') return false;
    
    return true;
  }
  