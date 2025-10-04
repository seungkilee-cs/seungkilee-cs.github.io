# 개인 웹사이트 – 이승기

## 개요
이 저장소는 [seungkilee-cs.github.io](https://seungkilee-cs.github.io/)에서 서비스되는 개인 사이트의 소스입니다. Vite와 React로 구현된 단일 페이지 애플리케이션이며, 소개 페이지, 프로젝트, 연락처, 다국어 블로그를 제공합니다.

### 기술 스택
- **프레임워크**: React 19, React Router 7
- **빌드 도구**: Vite 7, TypeScript 5.8, ESLint 9
- **스타일링**: 컴포넌트 단위의 CSS Modules
- **콘텐츠**: `import.meta.glob`과 `front-matter`를 활용해 빌드 시점에 파싱되는 Markdown

## 시작하기
- **필수 조건**: Node.js 20 이상(네이티브 `fetch` 지원), npm 10 이상
- **의존성 설치**:
  ```bash
  npm install
  ```
- **개발 서버 실행**:
  ```bash
  npm run dev
  ```
  기본적으로 `http://localhost:5173`에서 핫 리로드와 함께 동작합니다.

## npm 스크립트
- **dev**: Vite 개발 서버 실행
- **build**: `tsc -b` 후 `vite build`를 실행해 `dist/`에 배포용 산출물을 생성
- **preview**: 생산 빌드를 로컬에서 확인
- **lint**: ESLint 전역 실행
- **deploy**: `gh-pages` CLI를 통해 `dist/`를 `gh-pages` 브랜치로 배포 (`predeploy`에서 자동 빌드)
- **new-post**: `scripts/new-post.sh`을 호출해 블로그 포스트 골격 생성

## 배포
- **기본 흐름**: `npm run deploy`가 최신 빌드를 생성하고 `gh-pages` 브랜치에 푸시합니다.
- **쉘 스크립트**:
  - **`git-deploy.sh`**: 기본 브랜치(`master`)가 정리되어 있는지 확인하고 임시 worktree를 이용해 배포합니다.
  - **`git-branch-deploy.sh`**: 기능 브랜치를 분리 경로로 배포할 때 사용합니다.

## 블로그 작성 워크플로우
블로그 글은 `content/blog/` 폴더에 저장되며 `src/lib/loadPosts.ts`가 파싱합니다.

### 새 글 생성
1. `npm run new-post -- -t "제목"` 명령을 실행합니다. (`--` 뒤 플래그는 스크립트로 전달)
2. 선택 플래그
   - `--language` (예: `en`, `ko`)
   - `--draft` (미공개 상태 유지)
   - `--interactive` (질문 기반 입력)
3. 스크립트가 Front Matter가 포함된 Markdown 파일을 생성합니다. `draft: true`인 글은 기본 목록에서 제외됩니다.

### Front Matter 예시
```yaml
---
title: "예시 글"
slug: "example-post-ko"
date: "2025-01-01"
language: "ko"
description: "목록에 보여줄 짧은 설명"
tags: ["react", "note"]
categories: ["engineering"]
baseSlug: "example-post"
draft: true
---
```
- **`slug`**은 언어별로 고유해야 하며 스크립트가 기본적으로 언어 코드를 붙입니다.
- **`baseSlug`**는 번역 글을 연결하며 `src/lib/loadPosts.ts`의 `getPostTranslations()`에서 사용됩니다.

## GitHub 활동 & 기여도 데이터
- **최근 커밋**: `src/pages/About/About.tsx`에서 `src/services/github.ts`의 `fetchRecentCommits()`를 호출합니다. 레이트 리밋이 빈번하면 개인 액세스 토큰 사용을 고려하세요.
- **기여도 히트맵**: 다음 명령으로 `src/content/contrib.json`을 갱신합니다.
  ```bash
  node scripts/fetch-contrib.mjs seungkilee-cs
  ```
  필요시 GitHub 사용자명을 변경하세요.

## 주요 디렉터리
- **`src/components/Nav/`**: 상단 내비게이션(모바일 개선 예정)
- **`src/pages/Blog/`**: 블로그 목록 및 본문, 번역 링크 처리
- **`src/services/github.ts`**: GitHub API 연동
- **`scripts/`**: 블로그 스캐폴딩 및 기여도 동기화 스크립트
- **`docs/`**: 내부 문서 및 개선 백로그 (`docs/todo/repo-improvements.md`)

## 다국어 참고 사항
- 최상단 `README.md`에서 언어별 문서를 안내합니다.
- 블로그 번역은 `baseSlug`와 언어별 slug 조합으로 관리합니다.

## 로드맵 메모
- **문서화**: 필요한 경우 구조도나 화면 캡처를 추가해 README를 확장합니다.
- **테스트 & CI**: Vitest 및 GitHub Actions 도입 계획은 `docs/todo/repo-improvements.md`를 참고하세요.
