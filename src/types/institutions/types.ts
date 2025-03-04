// types/institution.ts

export type Institution = {
  image_url: string;
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  country: string;
  phone_number: string;
  email: string;
  website: string;
  description: string;
  is_active: boolean;
  user_id: string;
  image?: File;
  
};
