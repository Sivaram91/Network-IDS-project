# Getting Started

_Last updated: {{ git_revision_date_localized }}_

-----

## **For Project Replicators**

Want to create your own project using this documentation style and repository structure? This section will guide you through setting up a similar professional documentation site.

### What You'll Learn

- Set up GitHub Pages for your project
- Create documentation with MkDocs Material
- Configure GitHub Actions for automatic deployment
- Organize your repository structure

-----

### Repository Structure

Here's the recommended organization for your project:

```
your-project/
├── .github/
│   └── workflows/
│       └── deploy-docs.yml       # GitHub Actions for auto-deployment
├── docs/                         # Documentation source files
│   ├── index.md                  # Homepage
│   ├── getting_started.md        # Setup guide
│   ├── architecture.md           # System design
│   ├── api/                      # API documentation
│   ├── guides/                   # User guides
│   ├── assets/                   # Images, diagrams
│   │   ├── images/
│   │   └── diagrams/
│   └── stylesheets/              # Custom CSS (optional)
│       └── extra.css
├── src/                          # Source code
│   ├── raspberry_pi/             # Pi-specific code
│   ├── stm32/                    # STM32 code
│   ├── common/                   # Shared utilities
│   └── tests/                    # Test files
├── scripts/                      # Utility scripts
├── examples/                     # Example code
├── tools/                        # Development tools
├── mkdocs.yml                    # MkDocs configuration
├── requirements.txt              # Python dependencies
├── README.md                     # GitHub repo homepage
└── .gitignore
```

-----

### Step 1: Setup MkDocs

#### Install MkDocs Material

```bash
# Install MkDocs and Material theme
pip install mkdocs-material

# Optional but recommended plugins
pip install mkdocs-git-revision-date-localized-plugin
pip install mkdocs-minify-plugin
pip install pymdown-extensions
```

#### Create mkdocs.yml Configuration

Create `mkdocs.yml` in your project root:

```yaml
site_name: Your Project Name
site_url: https://yourusername.github.io/your-repo-name/
site_description: Brief description of your project
site_author: Your Name

repo_name: yourusername/your-repo-name
repo_url: https://github.com/yourusername/your-repo-name

theme:
  name: material
  palette:
    # Light mode
    - scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    # Dark mode
    - scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.suggest
    - search.highlight
    - content.code.copy
    - content.code.annotate

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - admonition
  - pymdownx.details
  - attr_list
  - md_in_html
  - tables
  - footnotes

plugins:
  - search
  - git-revision-date-localized:
      enable_creation_date: true
  - minify:
      minify_html: true

nav:
  - Home: index.md
  - Getting Started: getting_started.md
  - Architecture: architecture.md
  - API Reference:
      - Overview: api/overview.md
  - Guides:
      - User Guide: guides/user_guide.md

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/yourusername
    - icon: fontawesome/brands/linkedin
      link: https://linkedin.com/in/yourprofile
```

#### Test Locally

```bash
# Serve documentation locally
mkdocs serve

# Open browser to http://127.0.0.1:8000
```

-----

### Step 2: Setup GitHub Pages

#### Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions** (recommended)
   - Or Source: **Deploy from a branch** → select `gh-pages` `/ (root)` 

#### Create Initial Documentation

```bash
# Create docs folder
mkdir docs
cd docs

# Create homepage
cat > index.md << 'EOF'
# Welcome to Your Project

## Overview
Brief description of your project.

## Quick Links
- [Getting Started](getting_started.md)
- [Documentation](guides/user_guide.md)
- [GitHub Repository](https://github.com/yourusername/your-repo-name)
EOF
```

-----

### Step 3: Setup GitHub Actions for Auto-Deployment

#### Create Workflow File

Create `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches:
      - main  # or master, depending on your default branch
  workflow_dispatch:  # Allows manual trigger

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Fetch all history for git-revision-date

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.x

      - name: Install dependencies
        run: |
          pip install mkdocs-material
          pip install mkdocs-git-revision-date-localized-plugin
          pip install mkdocs-minify-plugin

      - name: Build and deploy documentation
        run: mkdocs gh-deploy --force
```

#### Alternative: Simpler Workflow

If you don't need git-revision dates:

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: pip install mkdocs-material
      - run: mkdocs gh-deploy --force
```

#### Commit and Push

```bash
git add .github/workflows/deploy-docs.yml
git commit -m "Add GitHub Actions workflow for documentation"
git push origin main
```

Your documentation will automatically deploy to:
`https://yourusername.github.io/your-repo-name/`

-----

### Step 4: Customize Your Documentation

#### Add Custom Styling (Optional)

Create `docs/stylesheets/extra.css`:

```css
/* Custom color schemes, fonts, spacing */
:root {
  --md-primary-fg-color: #2196F3;
}

.md-typeset h1 {
  color: #1565C0;
}
```

Reference in `mkdocs.yml`:

```yaml
extra_css:
  - stylesheets/extra.css
```

#### Add Diagrams and Images

```bash
# Create assets folder
mkdir -p docs/assets/images
mkdir -p docs/assets/diagrams

# Add images in markdown
![Architecture Diagram](assets/diagrams/architecture.png)
```

#### Use Admonitions for Callouts

```markdown
!!! note "Important Note"
    This is a highlighted note box.

!!! warning
    Be careful with this step!

!!! tip "Pro Tip"
    This makes things easier!
```

-----

### Step 5: Best Practices

#### Documentation Writing Tips

- **Keep it simple:** Write for beginners
- **Use examples:** Code snippets and screenshots
- **Update regularly:** Keep docs in sync with code
- **Test instructions:** Have someone else follow your guide
- **Add search keywords:** Use descriptive headings

#### Repository Organization Tips

- **Separate concerns:** Docs, source code, tests in different folders
- **Use .gitignore:** Don't commit build artifacts or virtual environments
- **README.md:** Point to full documentation site
- **CONTRIBUTING.md:** Guidelines for contributors
- **LICENSE:** Choose appropriate license

#### Automated Deployment Tips

- **Test locally first:** Always run `mkdocs build` before pushing
- **Check Actions tab:** Monitor deployment status on GitHub
- **Custom domains:** You can configure a custom domain in GitHub Pages settings
- **Branch protection:** Consider protecting `main` branch to prevent accidental docs breaks

-----

### Quick Start Checklist

- [ ] Install MkDocs Material: `pip install mkdocs-material`
- [ ] Create `mkdocs.yml` configuration file
- [ ] Create `docs/` folder with `index.md`
- [ ] Test locally: `mkdocs serve`
- [ ] Create `.github/workflows/deploy-docs.yml`
- [ ] Enable GitHub Pages in repository settings
- [ ] Push to GitHub and verify deployment
- [ ] Customize theme and navigation
- [ ] Add your project content
- [ ] Share your documentation URL!

-----

### Example Projects Using MkDocs Material

Study these for inspiration:

- **Material for MkDocs:** [squidfunk.github.io/mkdocs-material](https://squidfunk.github.io/mkdocs-material/)
- **FastAPI:** [fastapi.tiangolo.com](https://fastapi.tiangolo.com/)
- **Pydantic:** [docs.pydantic.dev](https://docs.pydantic.dev/)

-----

### Troubleshooting Documentation Deployment

#### Build Fails on GitHub Actions

**Check:**
- All dependencies listed in workflow file
- `mkdocs.yml` syntax is correct
- All referenced files exist in `docs/` folder

```bash
# Test build locally
mkdocs build --strict
```

#### Documentation Not Updating

**Try:**
- Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
- Check Actions tab for deployment status
- Verify GitHub Pages source is set to `gh-pages` branch or GitHub Actions

#### Images Not Showing

**Ensure:**
- Images are in `docs/assets/` folder
- Relative paths are correct: `![Alt text](assets/images/pic.png)`
- Files are committed and pushed to repository

-----

### Additional Resources

**MkDocs Documentation:**
- [MkDocs Official Docs](https://www.mkdocs.org/)
- [Material Theme Docs](https://squidfunk.github.io/mkdocs-material/)
- [Markdown Extensions](https://squidfunk.github.io/mkdocs-material/reference/)

**GitHub Actions:**
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

**Markdown Guides:**
- [Basic Markdown Syntax](https://www.markdownguide.org/basic-syntax/)
- [Extended Markdown Syntax](https://www.markdownguide.org/extended-syntax/)

-----

