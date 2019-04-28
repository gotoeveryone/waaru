export type Prop<T> = () => T;

export interface EventItem {
  name: string;
  remarks: string;
  members: Member[];
}

export interface Member {
  name: string;
  amount: number;
  isPayment: boolean;
  remarks: string;
}
