import { type Dispatch, type SetStateAction } from "react";

export type State<T> = Dispatch<SetStateAction<T>>;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface Response {
  result: any;
  success: boolean;
  message: string;
  timestamp: number;
  id: string;
}

export interface Event {
  name: string;
  description: string;
  id: string;
  date: string;
  location: string;
  image: string;
  href: string;
  perks: string[];
}

export enum Permission {
  DEFAULT, // 0
  CREATE_EVENT, // 1
  EDIT_EVENT, // 2
  DELETE_EVENT, // 3
  ADMIN, // 4 - All permissions
}
