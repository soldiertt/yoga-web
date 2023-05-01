import {Card} from "./card";

export interface Slot {
  id: number;
  courseDate: string;
  courseTime: string;
  participantsCount?: number;
  cards?: Card[];
}
