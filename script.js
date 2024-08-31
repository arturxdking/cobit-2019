let selectedItem = null;

document.addEventListener('DOMContentLoaded', (event) => {
    shuffleItems();
});

function allowDrop(ev) {
    ev.preventDefault();
}

function selectItem(ev) {
    if (selectedItem) {
        selectedItem.classList.remove("selected");
    }
    selectedItem = ev.target;
    selectedItem.classList.add("selected");
}

function drop(ev) {
    ev.preventDefault();
    if (!selectedItem) return;

    const targetDiv = ev.target;
    const correctDomain = selectedItem.getAttribute("data-domain");

    if ((targetDiv.classList.contains("placeholder") || targetDiv.classList.contains("placeholder-mea")) && targetDiv.parentElement.id === correctDomain) {
        const identifier = correctDomain + selectedItem.id.slice(-2);
        selectedItem.textContent = identifier + " – " + selectedItem.textContent;
        targetDiv.appendChild(selectedItem);
        selectedItem.classList.remove("selected");
        selectedItem = null;  // Limpa a seleção após o drop
    } else {
        alert("Item incorreto. Solte o item no domínio correto.");
    }
}

// Função para embaralhar os itens
function shuffleItems() {
    const itemsContainer = document.querySelector('.items-container');
    const items = Array.from(itemsContainer.children);
    
    // Embaralhamento usando o método Fisher-Yates
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        itemsContainer.appendChild(items[j]);
        items[j] = items[i];
    }
}

// Aplicar o evento de clique aos itens
const items = document.querySelectorAll(".item");
items.forEach(item => item.addEventListener("click", selectItem));

// Permitir que os placeholders aceitem drops
const placeholders = document.querySelectorAll(".placeholder, .placeholder-mea");
placeholders.forEach(placeholder => placeholder.addEventListener("click", drop));
