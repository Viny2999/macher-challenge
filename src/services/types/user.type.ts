export interface User {
  id: number;
  cpf: string;
  name: string;
  birth_date: Date;
  street: string;
  house_number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  status?: boolean;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  deleted_at?: Date;
  deleted_by?: number;
}
