from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Profile(Base):
    __tablename__ = "profile"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    tagline = Column(Text)
    about = Column(Text)
    email = Column(String(100))
    phone = Column(String(20))
    linkedin = Column(String(200))
    github = Column(String(200))
    leetcode = Column(String(200))


class Education(Base):
    __tablename__ = "education"
    
    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String(200), nullable=False)
    degree = Column(String(200), nullable=False)
    cgpa = Column(String(10))
    start_year = Column(String(10))
    end_year = Column(String(10))
    location = Column(String(100))


class Experience(Base):
    __tablename__ = "experience"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    company = Column(String(200), nullable=False)
    location = Column(String(100))
    start_date = Column(String(20))
    end_date = Column(String(20))
    description = Column(Text)
    responsibilities = relationship("Responsibility", back_populates="experience")
    technologies = Column(Text)  # Comma-separated


class Responsibility(Base):
    __tablename__ = "responsibilities"
    
    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experience.id"))
    description = Column(Text, nullable=False)
    experience = relationship("Experience", back_populates="responsibilities")


class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    role = Column(String(150))
    description = Column(Text)
    technologies = Column(Text)  # Comma-separated
    highlights = Column(Text)  # JSON array as string
    link = Column(String(300))
    github = Column(String(300))
    is_featured = Column(Integer, default=0)


class SkillCategory(Base):
    __tablename__ = "skill_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    icon = Column(String(50))
    skills = relationship("Skill", back_populates="category")


class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("skill_categories.id"))
    name = Column(String(100), nullable=False)
    proficiency = Column(Integer, default=80)  # 0-100
    category = relationship("SkillCategory", back_populates="skills")


class Certification(Base):
    __tablename__ = "certifications"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(200), nullable=False)
    date = Column(String(20))
    link = Column(String(300))


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(String(50))
