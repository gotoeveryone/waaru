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

export interface BreadCrumb {
  text: string;
  disabled: boolean;
  href?: string;
}
