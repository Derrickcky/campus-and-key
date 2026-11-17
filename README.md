# Campus & Key — College-town home sales

A responsive real estate research dashboard for comparing completed home sales across college towns. Built with plain HTML, CSS, and JavaScript, with no framework, package installation, external fonts, analytics, or API keys.

## Review the website

The agent has started a local preview at http://127.0.0.1:8765/. This is available only on this computer while the preview server runs; it is not a public deployment.

You can also open `index.html` directly in a browser: the prepared summaries are loaded from a local JavaScript file, so no server or tools are required. Keep `index.html` beside its `assets/`, `docs/`, and `data/` folders.

Try the city dropdown, clickable chart bars, price/alphabetical sort, city names in the table, Reset view, and Download summary. The chart and table always compare all cities; choosing a city updates the cards, findings, quality notes and date range and highlights the matching city. The download contains all cities in the current sort order. Resize the window to review the mobile layout; the table scrolls horizontally when necessary.

## Findings verified against the dataset

- 35,442 completed-sale rows, across 18 cities, 11 states, and 11 nearest-campus areas.
- $410,000 pooled median sale price, using 35,438 qualifying prices.
- 11 days median listing-to-contract time, using 28,042 valid date pairs.
- Davis, CA has the highest city median ($889,000); Urbana, IL has the lowest ($229,900), a $659,100 gap.
- Recorded closing dates range from March 27, 2023 to March 25, 2026. Six missing closing dates are retained in sale and price counts.

## Data notes and definitions

The five original `data/college_town_home_sales.*` files are unchanged. `scripts/build_data.py` reads the CSV as strings (preserving ZIP, FIPS and parcel identifiers), computes summaries and writes a new file, `assets/data.js`. The browser renders that generated file, so it does not download the large raw CSV on every visit. If the dataset or calculation rules change, the agent must regenerate this file; it is a fixed snapshot, not a live feed.

Total sales counts every row. `listing_id` must be unique; the build stops if duplicates appear. Repeated addresses are never deduplicated.

Price analysis uses finite numeric prices >= $1,000, excluding four rows from medians but not sale counts. The 31 prices > $5 million are retained and disclosed, with no upper cap. This rule matches the description sheet's city medians. A median is the middle sorted price, or the mean of the two middle values for an even sample. The pooled median uses individual sales, not an average of city medians. Dollar figures are displayed rounded to the nearest dollar; day medians retain fractional values.

Days on market is contract date minus list date in calendar days, requiring two valid ISO dates and a nonnegative interval. Zero-day intervals are retained. Missing dates are not zero. Timing has its own sample size and is independent of the price filter. Missingness is not random: off-market and new-construction sales are less represented, so timing comparisons can be biased. No values are imputed.

Cities are grouped by city and state. Campus coverage counts distinct nearest-campus assignments from the coordinates, not city labels. No distance analysis is presented. Avoid interpreting sample differences as causal effects or citywide population estimates; comparisons do not control for home size, age, or neighborhood, and sample sizes vary.

`home_type` is unreliable and is not analyzed. Zero/missing living areas, extreme lot sizes, bathroom counts, tax amounts, and assessed values are not used in metrics. Assessed value is not sale price. The site documents all five warning areas from the original description sheet.

## Validation

`scripts/verify_data.py` opens the supplied SQLite file read-only and independently checks every summary for the overall dataset and all 18 city groups: counts, median price, eligible price sample, exclusion count, median timing, timing sample, high-price count, missing closing dates, date bounds, campus and state coverage. It checks five SHA-256 hashes from the original download. All checks passed.

JavaScript syntax passed Node's syntax check. Browser checks passed for initial cards, 18 chart bars, city selection (Champaign), bar selection (Davis), ascending sort, reset, CSV export, and no console warnings/errors. Layouts were inspected at 1280px and 390px; neither produced page-level horizontal overflow. Mobile tables intentionally scroll within their container. Full source/raw-data links are relative and compatible with repository-subpath hosting.

## Future GitHub Pages setup — not deployed

You do not need to perform these steps until you have created your GitHub account and are ready to publish.

1. Sign in to GitHub and open the professor's starter repository. Choose **Use this template → Create a new repository** if available; otherwise fork it. Use a public repository for straightforward free GitHub Pages hosting.
2. Upload the completed project's contents to the repository root. `index.html`, `assets/`, `data/`, `docs/`, `scripts/`, `README.md`, and `AGENT_LOG.md` belong directly in the root, not inside an extra enclosing folder. Preserve the starter's `.github/workflows/pages.yml` and `AGENTS.md`. No build command or dependency setup is needed.
3. Until you are ready, leave GitHub Pages disabled. The existing workflow attempts publication on pushes to `main`.
4. When ready, open **Settings → Pages**, choose **GitHub Actions** as the source, then **Actions → Publish site to GitHub Pages → Run workflow**.
5. Wait for a green check and open the URL shown by the workflow, normally `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`. Verify the cards, chart, dropdown, and download again on that URL.

The original workflow has not been changed. There is no live public URL yet. The agent can guide these account and upload steps later; you do not need to install tools or run commands.

## Files and tools

- `index.html`: accessible dashboard structure and methodology.
- `assets/styles.css`: responsive styling, system fonts, keyboard focus and reduced-motion support.
- `assets/app.js`: view selection, chart/table rendering and CSV export.
- `assets/data.js`: calculated dataset summaries.
- `scripts/build_data.py`, `scripts/verify_data.py`: reproducible generation and independent validation (Python standard library only; development tools, not required to view or publish).
- `scripts/original_checksums.json`: original dataset integrity record.
- `AGENT_LOG.md`: AI-assisted development record.

Development used OpenAI Codex, Python CSV/statistics/hashlib/sqlite3, Node.js syntax checking, and a local browser preview. No third-party chart library is required. The student requested and approved the dashboard; Codex implemented and tested it. The student should review the finished website and log before submission.

## Citation

College-town home sales dataset, version 1.0 (2026). University of Illinois-Deloitte Foundation Center for Business Emerging Technologies. Data collected March 2026. Values are as reported by the collection source, not verified against county records.
