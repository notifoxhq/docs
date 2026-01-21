# Contributing to Notifox Documentation

Thank you for your interest in contributing to the Notifox documentation! We welcome contributions from the community and are grateful for your help in making our docs better.

## Ways to Contribute

There are many ways you can contribute:

- **Fix typos or improve clarity** - Found a typo or unclear explanation? Fix it!
- **Add missing information** - Help fill in gaps in the documentation
- **Improve examples** - Make code examples clearer or more comprehensive
- **Add new guides** - Share your knowledge with the community
- **Report issues** - Found a broken link or incorrect information? Let us know!

## Quick Start

The easiest way to contribute is using the **"Edit this page"** button at the bottom of any documentation page. This will:

1. Take you directly to the file on GitHub
2. Let you make your changes
3. Guide you through creating a pull request

## Development Setup

If you want to make more substantial changes or test locally, follow these steps:

### Prerequisites

- Node.js >= 20.0
- npm

### Installation

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/docs.git
   cd docs
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Local Development

Start the development server:

```bash
npm start
```

This will:
- Start a local development server (usually at `http://localhost:3000`)
- Open your browser automatically
- Watch for file changes and hot-reload the page

### Building

To build the documentation for production:

```bash
npm run build
```

To test the production build locally:

```bash
npm run serve
```

## Making Changes

### Project Structure

```
docs/
├── docs/              # Documentation pages (Markdown/MDX)
│   ├── getting-started/
│   ├── languages/
│   └── reference/
├── blog/              # Blog posts
├── src/               # React components and custom CSS
├── static/            # Static assets (images, etc.)
└── sidebars.js        # Sidebar navigation configuration
```

### Documentation Guidelines

1. **Use clear, concise language** - Write for developers of all experience levels
2. **Include code examples** - Show, don't just tell
3. **Add images when helpful** - Screenshots and diagrams can clarify complex concepts
4. **Keep it up to date** - Ensure examples work with the latest API
5. **Follow the existing style** - Match the tone and format of existing docs

### Markdown Tips

- Use proper heading hierarchy (h1 → h2 → h3)
- Add code blocks with syntax highlighting:
  ` ```language
  code here
  ``` `
- Use relative links for internal documentation
- Add alt text for images

### Adding Images

Place images in the appropriate directory:
- Documentation images: `docs/getting-started/images/` (or similar)
- Blog images: `blog/assets/` or `static/img/`

Reference them in Markdown:
```markdown
![Image description](./images/example.png)
```

## Pull Request Process

1. **Create a branch** for your changes:
   ```bash
   git checkout -b fix/typo-in-intro
   ```

2. **Make your changes** and test them locally

3. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Fix typo in getting started guide"
   ```

4. **Push to your fork**:
   ```bash
   git push origin fix/typo-in-intro
   ```

5. **Open a Pull Request** on GitHub

### PR Guidelines

- **Keep PRs focused** - One issue or feature per PR
- **Write clear descriptions** - Explain what and why
- **Reference issues** - Link to related issues if applicable
- **Wait for CI checks** - All checks must pass before merging

### Automated Checks

When you open a PR, our CI will automatically:

- ✅ Build the documentation to ensure it compiles
- ✅ Check for broken links
- ✅ Verify the build output is valid

All checks must pass before your PR can be merged.

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to help make the documentation better.

## Questions?

- Open an issue on GitHub
- Join our [Discord](https://discord.gg/ZSp5SzxJBF)
- Check out our [GitHub Discussions](https://github.com/notifoxhq/docs/discussions)

## Thank You!

Your contributions help make Notifox documentation better for everyone. We appreciate your time and effort! 🎉
