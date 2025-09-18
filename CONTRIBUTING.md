# Contributing to Punctual.AI

Thank you for your interest in contributing to Punctual.AI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- A Supabase account (free tier is fine)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/punctual-ai.git`
3. Install dependencies: `npm install`
4. Run setup: `npm run setup`
5. Start development: `npm run dev`

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Testing
- Write tests for new features
- Ensure all tests pass: `npm run test`
- Test API endpoints: `npm run test:api`

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Run linting: `npm run lint:fix`
5. Run type checking: `npm run type-check`
6. Submit a pull request

## 🏗️ Project Structure

```
punctual-ai/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── scripts/              # Setup and utility scripts
├── supabase/             # Database schema and migrations
└── styles/               # CSS and design tokens
```

## 🐛 Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

## 💡 Feature Requests

For feature requests, please:
- Check existing issues first
- Provide a clear description
- Explain the use case
- Consider implementation complexity

## 📝 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update API documentation for new endpoints

## 🔒 Security

- Report security issues privately to security@punctual-ai.com
- Do not open public issues for security vulnerabilities

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

Thank you for contributing to Punctual.AI! 🎉
