# Job Application Form

A modern, multi-step job application form built with Next.js, React, TanStack Form, and Zod. This project demonstrates best practices for building accessible, validated forms with automatic draft persistence.

## Features

- **Multi-Step Form**: Three-step wizard (Personal Info → Experience → Account Setup)
- **Form Validation**: Schema-based validation using Zod
- **Auto-Save**: Automatic draft persistence to localStorage
- **Type Safety**: Full TypeScript support with Zod schema inference
- **Unit Tests**: Comprehensive test coverage with Vitest

## Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Form Management | @tanstack/react-form |
| Validation | Zod |
| Styling | Tailwind CSS |
| Testing | Vitest + React Testing Library |
| Environment | jsdom |

## What You Can Learn

### 1. Form State Management
- How to use TanStack Form for complex form state
- Managing form-level and field-level validation
- Handling multi-step form navigation

### 2. Schema-Based Validation
- Defining schemas with Zod for type-safe validation
- Combining multiple schemas for complex forms
- Inferring TypeScript types from Zod schemas

### 3. Draft Persistence
- Implementing auto-save functionality with localStorage
- Caching form data in memory for fast access
- Handling localStorage errors gracefully
- Clearing drafts after successful submission

### 4. Testing Best Practices
- Unit testing form logic and utilities
- Mocking external dependencies
- Testing async form submissions
- Error handling verification

## Project Structure

```
job-application/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main form page
├── components/
│   ├── StepOne.tsx         # Personal information form
│   ├── StepTwo.tsx         # Experience form
│   └── StepThree.tsx       # Account setup form
├── hooks/
│   ├── useFormStep.ts      # Custom form hook with auto-save
│   └── userFormStep.test.ts
├── lib/
│   ├── formDraftCache.ts   # Draft persistence utilities
│   ├── formDraftCache.test.ts
│   ├── schema.ts           # Zod validation schemas
│   ├── schema.test.ts
│   ├── submitApplication.ts    # Form submission logic
│   └── submitApplication.test.ts
├── vitest.config.ts        # Test configuration
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm test -- --ui

# Build for production
npm run build
```

## Form Schemas

- **Personal Info**: name, email, age
- **Experience**: jobTitle, years, skills
- **Account**: username, password

## Testing Coverage

The test suite covers:
- Draft saving and loading
- LocalStorage integration
- Form submission workflows
- Error handling
- Multi-step data aggregation
