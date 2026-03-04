---
name: stitch-to-react
description: Automates the entire process of pulling a specific Stitch screen, downloading its HTML, extracting components and data, updating Tailwind configuration, and integrating it into the project automatically.
---

# `stitch-to-react` Workflow

This workflow automates the exact multi-step command sequence required to convert a raw Stitch screen straight into modular React components in your Project Management App.

## Features
- Connects to the MCP Stitch Server to fetch the targeted screen by ID.
- Downloads the raw HTML payload securely.
- Extracts Tailwind CSS class data and safelists it in `tailwind.config.js`.
- Separates static text/props into `client/src/data/mockData.js`.
- Builds modular React JSX Components (`client/src/components/*`).
- Wires the new page up in `client/src/App.jsx`.

## How to use this workflow:
When you have a new screen you want to inject, just tell me:
> "Run the `stitch-to-react` workflow for Project ID: [X] and Screen ID: [Y], and name the page [Z]"

---

## Technical Execution Steps for the Assistant:

When the User asks you to execute this workflow, you MUST execute the following exact logic step-by-step:

### 1. Fetch Metadata
Call `mcp_stitch_get_screen` with the user-provided `projectId` and `screenId`.
Extract the `htmlCode.downloadUrl`.

### 2. Download Source HTML
Wait for the command to finish.
// turbo
Run `invoke-webrequest -uri "[HTML_DOWNLOAD_URL]" -outfile "client/temp-stitch.html"`

### 3. Read & Analyze HTML
Call `view_file` on `client/temp-stitch.html`.
Identify:
1. The **Tailwind CSS variables** defined in the `<script>` tag.
2. The **main layout structure** (Sidebar, Header, Main Content, etc.).
3. The **repeating elements** (Lists, Tables, Grids, Cards).

### 4. Create Mock Data Engine
Extract all hardcoded names, statistics, lists, avatars, and dates into a new javascript module exporting const arrays/objects.
Write this to `client/src/data/[NewPageName]Data.js`.

### 5. Generate React JSX Components
Convert the HTML chunks into React components:
- Break down the layout into modular pieces (e.g. `[NewPageName]Sidebar.jsx`, `[NewPageName]Content.jsx`).
- Change all `class=` to `className=`.
- Close all unclosed tags (`<input>`, `<img>`).
- Convert inline strings like `style="width: 50%"` to React objects: `style={{ width: '50%' }}`.
- Import the variables from `[NewPageName]Data.js` and map over them in the JSX.
Write all nested components to `client/src/components/`.

### 6. Generate Parent Page Layer
Create the master wrapper component at `client/src/pages/[NewPageName].jsx`.
This component must:
1. Include the extracted `<style>` block (scrollbar logic) from the Stitch HTML.
2. Form the main `flex` structure and render the created sub-components.

### 7. Safelist Tailwind Colors
Open `client/tailwind.config.js`. You MUST analyze the `mockData.js` file for dynamic background/text modifier colors (e.g., `bg-emerald-500`, `text-indigo-400`). 
Update the `safelist` array in `tailwind.config.js` to cover any new dynamic templates utilizing string insertion in the JSX mapping components.

### 8. Wire App.jsx Router
Parse `client/src/App.jsx`.
Add a new standard Route under the `<BrowserRouter>` pointing to the new page. For example, if compiling a settings screen:
`<Route path="/[NewPageName]" element={<[NewPageName] />} />`

### 9. Clean up Workspace
Wait for the command to finish.
// turbo
Run `rm ./client/temp-stitch.html`

### 10. Announce Completion
Tell the USER that the Vite server has hot-reloaded and they can view the newly built page at `http://localhost:5173/[NewPageName]`.
