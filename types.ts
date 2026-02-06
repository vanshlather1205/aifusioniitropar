
export interface Mail {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  category: 'Exams' | 'Deadline' | 'Events' | 'General';
  urgency: 'high' | 'medium' | 'low';
}

export interface MenuItem {
  name: string;
  description: string;
  mealType: string;
  time: string;
  image: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  description: string;
  seller: string;
  image: string;
}

export interface LostItem {
  id: string;
  title: string;
  location: string;
  time: string;
  status: 'found' | 'lost';
  image: string;
}
