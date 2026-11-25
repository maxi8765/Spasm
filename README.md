# SPASM

Web rebuild of the SPASM app (David Hocking's Name Theory): name meanings, romantic and sexual compatibility, best bub names, and kiss / marry / avoid.

Cloudflare Worker serving the static app in `public/` (no build step). `src/worker.js` handles the submit-name API.

## Data

The source of truth is the master workbook (`Spasm June 2019.xlsm`, kept in OneDrive under Old Customers/Spasm/spreadsheets). The matching rules in `public/js/engine.js` are ported from its formulas.

To update the data after editing the workbook:

    XLSM="/path/to/Spasm June 2019.xlsm" npm run data
    npm test

Then bump `DATA_VERSION` in `public/js/app.js` so phones fetch the new data.

`npm run export-csv` writes all names to `exports/spasm_names.csv`.

## Releasing

Run `python3 scripts/bump_version.py` before every push. Installed copies check `version.json` when opened or brought to the front, show an "updated, tap to refresh" bar, and refresh themselves when backgrounded. Nobody has to reinstall.

## Local

    npm run dev      # wrangler dev

## Deploy

Cloudflare Workers Builds, connected to this repo. Deploy command: `npx wrangler deploy` (reads `wrangler.toml`). Every push to main redeploys.

"Submit a name" needs a KV namespace bound as `NAME_SUBMISSIONS` (add it to `wrangler.toml`). Without it the form shows an error and nothing is stored.

## Storage (optional)

Bind a KV namespace as `NAME_SUBMISSIONS` to store name submissions (`<date>:<gender>:<name>`) and missed searches (`miss:<gender>:<name>` with a count). Without it, submissions open a pre-filled email to David and misses are not recorded.

## Google Play

The site is an installable PWA, so it can be listed on Google Play as a Trusted Web Activity:

1. Go to pwabuilder.com, enter the live URL, and choose Package for stores > Android. Use package ID `pro.spasm.app` (or similar) and keep the signing key it generates somewhere safe.
2. Copy the `assetlinks.json` PWABuilder produces into `public/.well-known/assetlinks.json` and push, so the app opens without a browser bar.
3. Upload the `.aab` in Google Play Console (one-off US$25 developer fee). Store screenshots are in `public/img/screen-1.png` to `screen-4.png`, the icon is `public/img/icon-512.png`.

## Credits

Nickname links from github.com/carltonnorthern/nicknames (Apache License 2.0), filtered to names in SPASM. Comfortaa font (SIL Open Font License).

Tattoo lettering fonts (public/fonts/tattoo): UnifrakturMaguntia, Pirata One, Grenze Gotisch, Great Vibes, Monsieur La Doulaise, Alex Brush, Pinyon Script, Kaushan Script (SIL Open Font License) and Special Elite (Apache License 2.0), via Fontsource.
