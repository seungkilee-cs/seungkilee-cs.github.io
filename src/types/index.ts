export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
  featured: boolean;
}

export interface NavItem {
  name: string;
  href: string;
}
