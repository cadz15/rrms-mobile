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
  purposes?: string;
  delivery_method?: string;
  mailto?: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  postal?: string;
}

export interface ItemInterface {
  id: number;
  name: string;
  degree: string;
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
