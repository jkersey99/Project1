const URL = 'http://localhost:8080/warehouses'
let allWarehouses=[];


document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();


    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4) {
            let warehouses = JSON.parse(xhr.responseText);

            warehouses.forEach(newWarehouse => {
                addWarehouseToTable(newWarehouse)
            });
        }
    };

    xhr.open('GET', URL);

    xhr.send();

});

document.getElementById('new-warehouse-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-warehouse-form'));

    let newWarehouse = {

        name : inputData.get('new-warehouse-name'),
        manager : inputData.get('new-warehouse-manager'),
        maxInv : inputData.get('new-warehouse-maxinv'),
        city  : {
            city: inputData.get('new-warehouse-city'),
            state : inputData.get('new-warehouse-state'),
            zip : inputData.get('new-warehouse-zip')
        }
    }

    fetch(URL, {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(newWarehouse)
    })

    .then((data) => {
        return data.json();
    })

    .then((warehouseJson) => {
        addWarehouseToTable(warehouseJson);

        document.getElementById('new-warehouse-form').reset();
    })

    .catch((error) => {
        console.error(error);
    })
    resetAllForms();
});

function addWarehouseToTable(newWarehouse) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let name = document.createElement('td');
    let manager = document.createElement('td');
    let maxInv = document.createElement('td');  
    let city = document.createElement('td');  
    let editBtn = document.createElement('td');  
    let deleteBtn = document.createElement('td');

    id.innerText = newWarehouse.id;
    name.innerText = newWarehouse.name;
    manager.innerText= newWarehouse.manager;
    maxInv.innerText = newWarehouse.maxInv;
    city.innerText = newWarehouse.city.city + ', ' + newWarehouse.city.state + ', ' + newWarehouse.city.zip;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="update-button" onclick="activateEditForm(${newWarehouse.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newWarehouse.id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(manager);
    tr.appendChild(maxInv);
    tr.appendChild(city);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newWarehouse.id);

    document.getElementById('warehouse-table-body').appendChild(tr);

    allWarehouses.push(newWarehouse);
};


document.getElementById('update-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

document.getElementById('delete-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

function resetAllForms() {

    document.getElementById('new-warehouse-form').reset();
    document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();

    document.getElementById('new-warehouse-form').style.display = 'block';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';
}

function activateEditForm(warehouseId) {

    for(let w of allWarehouses) {
        if(w.id === warehouseId) {
            document.getElementById('update-warehouse-id').value = w.id;
            document.getElementById('update-warehouse-name').value = w.name;
            document.getElementById('update-warehouse-manager').value = w.manager;
            document.getElementById('update-warehouse-maxinv').value = w.maxInv;
            document.getElementById('update-warehouse-city').value = w.city.city;
            document.getElementById('update-warehouse-state').value = w.city.state;
            document.getElementById('update-warehouse-zip').value = w.city.zip;
        }
    }

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'block';
    document.getElementById('delete-warehouse-form').style.display = 'none';
    
}

function activateDeleteForm(warehouseId) {

    for(let w of allWarehouses) {
        if(w.id === warehouseId) {
            document.getElementById('delete-warehouse-id').value = w.id;
            document.getElementById('delete-warehouse-name').value = w.name;
            document.getElementById('delete-warehouse-manager').value = w.manager;
            document.getElementById('delete-warehouse-maxinv').value = w.maxInv;
            document.getElementById('delete-warehouse-city').value = w.city.city;
            document.getElementById('delete-warehouse-state').value = w.city.state;
            document.getElementById('delete-warehouse-zip').value = w.city.zip;
        }
    }

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'block';
}

document.getElementById('update-warehouse-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let inputData = new FormData(document.getElementById('update-warehouse-form'));

    let warehouse = {
        id : document.getElementById('update-warehouse-id').value,
        name : inputData.get('update-warehouse-name'),
        manager : inputData.get('update-warehouse-manager'),
        maxInv : inputData.get('update-warehouse-maxinv'),
        city  : {
            city: inputData.get('update-warehouse-city'),
            state : inputData.get('update-warehouse-state'),
            zip : inputData.get('update-warehouse-zip')
        }
    }

    fetch(URL + '/warehouse', {
        method : 'PUT',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(warehouse)
    })

    .then((data) => {
        return data.json();
    })

    .then((warehouseJson) => {
        updateWarehouseInTable(warehouseJson);

        document.getElementById('update-warehouse-form').reset();
        document.getElementById('new-warehouse-form').style.display = 'block';
        document.getElementById('update-warehouse-form').style.display = 'none';
        document.getElementById('delete-warehouse-form').style.display = 'none';
    })

    .catch((error) => {
        console.error(error);
    })
});

function updateWarehouseInTable (warehouse) {
    document.getElementById('TR' + warehouse.id).innerHTML =`
    <td>${warehouse.id}</td>
    <td>${warehouse.name}</td>
    <td>${warehouse.manager}</td>
    <td>${warehouse.maxInv}</td>
    <td>${warehouse.city.city + ", " + warehouse.city.state + ", " + warehouse.city.zip}</td>
    <td><button class="btn btn-primary" id="update-button" onclick="activateEditForm(${warehouse.id})">Edit</button></td>
    <td><button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${warehouse.id})">Delete</button></td>
    `

};

document.getElementById('delete-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let idOnForm = document.getElementById('delete-warehouse-id').value;
    let nameOnForm = document.getElementById('delete-warehouse-name').value;
    let managerOnForm = document.getElementById('delete-warehouse-manager').value;
    let maxInvOnForm = document.getElementById('delete-warehouse-maxinv').value;
    let cityOnForm = document.getElementById('delete-warehouse-city').value;
    let stateOnForm = document.getElementById('delete-warehouse-state').value;
    let zipOnForm = document.getElementById('delete-warehouse-zip').value;

    let warehouse = {
        id : idOnForm,
        name : nameOnForm,
        manager : managerOnForm,
        maxInv : maxInvOnForm,
        city : {
            city : cityOnForm,
            state : stateOnForm,
            zip : zipOnForm
        }
    };

    fetch(URL, {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(warehouse)
    })
    .then((data) => {

        if(data.status === 204) {
            removeWarehouseFromTable(warehouse);

            resetAllForms();
        }
    })
    .catch((error) => {
        console.error(error);
    })
});

function removeWarehouseFromTable(warehouse) {

    const element = document.getElementById('TR' + warehouse.id);
    element.remove();
};