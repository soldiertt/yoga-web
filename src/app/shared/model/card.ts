import {Slot} from './slot';
import {UserProfile} from './user-profile';

export interface Card {
  id: number;
  userId: string;
  price: number;
  status: 'PENDING' | 'ACTIVE' | 'DELETED';
  capacity: number;
  slots: Slot[];
  owner?: UserProfile;
  createdTime: string;
  updatedTime: string;
}
