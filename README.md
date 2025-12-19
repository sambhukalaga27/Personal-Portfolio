# Modern Angular Portfolio

A high-performance, production-grade portfolio website built with Angular 18+ (Standalone Components, Signals), SCSS, and a Node.js content ingestion pipeline.

## Features

- **Modern Tech Stack**: Angular (Standalone), Signals, RxJS, TypeScript.
- **Premium Design**: Dark-themed, neon accents, glassmorphism, noise textures.
- **Content Pipeline**: Parses resume/CV (text/PDF) into structured JSON.
- **Performance**: Lazy loading, optimized assets, minimal dependencies.
- **Responsive**: Mobile-first design, works on all devices.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Sync Content**:
    Place your resume in `content_sources/resume.txt` (or configure the script for PDF).
    Run the sync script to generate `src/assets/content/profile.json`:
    ```bash
    npm run sync:content
    ```

3.  **Run Development Server**:
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200/`.

## Deployment

### GitHub Pages

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Deploy the `dist/profile-portfolio` folder.

### Vercel / Netlify

1.  Connect your repository.
2.  Set build command: `npm run build`.
3.  Set output directory: `dist/profile-portfolio/browser`.

## Customization

- **Content**: Edit `content_sources/resume.txt` and run `npm run sync:content`.
- **Theme**: Edit `src/styles.scss` variables.
- **Images**: Place images in `src/assets/images`.

## Project Structure

- `src/app/core`: Services and models.
- `src/app/shared`: Reusable UI components.
- `src/app/sections`: Page sections (Hero, About, etc.).
- `tools`: Content synchronization scripts.


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
