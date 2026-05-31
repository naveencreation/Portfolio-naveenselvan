from pydantic import BaseModel
from typing import List, Optional


# Profile schemas
class ProfileBase(BaseModel):
    name: str
    title: str
    tagline: Optional[str] = None
    about: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    leetcode: Optional[str] = None

class ProfileResponse(ProfileBase):
    id: int
    class Config:
        from_attributes = True


# Education schemas
class EducationBase(BaseModel):
    institution: str
    degree: str
    cgpa: Optional[str] = None
    start_year: Optional[str] = None
    end_year: Optional[str] = None
    location: Optional[str] = None

class EducationResponse(EducationBase):
    id: int
    class Config:
        from_attributes = True


# Experience schemas
class ResponsibilityResponse(BaseModel):
    id: int
    description: str
    class Config:
        from_attributes = True

class ExperienceBase(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[str] = None

class ExperienceResponse(ExperienceBase):
    id: int
    responsibilities: List[ResponsibilityResponse] = []
    class Config:
        from_attributes = True


# Project schemas
class ProjectBase(BaseModel):
    title: str
    role: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[str] = None
    highlights: Optional[str] = None
    link: Optional[str] = None
    github: Optional[str] = None
    is_featured: int = 0

class ProjectResponse(ProjectBase):
    id: int
    class Config:
        from_attributes = True


# Skill schemas
class SkillBase(BaseModel):
    name: str
    proficiency: int = 80

class SkillResponse(SkillBase):
    id: int
    class Config:
        from_attributes = True

class SkillCategoryBase(BaseModel):
    name: str
    icon: Optional[str] = None

class SkillCategoryResponse(SkillCategoryBase):
    id: int
    skills: List[SkillResponse] = []
    class Config:
        from_attributes = True


# Certification schemas
class CertificationBase(BaseModel):
    title: str
    issuer: str
    date: Optional[str] = None
    link: Optional[str] = None

class CertificationResponse(CertificationBase):
    id: int
    class Config:
        from_attributes = True


# Contact schemas
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageResponse(ContactMessageCreate):
    id: int
    created_at: Optional[str] = None
    class Config:
        from_attributes = True


# Full portfolio response
class PortfolioResponse(BaseModel):
    profile: Optional[ProfileResponse] = None
    education: List[EducationResponse] = []
    experiences: List[ExperienceResponse] = []
    projects: List[ProjectResponse] = []
    skill_categories: List[SkillCategoryResponse] = []
    certifications: List[CertificationResponse] = []
