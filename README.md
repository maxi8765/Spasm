# SPASM

Web rebuild of the SPASM app (David Hocking's Name Theory): name meanings, romantic and sexual compatibility, best bub names, and kiss / marry / avoid.

Cloudflare Worker serving the static app in `public/` (no build step). `src/worker.js` handles the submit-name API.

## Data

The source of truth is the master workbook (`Spasm June 2019.xlsm`, kept in OneDrive under Old Customers/Spasm/spreadsheets). The matching rules in `public/js/engine.js` are ported from its formulas.

To update the data after editing the workbook:

    XLSM="/path/to/Spasm June 2019.xlsm" npm run data
    npm test

`npm run export-csv` writes all names to `exports/spasm_names.csv`.

## Local

    npm run dev      # wrangler dev

## Deploy

Cloudflare Workers Builds, connected to this repo. Deploy command: `npx wrangler deploy` (reads `wrangler.toml`). Every push to main redeploys.

"Submit a name" needs a KV namespace bound as `NAME_SUBMISSIONS` (add it to `wrangler.toml`). Without it the form shows an error and nothing is stored.
