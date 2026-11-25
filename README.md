# SPASM

Web rebuild of the SPASM app (David Hocking's Name Theory): name meanings, romantic and sexual compatibility, best bub names, and kiss / marry / avoid.

Static site on Cloudflare Pages. No build step; everything is in `public/`.

## Data

The source of truth is the master workbook (`Spasm June 2019.xlsm`, kept in OneDrive under Old Customers/Spasm/spreadsheets). The matching rules in `public/js/engine.js` are ported from its formulas.

To update the data after editing the workbook:

    XLSM="/path/to/Spasm June 2019.xlsm" npm run data
    npm test

`npm run export-csv` writes all names to `exports/spasm_names.csv`.

## Local

    npm run dev      # wrangler pages dev, includes the submit-name function

## Deploy

Cloudflare Pages project connected to this repo: framework preset None, build command empty, output directory `public`.

"Submit a name" needs a KV namespace bound as `NAME_SUBMISSIONS` (Pages project > Settings > Bindings). Without it the form shows an error and nothing is stored.
