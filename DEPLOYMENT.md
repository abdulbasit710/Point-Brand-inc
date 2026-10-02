# Point Brand Inc — handoff

## GitHub source

Upload this folder's contents to your own GitHub repository. It includes the full source, original logo artwork, optimized public assets, and dependency lockfile. Dependencies and generated build output are deliberately excluded.

To run a fresh checkout, install Node.js (compatible with Vite 8), then:

```sh
npm ci
npm run dev
```

To generate the deployable website:

```sh
npm run build
```

## Namecheap Stellar

Upload the CONTENTS of the generated dist folder to the domain's document root (usually public_html for the primary domain). Back up any existing website first. Include the hidden .htaccess file; it makes page refreshes and direct links such as /services work. Do not upload node_modules or the source folder to public_html.

The separate namecheap-upload ZIP contains this production output already built. Extract its contents directly into the correct document root. Enable HTTPS through your hosting control panel and test Home, /services, /work, /about, and /contact after upload.

Pushing to GitHub alone does not publish to Namecheap. After future source changes, build again and upload the updated dist contents.

## Before public launch

- The contact form currently simulates success; connect a real submission endpoint before accepting enquiries.
- Replace placeholder contact details, project claims, testimonials, statistics and stock imagery with approved content.
- Logo images are public/logo.png and public/logo-mark.png; 3D contours are src/data/logo-contours.json.
- Review content in src/data/content.js.
- Original PNG and pbiiii.svg are retained as source artwork, not shipped in the public build.
- Never commit passwords, hosting credentials, API secrets, or .env files.

Vercel and Netlify routing files are also included if you choose a different host later.
