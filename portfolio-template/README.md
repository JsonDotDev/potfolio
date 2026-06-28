# Portfolio

A personal portfolio site built with React, TypeScript, and Vite. Styled
around an engineering/control-systems theme — block diagrams, register
maps, and a settling step-response animation in the hero.

## Editing your content

Almost everything you'll want to change lives in **one file**:

```
src/data/content.ts
```

That includes your name, role, tagline, email, GitHub/LinkedIn links,
resume link, every project (title, description, tech stack, bullet
points), your skills list, and your experience timeline. Edit the values
there and the whole site updates — no need to touch any component code.

### Adding your resume

Drop your resume PDF into the `public/` folder and name it `resume.pdf`
(or update `resumeUrl` in `content.ts` to match whatever filename you use).
You can then delete `public/RESUME_README.txt`.

### Swapping in real project images

Each project currently shows a schematic-style placeholder diagram
(`src/components/ProjectDiagram.tsx`). To use a real screenshot instead:

1. Add your image to `src/assets/` (e.g. `src/assets/hydraulic-tool.png`)
2. In `src/components/ProjectCard.tsx`, replace `<ProjectDiagram kind={project.diagram} />`
   with `<img src={yourImportedImage} alt={project.title} />` for that card,
   or extend the `Project` type in `content.ts` with an optional `image` field
   and conditionally render it.

### Linking out to a project's code or demo

Each project in `content.ts` supports an optional `links` array, e.g.:

```ts
links: [{ label: 'GitHub', href: 'https://github.com/you/repo' }],
```

If present, these render as small links at the bottom of that project's
card. Leave the field out entirely if there's nothing to link to.

## Running locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`) with
hot-reload — edits to any file show up instantly in the browser.

To check your work compiles cleanly before pushing:

```bash
npm run build
```

This outputs a production build to `dist/`. If this command succeeds with
no errors, your site is ready to deploy.

## Putting it on GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial portfolio"
```

Then create a new repository on [github.com/new](https://github.com/new)
(don't initialize it with a README, since you already have one), and
follow GitHub's instructions to push an existing repo, which will look
like:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## Deploying on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New → Project**.
3. Select the GitHub repository you just pushed.
4. Vercel auto-detects this as a Vite project — the defaults
   (Build Command: `npm run build`, Output Directory: `dist`) are already
   correct, so you can just click **Deploy**.
5. After a minute or two, you'll get a live URL like
   `your-portfolio.vercel.app`.

Every time you `git push` to `main` after this, Vercel automatically
rebuilds and redeploys your site — no extra steps needed.

### Custom domain (optional)

If you buy a domain later, you can attach it in the Vercel dashboard under
**Project → Settings → Domains**.

## Project structure

```
src/
  data/content.ts       ← all your editable text content
  components/           ← page sections (Hero, Projects, Experience, etc.)
  index.css             ← global design tokens (colors, fonts, spacing)
public/                 ← static files served as-is (favicon, resume.pdf)
```

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev) for build tooling
- No UI framework dependency — plain CSS using design tokens (CSS variables)
- Self-hosted fonts via [Fontsource](https://fontsource.org/) (JetBrains Mono + Inter)
