interface User {
  id: number;
  id_number: string;
  password: string;
  role_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  sex: string;
  contact_number: string;
  email: string;
  birth_date: string;
  birth_place: string;
  address: string;
  is_approved: number;
  reason?: string;
  approved_by?: number;
  createdAt: string;
  updatedAt: string;
}

export default User;
