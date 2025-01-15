import type { FormField, Option } from "./utils";

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

export interface UserForm {
  email: string;
  phone: string;
  username: string;
  displayName: string;
  role: string;
  isActive: boolean;
}

export interface State {
  user: User;
  userId: string | string[];
  userProfileFormField: FormField;
  profileModal: boolean;
  pandawaModal: boolean;
  inputProfile: {
    id: number;
    label: string;
    name: keyof FormField;
    inputType: string;
    modelValue: string | number;
    required?: boolean;
  }[];
  checked: boolean;
  userLogsColumns: {
    label: string;
    name?: string;
    class: string;
    target?: boolean;
    setter?: boolean;
  }[];
  userAccountLogsColumns: {
    label: string;
    name?: string;
    class: string;
    setter?: boolean;
  }[];
  editParams: {
    status: Option[];
    role: Option[];
  };
}
