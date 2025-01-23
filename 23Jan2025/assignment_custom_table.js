class CustomTable extends HTMLElement {
    constructor() {
        super();
        this.columns = [];
        this.rows = [];
        this.border = false;
        this.altRowColor = false;
        this.caption = '';
        this.table = document.createElement('table');
        this.table.className = 'custom-table';
    }

    static get observedAttributes() {
        return ['border', 'alt-row-color', 'caption'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'border') {
        this.border = newValue === 'true';
        } else if (name === 'alt-row-color') {
        this.altRowColor = newValue === 'true';
        } else if (name === 'caption') {
        this.caption = newValue || '';
        }
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Reset the table
        this.table.innerHTML = '';

        // Add caption if present
        if (this.caption) {
        const caption = document.createElement('caption');
        caption.textContent = this.caption;
        caption.className = this.border ? 'caption-bordered' : '';
        this.table.appendChild(caption);
        }

        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        this.columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
        });
        const deleteHeader = document.createElement('th');
        deleteHeader.textContent = 'Actions';
        headerRow.appendChild(deleteHeader);
        thead.appendChild(headerRow);
        this.table.appendChild(thead);

        // Add table body
        const tbody = document.createElement('tbody');
        this.rows.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            td.ondblclick = () => this.editCell(td, rowIndex, row.indexOf(cell));
            tr.appendChild(td);
        });

        // Add delete button
        const actionTd = document.createElement('td');
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-row';
        deleteBtn.onclick = () => this.deleteRow(rowIndex);
        actionTd.appendChild(deleteBtn);
        tr.appendChild(actionTd);

        tbody.appendChild(tr);
        });
        this.table.appendChild(tbody);

        // Apply border and alt row color
        this.table.className = `${this.border ? 'bordered' : ''} ${this.altRowColor ? 'alt-row-color' : ''}`;

        // Append table to the shadow DOM
        this.appendChild(this.table);
    }

    editCell(td, rowIndex, colIndex) {
        const currentValue = td.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        td.textContent = '';
        td.appendChild(input);

        input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            this.rows[rowIndex][colIndex] = input.value;
            this.render();
        }
        };

        input.focus();
    }

    addRow(rowData) {
        this.rows.push(rowData);
        this.render();
    }

    deleteRow(index) {
        this.rows.splice(index, 1);
        this.render();
    }
}

customElements.define('custom-table', CustomTable);

// Form handling
const tableForm = document.getElementById('tableForm');
const tableContainer = document.getElementById('table-container');

tableForm.onsubmit = (e) => {
    e.preventDefault();

    const columns = document.getElementById('columns').value.split(',').map(col => col.trim());
    const border = document.getElementById('border').checked;
    const altRowColor = document.getElementById('altRowColor').checked;
    const caption = document.getElementById('caption').value;

    const customTable = document.createElement('custom-table');
    customTable.columns = columns;
    customTable.setAttribute('border', border);
    customTable.setAttribute('alt-row-color', altRowColor);
    customTable.setAttribute('caption', caption);

    tableContainer.innerHTML = '';
    tableContainer.appendChild(customTable);

    // Add row functionality
    const addRowForm = document.createElement('form');
    addRowForm.className = 'row-form';
    addRowForm.innerHTML = `
        ${columns.map(col => `<input type="text" placeholder="${col}" required>`).join('')}
        <button type="submit">Add Row</button>
    `;
    addRowForm.onsubmit = (event) => {
        event.preventDefault();
        const rowData = Array.from(addRowForm.querySelectorAll('input')).map(input => input.value);
        customTable.addRow(rowData);
        addRowForm.reset();
    };
    tableContainer.appendChild(addRowForm);
};