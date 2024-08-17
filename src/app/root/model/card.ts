import {Slot} from './slot';
import {YogaUser} from "./yoga-user";

export interface Card {
  id: number;
  price: number;
  status: 'PENDING' | 'ACTIVE' | 'DELETED';
  capacity: number;
  expirationTime: string;
  slots: Slot[];
  owner?: YogaUser;
  createdTime: string;
  updatedTime: string;
}
