export interface DraftObj {
  _id?: string;
  name: string;
  author: string;
  discipline: string;
  image?: string;
  resume?: string;
  createdAt?: string;
  introduction?: string;
  content?: string;
  bibliography?: string;
  images?: string[];
  requested?: boolean;
}

export interface NewData {
  name?: string;
  author?: string;
  discipline?: string;
  image?: string;
  resume?: string;
  introduction?: string;
  content?: string;
  bibliography?: string;
  images?: string[];
  requested?: boolean;
}
