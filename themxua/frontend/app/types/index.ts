// Common types used across the application

export interface RestaurantInfo {
  title: string;
  logo?: string;
  phone?: string;
  linkFacebook?: string;
  linkInstagram?: string;
}

export interface MenuData {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export interface EventData {
  _id: string;
  title: string;
  hook: string;
  description: string;
  time: string;
  image: string;
  imageMobile?: string;
  slug: string;
  createdAt: string;
}

export interface HeroData {
  title: string;
  description: string;
  image?: string;
  buttonText: string;
}

export interface BookingData {
  name: string;
  numberOfPeople: string;
  phoneNumber: string;
  date: string;
  time: string;
  userRequest?: string;
}
