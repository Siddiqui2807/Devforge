# DevForge Phase 1 Audit and Risk Map

## Scope
- Frontend: React + Vite UI, routing, API integration points
- Backend: Django + DRF + JWT endpoints for roadmaps, recommendations, GitHub analyzer, auth

## Active Surface (Current)
- Auth: `POST /api/login/` (JWT pair + compatibility alias token)
- Roadmaps:
  - `GET /api/roadmap/`
  - `POST /api/roadmap/`
  - `GET /api/roadmaps/`
- GitHub Analyzer: `GET /api/github/analyze/?username=...`
- Recommendations: `POST /api/recommend/`

## High-Risk Findings
1. Recommendation content quality is narrow and non-deterministic.
   - File: `backend/apps/recommendations/services/recommendation_service.py`
   - Issues:
     - Only a few skills are mapped (`python`, `javascript`, `react`, `machine learning`).
     - Missing major domains (Java, Data Science, DevOps, Cloud, Mobile, etc.).
     - Uses `set()` for deduplication, which can reorder output unpredictably.
     - Contains emoji artifacts and malformed encoding characters.

2. Roadmap generation is repetitive and lacks progression depth.
   - File: `backend/apps/roadmaps/views.py`
   - Issues:
     - `_build_roadmap_content()` returns a fixed 5-step template.
     - No beginner/intermediate/advanced structure.
     - Low variance and low contextual intelligence.

3. Duplicate module patterns increase regression risk.
   - Files:
     - `backend/apps/roadmaps/views.py` and `backend/apps/roadmaps/views/`
     - `backend/apps/github_analyzer/views.py` and `backend/apps/github_analyzer/views/`
     - `frontend/src/pages/GitHubAnalyzer.jsx` and `frontend/src/components/GithubAnalyzer.jsx`
   - Issue:
     - Similar names with different implementations can cause accidental imports and behavior drift.

## Medium-Risk Findings
1. GitHub analyzer insight depth is limited.
   - File: `backend/apps/github_analyzer/services/github_service.py`
   - Issues:
     - Returns only `username`, `skills` (language names), and `repo_count`.
     - No repository quality/activity indicators (stars, forks, recency, top repos).
     - No timeout on external GitHub request.

2. Security hardening is not production-ready.
   - File: `backend/devforge/settings.py`
   - Issues:
     - `DEBUG=True`
     - `ALLOWED_HOSTS=["*"]`
     - `CORS_ALLOW_ALL_ORIGINS=True`
     - Hardcoded `SECRET_KEY`

3. Legacy UI files are inconsistent with the current shell.
   - Files:
     - `frontend/src/layouts/MainLayout.jsx`
     - `frontend/src/pages/GenerateRoadmap.jsx`
     - `frontend/src/pages/Analyzer.jsx`
     - `frontend/src/pages/Resume.jsx`
   - Issue:
     - Not primary route targets, but carry older structure and style that can reintroduce inconsistency if routed later.

## Low-Risk Findings
1. Empty app model file.
   - File: `backend/apps/users/models.py`
   - Issue:
     - Empty file is not failing now, but indicates unused app surface and maintenance overhead.

2. Mixed endpoint aliases maintained for compatibility.
   - File: `backend/apps/roadmaps/urls.py`
   - Note:
     - Helpful backward compatibility (`/roadmap/` and `/roadmaps/`), but should be documented to avoid confusion.

## Root Cause Summary
- Content generation logic is mostly static template mapping.
- Legacy and active modules coexist with overlapping names.
- Production-hardening and quality controls are incomplete.
- UI modernization progressed, but dark theme and deeper data intelligence are not yet implemented.

## Recommended Execution Order (Next Phases)
1. Recommendation engine depth and deterministic output.
2. Roadmap generation structure upgrade (Beginner -> Advanced).
3. Generate flow content quality and output shape upgrade.
4. GitHub analyzer insight expansion.
5. Global dark theme and component token alignment.

## Regression Guardrails
- Keep existing endpoint paths and payload shapes backward compatible.
- Add changes incrementally by domain (recommendations first).
- Validate with frontend build and backend checks after each phase.
- Avoid deleting legacy files until replacement paths are fully verified.
