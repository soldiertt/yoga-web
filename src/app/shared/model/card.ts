import {Slot} from './slot';

export interface Card {
  id: number;
  userId: string;
  price: number;
  status: 'PENDING' | 'ACTIVE' | 'DELETED';
  capacity: number;
  slots: Slot[];
  createdTime: string;
  updatedTime: string;
}
