# Contributing to AI Chat PPT Generator

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Add your Gemini API key to `.env.local`

4. Run development server:
```bash
npm run dev
```

## Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful variable and function names
- Add comments for complex logic

## Testing

Before submitting a PR:

1. Ensure the build passes:
```bash
npm run build
```

2. Test the following workflows:
   - Create a new presentation
   - Edit an existing presentation
   - Download PPTX
   - Switch between chat sessions
   - Delete chat sessions

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include screenshots for UI changes
- Update documentation if needed
- Ensure CI/CD checks pass

## Feature Requests

Open an issue with:
- Clear description of the feature
- Use cases
- Expected behavior
- Optional: Implementation suggestions

## Bug Reports

Open an issue with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

## Questions

Feel free to open an issue for questions or join discussions.

Thank you for contributing!
