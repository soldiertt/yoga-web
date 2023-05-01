import {Card} from "./card";

export interface YogaUser {
  userId: string;
  cards?: Card[];
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
