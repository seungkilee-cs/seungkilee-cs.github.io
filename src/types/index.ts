export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  featured: boolean;
  category: "web" | "mobile" | "fullstack" | "consulting";
  year: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: "frontend" | "backend" | "devops" | "algorithms" | "tools";
}
