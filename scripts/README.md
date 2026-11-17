# Data generation and verification

These development scripts use Python's standard library. The student does not need to run them to view or publish the website.

- `build_data.py`: read the original CSV, validate unique listing IDs, and generate `assets/data.js` with pooled and city-level statistics. Never writes the original files.
- `verify_data.py`: independently compare every generated metric against the original SQLite database (opened read-only), and verify dataset SHA-256 hashes.
- `original_checksums.json`: hash baseline recorded immediately after downloading the professor's official ZIP.

For a developer or agent, from the repository root:

```
python3 scripts/build_data.py
python3 scripts/verify_data.py
node --check assets/app.js
```

The website itself needs no build step. Generated `assets/data.js` is committed alongside the HTML, CSS and JavaScript. A new dataset requires regenerating the summaries and updating the independent hash baseline deliberately; do not change original files for this assignment.
