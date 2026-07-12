import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image: string | null;
  status: string;
  emailVerified: boolean;
  needPasswordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}
