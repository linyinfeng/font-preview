
const testArea = document.getElementById("test-area");
const inputsTable = document.getElementById("css-inputs");

const properties = [
    { name: 'font-family', defaultValue: "serif" },
    { name: 'font-style', defaultValue: "normal" },
    { name: 'font-variant', defaultValue: "normal" },
    { name: 'font-weight', defaultValue: "normal" },
    { name: 'font-size', defaultValue: "medium" },
    { name: 'line-height', defaultValue: "normal" },
];

for (const p of properties) {
    const inputId = `${p.name}-input`;

    const row = inputsTable.insertRow(-1);

    const nameCell = row.insertCell(-1);
    nameCell.classList.add("css-input-label-cell");
    const label = document.createElement("label");
    label.for = inputId;
    label.classList.add("css-input-label");
    const labelContent = document.createTextNode(`${p.name}:`);
    label.appendChild(labelContent);
    nameCell.appendChild(label);

    const inputCell = row.insertCell(-1);
    inputCell.classList.add("css-input-input-cell");
    const input = document.createElement("input");
    input.id = inputId;
    input.value = p.defaultValue;
    inputCell.appendChild(input);

    testArea.style[p.name] = input.value;
    input.addEventListener('change', (event) => {
        testArea.style[p.name] = event.target.value;
    })
}
