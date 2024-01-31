export default interface RequestInterface {
  id: number;
  status: string;
  title: string;
  amount: string;
  date: string;
  checkout_url: string | null;
  reference_number: string | null;
  items: ItemInterface[] | null;
  statuses: RequestStatusInterface[] | null;
}

export interface ItemInterface {
  id: number;
  name: string;
  quantity: number;
  price: number;
  amount: string;
  amount_raw: number;
  created_at: string;
}

export interface RequestStatusInterface {
  id: number;
  status: string;
  date: string;
  is_completed: boolean;
  details: string | null;
  checkout_url: string | null;
  created_at: string;
}
