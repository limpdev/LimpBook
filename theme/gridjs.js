// Initialize Grid.js tables when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGridTables();
});

// Re-initialize when navigating in MDBook
window.addEventListener('popstate', function() {
    setTimeout(initializeGridTables, 100);
});

function initializeGridTables() {
    // First, add data-grid attribute to all tables that don't have it
    const allTables = document.querySelectorAll('table:not([data-grid]):not([data-grid-initialized])');
    allTables.forEach(table => {
        table.setAttribute('data-grid', '');
    });
    
    // Find all tables with data-grid attribute
    const gridTables = document.querySelectorAll('table[data-grid]');
    
    gridTables.forEach((table, index) => {
        // Skip if already initialized
        if (table.dataset.gridInitialized) return;
        
        // Extract configuration from data attributes
        const config = {
            pagination: {
                enabled: table.dataset.pagination !== 'false',
                limit: parseInt(table.dataset.pageSize) || 25
            },
            search: table.dataset.search !== 'false',
            sort: table.dataset.sort !== 'false',
            resizable: table.dataset.resizable !== 'true'
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