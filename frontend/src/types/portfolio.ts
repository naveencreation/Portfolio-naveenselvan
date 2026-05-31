export interface Profile {
    id: number;
    name: string;
    title: string;
    tagline?: string;
    about?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    leetcode?: string;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    cgpa?: string;
    start_year?: string;
    end_year?: string;
    location?: string;
}

export interface Responsibility {
    id: number;
    description: string;
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    location?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    technologies?: string;
    responsibilities: Responsibility[];
}

export interface Project {
    id: number;
    title: string;
    role?: string;
    description?: string;
    technologies?: string;
    highlights?: string;
    link?: string;
    github?: string;
    is_featured: number;
}

export interface Skill {
    id: number;
    name: string;
    proficiency: number;
}

export interface SkillCategory {
    id: number;
    name: string;
    icon?: string;
    skills: Skill[];
}

export interface Certification {
    id: number;
    title: string;
    issuer: string;
    date?: string;
    link?: string;
}

export interface Portfolio {
    profile: Profile | null;
    education: Education[];
    experiences: Experience[];
    projects: Project[];
    skill_categories: SkillCategory[];
    certifications: Certification[];
}
