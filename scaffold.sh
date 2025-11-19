#!/usr/bin/env bash
set -e

ROOT=cv-cover-tailor

# --- Directories ---

mkdir -p $ROOT/apps/frontend/app/jobs/[id]/latex
mkdir -p $ROOT/apps/frontend/components/{layouts,jobs,ui}
mkdir -p $ROOT/apps/frontend/lib/validation
mkdir -p $ROOT/apps/frontend/{hooks,styles}
mkdir -p $ROOT/apps/backend/src/{config,common,jobs/domain,jobs/dto,ai/providers,latex,shared}
mkdir -p $ROOT/infra/env

# --- Frontend files ---

touch \
  $ROOT/apps/frontend/app/layout.tsx \
  $ROOT/apps/frontend/app/page.tsx \
  $ROOT/apps/frontend/app/jobs/page.tsx \
  $ROOT/apps/frontend/app/jobs/[id]/page.tsx \
  $ROOT/apps/frontend/app/jobs/[id]/latex/page.tsx \
  $ROOT/apps/frontend/lib/apiClient.ts \
  $ROOT/apps/frontend/lib/queryClient.ts \
  $ROOT/apps/frontend/tailwind.config.ts

# Optional: create placeholder index files for components/hooks/lib/styles
touch \
  $ROOT/apps/frontend/components/layouts/.gitkeep \
  $ROOT/apps/frontend/components/jobs/.gitkeep \
  $ROOT/apps/frontend/components/ui/.gitkeep \
  $ROOT/apps/frontend/hooks/.gitkeep \
  $ROOT/apps/frontend/styles/.gitkeep \
  $ROOT/apps/frontend/lib/validation/.gitkeep

# --- Backend files ---

touch \
  $ROOT/apps/backend/src/main.ts \
  $ROOT/apps/backend/src/app.module.ts \
  $ROOT/apps/backend/src/config/configuration.ts \
  $ROOT/apps/backend/src/common/api-response.ts \
  $ROOT/apps/backend/src/common/base.repository.ts \
  $ROOT/apps/backend/src/jobs/jobs.module.ts \
  $ROOT/apps/backend/src/jobs/jobs.controller.ts \
  $ROOT/apps/backend/src/jobs/jobs.service.ts \
  $ROOT/apps/backend/src/jobs/domain/job-application.schema.ts \
  $ROOT/apps/backend/src/jobs/domain/job-application.types.ts \
  $ROOT/apps/backend/src/jobs/dto/create-job-application.dto.ts \
  $ROOT/apps/backend/src/jobs/dto/update-job-application.dto.ts \
  $ROOT/apps/backend/src/jobs/dto/update-tailored-sections.dto.ts \
  $ROOT/apps/backend/src/ai/ai.module.ts \
  $ROOT/apps/backend/src/ai/ai.service.ts \
  $ROOT/apps/backend/src/ai/llm-provider.interface.ts \
  $ROOT/apps/backend/src/ai/providers/openai.provider.ts \
  $ROOT/apps/backend/src/ai/providers/gemini.provider.ts \
  $ROOT/apps/backend/src/latex/latex.module.ts \
  $ROOT/apps/backend/src/latex/latex-template.service.ts \
  $ROOT/apps/backend/src/shared/mongo.module.ts \
  $ROOT/apps/backend/Dockerfile \
  $ROOT/apps/backend/tsconfig.json

# --- Infra files ---

touch \
  $ROOT/infra/docker-compose.yml \
  $ROOT/infra/env/backend.example.env \
  $ROOT/infra/env/frontend.example.env

# --- Root files ---

touch \
  $ROOT/package.json \
  $ROOT/README.md

echo "Scaffold created under $ROOT/"
