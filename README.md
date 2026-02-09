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
