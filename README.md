# CareerForge

**CareerForge** is an engineering-driven platform concept designed to help job seekers **tailor, generate, and track high-quality job applications** in a structured and reproducible way, using AI as an assistive tool — not as a black box.

This repository focuses on the **core system architecture**: backend services, AI provider abstraction, document generation, and data persistence.

---

## 🚀 Vision

Most job portals optimize for volume.  
CareerForge is designed to optimize for **clarity, intent, and quality**.

The goal is to provide job seekers with:
- Structured application data
- Reproducible document generation (CVs, cover letters)
- Transparent AI-assisted tailoring
- A clear application history instead of scattered files and emails

This is a **long-term system design project**, not a quick automation script.

---

## ✨ Core Functionalities

- **CV Management**: Upload, parse, and store CVs. Extract structured data using AI for accurate representation of skills and experiences.
- **Job Tracking**: Save and manage job listings in a centralized dashboard. Keep track of application statuses, links, and notes.
- **Skill Gap Analysis**: Compare a job description against your parsed CV. The AI highlights matching skills, missing skills, and suggests areas for improvement.
- **AI-Powered Tailoring**: Automatically tailor your CV and generate customized cover letters based on specific job requirements using pluggable LLM providers (OpenAI, Gemini, DeepSeek).
- **Document Generation**: Construct professional, reproducible PDF documents (CVs and Cover Letters) using a deterministic LaTeX template builder.
- **Job Search Engine (Planned/Beta)**: Browse and discover new job opportunities directly within the platform.
- **Modern UI/UX**: A clean, responsive, and interactive frontend built with Next.js, featuring elegant design elements like liquid glass tiles and intuitive editors.

---

## 🧱 Architecture Overview

High-level architecture:

- **Frontend**
  - Next.js
  - TypeScript
  - Zod / React Query
  - Routes: `/jobs`, `/jobs/:id`

- **Backend**
  - NestJS (TypeScript)
  - Modular architecture (DI-first)
  - Modules: `jobs`, `ai`, `latex`
  - REST API

- **Persistence**
  - MongoDB
  - Mongoose
  - Collections:
    - `JobApplication`
    - `TailoredSections`

- **AI Provider Layer**
  - Strategy pattern
  - Pluggable providers
  - No provider lock-in

- **Document Generation**
  - LaTeX template builder
  - Domain-to-template mapping
  - Deterministic output

---

## 🧠 AI Provider Abstraction

AI is intentionally isolated behind a provider interface.

```text
ILLMProvider
 ├─ OpenAIProvider
 ├─ GeminiProvider
 └─ DeepSeekProvider
```
