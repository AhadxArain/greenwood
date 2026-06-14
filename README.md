# Greenwood General Contracting Website

A static website for Greenwood General Contracting, built with HTML, CSS, and vanilla JavaScript.

## Run Locally

No dependencies or installation steps are required.

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and select **Open with Live Server**.

Alternatively, run a local server from the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Opening `index.html` directly with a `file://` URL will not work because the site loads section files with `fetch()`.

## Structure

```text
index.html       Page shell, metadata, and section mount points
styles/          Shared site styles
scripts/         Shared site behavior and section loader
sections/        Section-specific HTML, CSS, and JavaScript
favicon.svg      Browser icon
opengraph.jpg    Social sharing image
robots.txt       Search crawler rules
```

## Before Going Live

- Replace demonstration Unsplash images with licensed project photography.
- Connect the estimate request form to a form handler or backend.
- Verify the Google Maps embed.
- Remove the `noindex, nofollow` metadata after approval.
