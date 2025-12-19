export interface Profile {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  awards: Award[];
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: SocialProfile[];
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface SocialProfile {
  network: string;
  username: string;
  url: string;
}

export interface Work {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary?: string;
  highlights: string[];
  location: string;
}

export interface Education {
  institution: string;
  url?: string;
  area?: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface Skill {
  name: string;
  level?: string;
  keywords: string[];
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  startDate: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
}

export interface Award {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}
