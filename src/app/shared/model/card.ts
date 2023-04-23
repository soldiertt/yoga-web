export interface Card {
  id: number;
  userId: string;
  status: 'PENDING' | 'ACTIVE' | 'DELETED';
  capacity: number;
  createdTime: string;
  updatedTime: string;
}
