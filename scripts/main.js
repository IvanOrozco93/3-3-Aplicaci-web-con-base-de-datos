document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.getElementById('addForm');
    const itemList = document.getElementById('itemList');

    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemNameInput = document.getElementById('itemName');
        const itemName = itemNameInput.value;

        if (itemName) {
            const li = createListItem(itemName);
            itemList.appendChild(li);

            // Limpiamos el campo de entrada
            itemNameInput.value = '';

            // Guardamos en Local Storage
            updateLocalStorage();
        }
    });

    // Cargamos los registros almacenados en Local Storage al cargar la página
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    storedItems.forEach(function (item) {
        const li = createListItem(item);
        itemList.appendChild(li);
    });

    // crea un elemento de lista con botones
    function createListItem(item) {
        const li = document.createElement('li');
        li.textContent = item;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function () {
            // Al hacer clic en "Editar", convertir el texto en un campo de entrada
            const existingText = li.textContent;
            const inputField = document.createElement('input');
            inputField.value = existingText;
            li.textContent = ''; // Limpiamos contenido actual
            li.appendChild(inputField);
            inputField.focus();

            // Al presionar Enter en el campo de entrada, guardamos los cambios
            inputField.addEventListener('keyup', function (event) {
                if (event.key === 'Enter') {
                    li.textContent = inputField.value;
                    li.appendChild(editButton); // Restauramos el botón de editar
                    li.appendChild(deleteButton); // Restauramos el botón de eliminar
                    updateLocalStorage();
                }
            });
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function () {
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        return li;
    }

    // Función para actualizar Local Storage con los registros actuales
    function updateLocalStorage() {
        const items = Array.from(itemList.children).map(li => li.textContent);
        localStorage.setItem('items', JSON.stringify(items));
    }
});
