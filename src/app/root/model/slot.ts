import {Card} from "./card";

export interface Slot {
  id: number;
  courseTimestamp: string;
  courseTime: string;
  participantsCount?: number;
  cards?: Card[];
}
