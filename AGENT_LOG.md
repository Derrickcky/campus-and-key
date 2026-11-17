# Agent log

Add a dated entry each time you work with your AI coding agent, with the newest entry at the bottom. Each entry records what you asked the agent, what it produced, and what you checked or changed. Paste your key prompts in exactly as you typed them. Include at least one time the agent got something wrong, and how you caught it.

Copy this outline for each entry:

```markdown
## YYYY-MM-DD: What you worked on

- **Asked:** "Paste your prompt here."
- **Agent produced:** What it made or changed.
- **Checked or changed:** How you checked it, and what you fixed.
```

## 2026-11-16: Obtain and inspect the starter

- **Asked:** "[https://github.com/uidfc-business-emerging-technologies/campustown-home-sales-starter](https://github.com/uidfc-business-emerging-technologies/campustown-home-sales-starter)"
- **Agent produced:** Downloaded and extracted the professor's main-branch ZIP into outputs/campustown-home-sales-starter-main. Read AGENTS.md, docs/data_description_sheet.md, the placeholder page, README.md and log instructions. Prepared a dashboard implementation proposal; no analysis or website code has been changed yet.
- **Checked or changed:** Confirmed all five original dataset formats are present. The agent initially attempted git clone, but the command failed because Apple's command-line developer tools are unavailable. Downloading the official repository ZIP succeeded instead. A later python3 inspection attempt hit the same developer-tools issue; no statistics were computed by that command. Any numbers in the proposal come from the data description, pending independent verification. No datasets were modified and nothing was deployed.

## 2026-11-16: Implement and verify the complete dashboard

- **Asked:**

> Yes, I approve your dashboard plan. Please proceed with the full implementation.
>
> Build the complete website using the original dataset and follow all instructions in AGENTS.md.
>
> Please handle the coding, calculations, charts, responsive design, documentation, and testing.
>
> Verify all statistics against the actual data, keep the five original dataset files unchanged, and update AGENT_LOG.md.
>
> Once finished, please provide a preview of the website and explain how I can review it.
>
> Do not deploy the website yet because I still need to create my GitHub account.

- **Agent produced:** Plain HTML/CSS/JavaScript Campus & Key dashboard with summary cards, all-city price comparison, city selection, sorting, detailed city table, contextual findings, CSV export, data methodology, responsive styling, and relative asset paths. Created a Python CSV summary generator and a separate read-only SQLite verifier. Completed README with review instructions, calculation rules, limitations, and future GitHub Pages steps. Kept the original workflow and all five datasets unchanged. Started only a loopback preview; nothing was deployed.
- **Checked or changed:** All metrics for the pooled dataset and each of 18 cities matched independent SQLite queries, including date ranges and sample sizes. Confirmed 35,442 rows, 35,438 qualifying prices, $410,000 median, and 11-day median from 28,042 histories. SHA-256 checks passed for all five original files. Node syntax check passed. In-browser city dropdown, chart selection, ascending order, reset, and CSV download passed. Inspected 1280px desktop and 390px mobile, with no page-level horizontal overflow. Browser reported no warnings/errors. Saved desktop/mobile preview screenshots outside the site folder.
- **A mistake and correction:** The agent initially assumed system git and python3 would run; both were Apple developer-tool shims and failed. This was caught in tool output, not by the student. The agent downloaded the official ZIP instead and located bundled Python/Node runtimes before calculating anything. The first stylesheet draft also contained an unnecessary empty CSS import; removed it before browser testing. No student review or student-detected mistake is claimed. The student still needs to inspect the final website and this log before submission.
