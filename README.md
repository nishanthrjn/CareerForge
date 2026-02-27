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

---

## 🚀 Getting Started

You can run CareerForge either using **Docker** (recommended) or **Manually** via Node.js.

### Prerequisites
- Node.js (v18 or v20+)
- npm
- Docker and Docker Compose (If using Docker setup)
- MongoDB (If running manually)

### Option 1: Run with Docker Compose (Recommended)

This approach spins up the MongoDB database, the Next.js Frontend, and the NestJS Backend in isolated containers.

1. Navigate to the `infra` directory:
   ```bash
   cd infra
   ```
2. Start the services using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

**Services will be accessible at:**
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:4000`
- **MongoDB**: `localhost:27017`

> *Note: By default, the `docker-compose.yml` uses the example `.env` files located in the `infra/env/` folder.*

### Option 2: Run Manually (Local Dev)

**1. Install Dependencies**
At the root of the project, run:
```bash
npm install
```

**2. Start MongoDB**
Ensure you have a MongoDB instance running locally on `mongodb://localhost:27017` or prepare your MongoDB URI. Create the appropriate `.env` files for the frontend and backend if necessary based on `infra/env/` examples.

**3. Start the Backend API (NestJS)**
```bash
cd apps/backend
npm run start:dev
```
*Runs on `http://localhost:4000`.*

**4. Start the Frontend App (Next.js)**
In a new terminal window:
```bash
cd apps/frontend
npm run dev
```
*Runs on `http://localhost:3000`.*

