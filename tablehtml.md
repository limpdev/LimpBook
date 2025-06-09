If you’ve got a Markdown → HTML table workflow going, you’re already halfway there. For sorting and searching, you’ve got tons of good options, ranging from lightweight no-dependency scripts to full-featured libraries. Here’s the list, organized by vibe and use case:

⸻

🧠 Zero-dependency / Vanilla JS

Great for simple sites or embedding in markdown-to-HTML workflows.

1. SortTable.js
	•	Lightweight (a single JS file)
	•	Just add class="sortable" to your <table>
	•	Auto-enables sort on column headers

🔗 https://www.kryogenix.org/code/browser/sorttable/

2. List.js
	•	Powerful for sorting, searching, filtering table-like content or any list
	•	Works with tables or divs
	•	No dependencies, small footprint

🔗 https://listjs.com/

3. Custom Vanilla JS
	•	Write your own search/sort functions
	•	Good for full control but DIY-heavy

⸻

⚡ Lightweight Libraries

These don’t require jQuery and offer more features without bloat.

4. Tablesort
	•	Small (around 2 KB)
	•	Works automatically
	•	Extendable

🔗 https://tristen.ca/tablesort/demo/

5. Grid.js
	•	Sort, search, paginate, export
	•	Can be styled to look clean
	•	Framework-agnostic (JS, React, etc.)

🔗 https://gridjs.io/

⸻

💪 Heavy-Duty Solutions (if you’re going big)

Ideal for apps, dashboards, large datasets.

6. DataTables (jQuery-based)
	•	Mature and powerful
	•	Instant search, pagination, sort, export to CSV, etc.
	•	Requires jQuery

🔗 https://datatables.net/

7. AG Grid
	•	For serious enterprise tables
	•	Tons of features (grouping, filtering, pivoting)
	•	Free and Pro tiers

🔗 https://www.ag-grid.com/

8. Tabulator
	•	All-in-one UI table library
	•	Highly customizable
	•	Data-driven (like React/Vue friendly)

🔗 http://tabulator.info/

⸻

🛠️ Framework-specific (in case you’re using one)
	•	React Table: Hooks-based, headless, gives full control
	•	Vue Good Table: Vue wrapper with features out of the box
	•	Svelte Simple Datatables: For Svelte apps

⸻

✅ Best picks by use case:

Use Case	Recommendation
Just want to sort columns	SortTable.js or Tablesort
Want search + sort	List.js or Grid.js
Need pagination/export/etc.	DataTables or Tabulator
Framework app (React/Vue/etc.)	React Table / Vue Good Table

---

# MDBook Grid.js Integration Guide

## 1. Update book.toml

Add this to your `book.toml` file:

```toml
[output.html]
additional-css = ["theme/gridjs.css"]
additional-js = ["theme/gridjs.js"]

[output.html.head]
# Add Grid.js CDN links
additional-html = '''
<link href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css" rel="stylesheet" />
<script src="https://unpkg.com/gridjs/dist/gridjs.umd.js"></script>
'''
```

## 2. Create theme/gridjs.css

Create a `theme` folder in your MDBook root and add `gridjs.css`:

```css
/* Custom Grid.js styling for MDBook */
.gridjs-wrapper {
    margin: 20px 0;
    font-family: inherit;
}

.gridjs-table {
    border: 1px solid var(--sidebar-bg, #fafafa);
    border-radius: 4px;
}

.gridjs-th {
    background-color: var(--sidebar-bg, #fafafa);
    color: var(--fg, #333);
    font-weight: 600;
}

.gridjs-td {
    color: var(--fg, #333);
    border-bottom: 1px solid var(--sidebar-bg, #fafafa);
}

.gridjs-search {
    margin-bottom: 15px;
}

.gridjs-search input {
    background: var(--searchbar-bg, #f1f1f1);
    border: 1px solid var(--searchbar-border-color, #aaa);
    color: var(--searchbar-fg, #000);
    border-radius: 3px;
    padding: 8px 12px;
    width: 300px;
    max-width: 100%;
}

.gridjs-pagination {
    margin-top: 15px;
}

/* Dark theme support */
.rust .gridjs-th {
    background-color: var(--sidebar-bg);
    color: var(--sidebar-fg);
}

.rust .gridjs-td {
    color: var(--fg);
    border-bottom-color: var(--sidebar-bg);
}

/* Responsive table */
@media (max-width: 768px) {
    .gridjs-container {
        overflow-x: auto;
    }
    
    .gridjs-search input {
        width: 100%;
    }
}
```

## 3. Create theme/gridjs.js

Add `gridjs.js` with initialization logic:

```javascript
// Initialize Grid.js tables when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGridTables();
});

// Re-initialize when navigating in MDBook
window.addEventListener('popstate', function() {
    setTimeout(initializeGridTables, 100);
});

function initializeGridTables() {
    // Find all tables with data-grid attribute
    const gridTables = document.querySelectorAll('table[data-grid]');
    
    gridTables.forEach((table, index) => {
        // Skip if already initialized
        if (table.dataset.gridInitialized) return;
        
        // Extract configuration from data attributes
        const config = {
            pagination: {
                enabled: table.dataset.pagination !== 'false',
                limit: parseInt(table.dataset.pageSize) || 10
            },
            search: table.dataset.search !== 'false',
            sort: table.dataset.sort !== 'false',
            resizable: table.dataset.resizable === 'true'
        };
        
        // Create container for Grid.js
        const container = document.createElement('div');
        container.id = `grid-container-${index}`;
        table.parentNode.insertBefore(container, table);
        
        // Extract table data
        const data = extractTableData(table);
        
        // Initialize Grid.js
        new gridjs.Grid({
            columns: data.headers.map(header => ({
                name: header,
                sort: config.sort
            })),
            data: data.rows,
            pagination: config.pagination,
            search: config.search,
            resizable: config.resizable,
            className: {
                container: 'gridjs-container',
                table: 'gridjs-table',
                th: 'gridjs-th',
                td: 'gridjs-td'
            }
        }).render(container);
        
        // Hide original table
        table.style.display = 'none';
        table.dataset.gridInitialized = 'true';
    });
}

function extractTableData(table) {
    const headers = [];
    const rows = [];
    
    // Extract headers
    const headerRow = table.querySelector('thead tr, tr:first-child');
    if (headerRow) {
        headerRow.querySelectorAll('th, td').forEach(cell => {
            headers.push(cell.textContent.trim());
        });
    }
    
    // Extract data rows
    const dataRows = table.querySelectorAll('tbody tr, tr:not(:first-child)');
    dataRows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td, th').forEach(cell => {
            rowData.push(cell.textContent.trim());
        });
        if (rowData.length > 0) {
            rows.push(rowData);
        }
    });
    
    return { headers, rows };
}

// Handle MDBook navigation
if (window.playpen_text) {
    // Hook into MDBook's navigation system
    const originalNavigate = window.playpen_text;
    window.playpen_text = function(...args) {
        const result = originalNavigate.apply(this, args);
        setTimeout(initializeGridTables, 200);
        return result;
    };
}
```

## 4. Usage in Markdown Files

Now you can enhance any table in your `.md` files by adding data attributes:

### Basic Enhanced Table
```markdown
<table data-grid>
<thead>
<tr><th>Name</th><th>Role</th><th>Department</th><th>Salary</th></tr>
</thead>
<tbody>
<tr><td>John Doe</td><td>Developer</td><td>Engineering</td><td>$75,000</td></tr>
<tr><td>Jane Smith</td><td>Designer</td><td>UX</td><td>$70,000</td></tr>
<tr><td>Bob Johnson</td><td>Manager</td><td>Engineering</td><td>$90,000</td></tr>
</tbody>
</table>
```

### Customized Table
```markdown
<table data-grid data-page-size="5" data-search="true" data-sort="true">
<thead>
<tr><th>API Endpoint</th><th>Method</th><th>Status</th><th>Response Time</th></tr>
</thead>
<tbody>
<tr><td>/api/users</td><td>GET</td><td>200</td><td>45ms</td></tr>
<tr><td>/api/orders</td><td>POST</td><td>201</td><td>120ms</td></tr>
<tr><td>/api/products</td><td>GET</td><td>200</td><td>30ms</td></tr>
</tbody>
</table>
```

## 5. Configuration Options

Available data attributes for tables:

- `data-grid`: Enables Grid.js (required)
- `data-pagination="false"`: Disables pagination
- `data-page-size="20"`: Sets items per page (default: 10)
- `data-search="false"`: Disables search
- `data-sort="false"`: Disables sorting
- `data-resizable="true"`: Enables column resizing

## 6. Advanced Features

### Custom Cell Rendering
For more complex tables, you can modify the `gridjs.js` to support custom cell rendering:

```javascript
// Add to gridjs.js - custom formatter function
function createAdvancedGrid(container, data, options = {}) {
    return new gridjs.Grid({
        columns: [
            { name: 'Name', sort: true },
            { name: 'Email', sort: true },
            { 
                name: 'Actions',
                formatter: (cell, row) => {
                    return gridjs.html(`
                        <button class="btn-edit">Edit</button>
                        <button class="btn-delete">Delete</button>
                    `);
                }
            }
        ],
        data: data,
        ...options
    }).render(container);
}
```

## 7. Building and Testing

1. Run `mdbook build` to generate your site
2. Check that Grid.js files are included in the output
3. Test table functionality in different browsers
4. Verify responsive behavior on mobile devices

## Tips for Go Web Development

Since you're building towards Go web applications, consider:

- Using Grid.js with Go's `html/template` package for server-side rendering
- Implementing JSON endpoints in Go that Grid.js can consume directly
- Leveraging Go's struct tags for automatic table column generation
- Building a Go middleware that automatically converts database results to Grid.js format

This setup gives you powerful table functionality while maintaining MDBook's simplicity and performance.