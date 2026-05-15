export interface Program {
  title: string;
  description: string;
  image?: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface Project {
  id: string;
  year: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tag: string;
}

export interface Talent {
  id: string;
  name: string;
  role: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  views: string;
  category: string;
}

export interface Testimonial {
  text: string;
  author?: string;
}

export interface Event {
  month: string;
  activity: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  date: string;
  duration: string;
  audioUrl: string;
  thumbnail?: string;
}