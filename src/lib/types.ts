export interface Response {
  result: any;
  success: boolean;
  message: string;
  timestamp: number;
  id: string;
}

export interface Event {
  name: string;
  description: string;
  id: string;
  date: string;
  location: string;
  image: string;
  href: string;
}
