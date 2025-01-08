export interface User {
  id: number;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  isPhoneVerified: boolean;
  username: string;
  displayName: string;
  role: string;
  isActive: boolean;
  image: string | null;
  purchaseCounts: number;
  gsPoints: number;
  hasStore: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string | null;
}
