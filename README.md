# AI Tutor

High-performance, minimalist learning platform powered by Gemini 3.1 Flash.

## 🚀 Setup
1. **Dependencies**: `npm install`
2. **Environment**: Add free `GEMINI_API_KEY` to `.env.local` from here -> https://aistudio.google.com/api-keys
3. **Run**: `npm run dev`

## 🧠 Technical Approach

### 1. The Dual-Pass Pipeline
The core engine uses a sequential two-pass generation strategy.
- **Step 1**: The primary LLM pass generates structured academic content (Summary, Key Points, Quiz).
- **Step 2**: A secondary "Paraphrasing" pass re-processes the summary to match the exact grade level.
- **Why**: LLMs struggle with simultaneous complex content generation and tone-shifting. Splitting these tasks significantly improves age-appropriate accuracy.

### 2. Resilient Data Processing
We treat AI output as untrusted and potentially malformed.
- **The Workflow**: Raw string -> Markdown stripping -> Regex extraction -> Zod validation.
- **Why**: Models frequently wrap JSON in markdown or add conversational filler. Our custom processing layer (`lib/processing.ts`) recovers the data structure without crashing the UI.

### 3. Smart Client-Side Persistence
History is managed as a first-class citizen in the generation flow.
- **The Workflow**: Successful results are cached in `localStorage` before being displayed.
- **Why**: This enables instant retrieval of recent topics. It reduces redundant API costs and provides a seamless "no-loading" experience for revisited content.

## 📝 Technical Assumptions
- **Zod/JSON**: System expects a recoverable JSON block from LLM.
- **API Performance**: UI optimized for Gemini 3.1 Flash response windows.
- **React State**: No external store (Redux/Zustand) needed for this scope.

---
*Internship Assignment Submission*
