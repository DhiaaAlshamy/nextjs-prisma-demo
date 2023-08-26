import { Cuisine, Location } from "@prisma/client";

export interface RestaurantType {
  id: number;
  name: string;
  main_image: string;
  images: string;
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  price: number;
  location: Location;
  cuisine: Cuisine;
  created_at: Date;
  updated_at: Date;
}
