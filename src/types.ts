export interface EventItem {
  name: string;
  date: string;
  summary: number | null;
  remarks: string;
  members: Member[];
}

export interface Member {
  name: string;
  plannedAmount: number;
  amount: number;
  isPayment: boolean;
  remarks: string;
}

export interface BreadCrumb {
  text: string;
  disabled: boolean;
  href?: string;
  to?: string;
}
