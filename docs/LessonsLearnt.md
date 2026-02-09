# Lessons Learnt

This page contains all lessons learned throughout the project. Use the filters and search box to find specific lessons and insights.

_Last updated: {{ git_revision_date_localized }}_

-----

<div class="lessons-container">
  <!-- Filter Controls -->
  <div class="filter-section">
    <div class="filter-group">
      <label for="search-box">Search:</label>
      <input type="text" id="search-box" placeholder="Search lessons...">
    </div>
    
    <div class="filter-group">
      <label for="filter-category">Category:</label>
      <select id="filter-category">
        <option value="">All Categories</option>
      </select>
    </div>
    
    <div class="filter-group">
      <label for="filter-impact">Impact:</label>
      <select id="filter-impact">
        <option value="">All Impacts</option>
      </select>
    </div>
    
    <div class="filter-group">
      <label for="filter-component">Component:</label>
      <select id="filter-component">
        <option value="">All Components</option>
      </select>
    </div>
    
    <button id="clear-filters" class="clear-btn">Clear All Filters</button>
  </div>

  <div id="results-count" class="results-count"></div>

  <!-- Lessons Table -->
  <div class="table-wrapper">
    <table id="lessons-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Issue/Challenge</th>
          <th>Lesson Learned</th>
          <th>Impact</th>
          <th>Component</th>
        </tr>
      </thead>
      <tbody id="lessons-tbody">
        <!-- Lessons will be populated by JavaScript -->
      </tbody>
    </table>
  </div>
</div>

<style>
.lessons-container {
  margin: 2rem 0;
}

.filter-section {
  background: var(--md-code-bg-color);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem;
  border: 1px solid var(--md-default-fg-color--lighter);
  border-radius: 0.25rem;
  background: var(--md-default-bg-color);
  color: var(--md-default-fg-color);
  font-size: 0.9rem;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background: var(--md-primary-fg-color);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  height: fit-content;
}

.clear-btn:hover {
  opacity: 0.9;
}

.results-count {
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--md-default-fg-color--light);
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#lessons-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--md-default-bg-color);
}

#lessons-table thead {
  background: var(--md-code-bg-color);
  position: sticky;
  top: 0;
  z-index: 10;
}

#lessons-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--md-default-fg-color--lightest);
  white-space: nowrap;
}

#lessons-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--md-default-fg-color--lightest);
  vertical-align: top;
}

#lessons-table tbody tr:hover {
  background: var(--md-code-bg-color);
}

.date-cell {
  white-space: nowrap;
  font-family: var(--md-code-font-family);
  font-size: 0.9rem;
}

.issue-cell,
.lesson-cell {
  max-width: 350px;
  line-height: 1.5;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

/* Category badges */
.badge-hardware { background: #ef4444; color: white; }
.badge-software { background: #3b82f6; color: white; }
.badge-testing { background: #8b5cf6; color: white; }
.badge-integration { background: #ec4899; color: white; }
.badge-tools { background: #14b8a6; color: white; }
.badge-git { background: #f97316; color: white; }
.badge-communication { background: #06b6d4; color: white; }
.badge-debugging { background: #eab308; color: black; }
.badge-documentation { background: #84cc16; color: black; }
.badge-design { background: #a855f7; color: white; }

/* Impact badges */
.badge-high { background: #dc2626; color: white; }
.badge-medium { background: #f59e0b; color: black; }
.badge-low { background: #22c55e; color: white; }

/* Responsive design */
@media (max-width: 768px) {
  .filter-section {
    grid-template-columns: 1fr;
  }
  
  .issue-cell,
  .lesson-cell {
    max-width: 200px;
  }
}
</style>

<script>
// Lessons data will be loaded here
let allLessons = [];

// Load lessons from embedded CSV data
const lessonsData = `Date,Category,Issue,Lesson,Impact,Component
2024-04-18,Tools,MkDocs not building locally,Install pymdownx-extensions package - not included in base mkdocs installation,Low,Documentation,
2026-02-10, Tools, Visualization of PlantUML Diagrams, See below, Low, Documentation`;

// Parse CSV
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    let currentField = '';
    let inQuotes = false;
    let fieldIndex = 0;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        obj[headers[fieldIndex]] = currentField.trim();
        currentField = '';
        fieldIndex++;
      } else {
        currentField += char;
      }
    }
    obj[headers[fieldIndex]] = currentField.trim();
    data.push(obj);
  }
  
  return data;
}

allLessons = parseCSV(lessonsData);

// Get unique values for filters
function getUniqueValues(field) {
  return [...new Set(allLessons.map(lesson => lesson[field]))].filter(Boolean).sort();
}

// Populate filter dropdowns
function populateFilters() {
  const categoryFilter = document.getElementById('filter-category');
  const impactFilter = document.getElementById('filter-impact');
  const componentFilter = document.getElementById('filter-component');
  
  getUniqueValues('Category').forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    categoryFilter.appendChild(option);
  });
  
  ['High', 'Medium', 'Low'].forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    impactFilter.appendChild(option);
  });
  
  getUniqueValues('Component').forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    componentFilter.appendChild(option);
  });
}

// Get badge class based on value
function getBadgeClass(type, value) {
  const normalized = value.toLowerCase().replace(/[^a-z]/g, '');
  
  if (type === 'category') {
    return `badge badge-${normalized}`;
  } else if (type === 'impact') {
    return `badge badge-${normalized}`;
  }
  
  return 'badge';
}

// Render lessons table
function renderLessons(lessons) {
  const tbody = document.getElementById('lessons-tbody');
  tbody.innerHTML = '';
  
  lessons.forEach(lesson => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="date-cell">${lesson.Date}</td>
      <td><span class="${getBadgeClass('category', lesson.Category)}">${lesson.Category}</span></td>
      <td class="issue-cell">${lesson.Issue}</td>
      <td class="lesson-cell">${lesson.Lesson}</td>
      <td><span class="${getBadgeClass('impact', lesson.Impact)}">${lesson.Impact}</span></td>
      <td>${lesson.Component}</td>
    `;
    tbody.appendChild(row);
  });
  
  document.getElementById('results-count').textContent = 
    `Showing ${lessons.length} of ${allLessons.length} lessons`;
}

// Filter lessons
function filterLessons() {
  const searchTerm = document.getElementById('search-box').value.toLowerCase();
  const categoryFilter = document.getElementById('filter-category').value;
  const impactFilter = document.getElementById('filter-impact').value;
  const componentFilter = document.getElementById('filter-component').value;
  
  const filtered = allLessons.filter(lesson => {
    const matchesSearch = !searchTerm || 
      lesson.Date.toLowerCase().includes(searchTerm) ||
      lesson.Issue.toLowerCase().includes(searchTerm) ||
      lesson.Lesson.toLowerCase().includes(searchTerm) ||
      lesson.Component.toLowerCase().includes(searchTerm);
    
    const matchesCategory = !categoryFilter || lesson.Category === categoryFilter;
    const matchesImpact = !impactFilter || lesson.Impact === impactFilter;
    const matchesComponent = !componentFilter || lesson.Component === componentFilter;
    
    return matchesSearch && matchesCategory && matchesImpact && matchesComponent;
  });
  
  renderLessons(filtered);
}

// Clear all filters
function clearFilters() {
  document.getElementById('search-box').value = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-impact').value = '';
  document.getElementById('filter-component').value = '';
  filterLessons();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  populateFilters();
  renderLessons(allLessons);
  
  // Add event listeners
  document.getElementById('search-box').addEventListener('input', filterLessons);
  document.getElementById('filter-category').addEventListener('change', filterLessons);
  document.getElementById('filter-impact').addEventListener('change', filterLessons);
  document.getElementById('filter-component').addEventListener('change', filterLessons);
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
});
</script>

---

## How to Add New Lessons

To add new lessons to this page, simply add a new line to the CSV data in the `lessonsData` variable in the script section above. Follow this format:

```
Date,Category,Issue,Lesson,Impact,Component
```

**Categories:** Hardware, Software, Testing, Integration, Tools, Git, Communication, Debugging, Documentation, Design

**Impact Levels:** High, Medium, Low

**Example:**
```
2024-06-01,Software,Memory leak in task,Always check for memory leaks using heap monitoring tools,High,RTOS
```

---

## Image Zoom Solution for PlantUML Diagrams

### Problem Statement
PlantUML diagrams generated by the `build_plantuml` plugin were not interactive. Users could not zoom in to view details on complex block diagrams, making large architectural diagrams difficult to read.

### Requirements
- Click-to-open functionality with fullscreen/modal view
- Scroll wheel zoom capability within the opened view
- Drag-to-pan when zoomed in
- Support for all PlantUML diagram types
- Mobile-friendly (pinch-to-zoom)

### Options Evaluated

**Option 1: GLightbox Plugin Only**  
- ✅ **Pros:** Beautiful fullscreen popup/modal experience, smooth animations, mobile pinch-zoom support  
- ❌ **Cons:** No scroll wheel zoom on desktop, limited zoom control  
- **Verdict:** Insufficient - missing critical scroll-to-zoom functionality

**Option 2: Panzoom Plugin Only**  
- ✅ **Pros:** Native scroll wheel zoom, drag-to-pan, simple configuration  
- ❌ **Cons:** In-page zoom only (no popup/modal), clutters the documentation layout, less elegant user experience  
- **Verdict:** Functional but poor UX - loses the clean, focused viewing experience

**Option 3: Combined Solution (GLightbox + Custom JavaScript)**  
- ✅ **Pros:** Best of both worlds - elegant popup experience + scroll wheel zoom, drag-to-pan when zoomed, works seamlessly with PlantUML diagrams  
- ⚠️ **Cons:** Requires custom JavaScript maintenance, slightly more complex setup  
- **Verdict:** SELECTED - meets all requirements with optimal user experience

### Decision
Selected **Option 3** (GLightbox + Custom JavaScript) because the user experience was paramount. The ability to click a diagram for a fullscreen, distraction-free view combined with precise zoom control provides the best way to interact with complex technical diagrams.

### Implementation
- Primary: `mkdocs-glightbox` plugin for popup/modal functionality
- Enhancement: Custom JavaScript (`custom_glightbox_zoom.js`) for scroll wheel zoom and pan
- Configuration: `zoomable: true` in glightbox config for mobile pinch-zoom

### Lessons Learned
- User experience should drive technical decisions - a slightly more complex implementation was justified by significantly better UX
- Testing multiple solutions before committing saves time - the combined approach wasn't obvious initially
- Custom JavaScript is acceptable when it fills a specific gap that existing plugins don't address
- Always consider both desktop and mobile use cases when evaluating zoom solutions