const testArea = document.getElementById("test-area");
const inputTableCss = document.getElementById("css-inputs-table");
const inputTableAttribute = document.getElementById("attribute-inputs-table");
const saveButton = document.getElementById("save-button");
const saveArea = document.getElementById("save-area");
let savedTexts = [];

const cssProperties = [
    { name: 'font-family', defaultValue: "serif" },
    { name: 'font-style', defaultValue: "normal" },
    { name: 'font-variant', defaultValue: "normal" },
    { name: 'font-weight', defaultValue: "normal" },
    { name: 'font-size', defaultValue: "medium" },
    { name: 'line-height', defaultValue: "normal" },
    { name: 'text-autospace', defaultValue: "normal" },
    { name: 'text-spacing-trim', defaultValue: "normal" },
];

const attributes = [
    { name: 'lang', defaultValue: "unknown" }
];

function createInput(inputTable, id, type, spec) {
    const row = inputTable.insertRow(-1);

    const nameCell = row.insertCell(-1);
    nameCell.classList.add("input-label-cell");
    nameCell.classList.add(`${type}-input-label-cell`);
    const label = document.createElement("label");
    label.for = id;
    label.classList.add("input-label");
    label.classList.add(`${type}-input-label`);
    const labelContent = document.createTextNode(`${spec.name}:`);
    label.appendChild(labelContent);
    nameCell.appendChild(label);

    const inputCell = row.insertCell(-1);
    inputCell.classList.add(`${type}-input-input-cell`);
    inputCell.classList.add("input-cell");
    const input = document.createElement("input");
    input.id = id;
    input.value = spec.defaultValue;
    inputCell.appendChild(input);

    return input;
}

function createDescriptionItem(key, value) {
    const descriptionItem = document.createElement("div");
    descriptionItem.classList.add("saved-description-item");

    const descriptionItemKey = document.createElement("span");
    const descriptionItemKeyText = document.createTextNode(key);
    descriptionItemKey.appendChild(descriptionItemKeyText);
    descriptionItemKey.classList.add("saved-description-item-key");

    const descriptionItemValue = document.createElement("span");
    const descriptionItemValueText = document.createTextNode(value);
    descriptionItemValue.appendChild(descriptionItemValueText);
    descriptionItemValue.classList.add("saved-description-item-value");

    descriptionItem.appendChild(descriptionItemKey);
    descriptionItem.appendChild(descriptionItemValue);

    return descriptionItem
}

function save() {
    const paragraph = document.createElement("p");
    const text = document.createTextNode(testArea.value);
    savedTexts.push(text);
    paragraph.appendChild(text);
    for (const p of cssProperties) {
        paragraph.style[p.name] = testArea.style[p.name];
    }
    for (const a of attributes) {
        paragraph.setAttribute(a.name, testArea.getAttribute(a.name));
    }
    paragraph.classList.add("saved-paragraph");

    const descriptions = document.createElement("div");
    for (const p of cssProperties) {
        const descriptionItem = createDescriptionItem(p.name, paragraph.style[p.name]);
        descriptions.appendChild(descriptionItem);
    }
    for (const a of attributes) {
        const descriptionItem = createDescriptionItem(a.name, paragraph.getAttribute(a.name));
        descriptions.appendChild(descriptionItem);
    }
    descriptions.classList.add("saved-descriptions");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute('type', 'button');
    const deleteButtonText = document.createTextNode("delete");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.classList.add("saved-delete-button");

    const savedItem = document.createElement("div");
    savedItem.appendChild(paragraph);
    savedItem.appendChild(descriptions);
    savedItem.appendChild(deleteButton);
    savedItem.classList.add("saved-item");

    saveArea.appendChild(savedItem);

    deleteButton.addEventListener("click", (_event) => {
        saveArea.removeChild(savedItem);
        savedTexts = savedTexts.filter((item) => item !== text)
    });
}

(function () {
    for (const p of cssProperties) {
        const inputId = `css-input-${p.name}`;
        const input = createInput(inputTableCss, inputId, "css", p)
        testArea.style[p.name] = input.value;
        input.addEventListener('input', (event) => {
            testArea.style[p.name] = event.target.value;
        });
    }

    for (const a of attributes) {
        const inputId = `attribute-input-${a.name}`;
        const input = createInput(inputTableAttribute, inputId, "attribute", a)
        testArea.setAttribute(a.name, input.value);
        input.addEventListener('input', (event) => {
            testArea.setAttribute(a.name, event.target.value);
        });
    }

    testArea.addEventListener('input', (event) => {
        savedTexts.forEach((textNode) => {
            textNode.nodeValue = event.target.value;
        })
    });

    saveButton.addEventListener("click", save);

    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveButton.click();
        }
    });
})()
