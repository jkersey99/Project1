const URL = 'http://localhost:8080/warehouses'
const URLInv = 'http://localhost:8080/inventory'
const URLGame = 'http://localhost:8080/games'
let allWarehouses=[];                               // adds all warehouses
let allGames=[];                                    // adds all games per warehouse


// waits for the DOM to be loaded. New Warehouse listener won't work unless placed inside
document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();


    xhr.onreadystatechange = () => {

        // gets warehouse information from the database
        if(xhr.readyState === 4) {
            let warehouses = JSON.parse(xhr.responseText);

            warehouses.forEach(newWarehouse => {
                addWarehouseToTable(newWarehouse)
            });
        }
    };

    xhr.open('GET', URL);

    xhr.send();

    let xhr2 = new XMLHttpRequest();

    xhr2.onreadystatechange = () => {

        // gets game information from the database
        if(xhr2.readyState === 4) {
            let games = JSON.parse(xhr2.responseText);
            games.forEach(newGame => {
                allGames.push(newGame);
                
            });
        }
    };

    xhr2.open('GET', URLGame);

    xhr2.send();

// adds a new warehouse to the database
document.getElementById('new-warehouse-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-warehouse-form'));

    // assembles the warehouse object
    let newWarehouse = {

        name : inputData.get('new-warehouse-name'),
        manager : inputData.get('new-warehouse-manager'),
        maxInv : parseInt(inputData.get('new-warehouse-maxinv')),
        city  : {
            city: inputData.get('new-warehouse-city'),
            state : inputData.get('new-warehouse-state'),
            zip : inputData.get('new-warehouse-zip')
        }
    }

    // send the POST request to the database
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
        // takes the returned warehouse and adds it to the table
        addWarehouseToTable(warehouseJson);
        // sets all inventory totals to 0 for the new warehouse. Needed to keep accurate database calls.
        for(let i=0; i < allGames.length; i++) {
            doPostRequest(parseInt(allGames[i].id), parseInt(warehouseJson.id), 0);
        }
        document.getElementById('new-warehouse-form').reset();
    })
    .catch((error) => {
        console.error(error);
    })
    resetAllForms();
});

// enables the form to add a new warehouse when clicked
document.getElementById('new-warehouse-button').addEventListener("click", (event) => {

    event.preventDefault();

    document.getElementById('new-warehouse-form').reset();
    document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();

    document.getElementById('new-warehouse-form').style.display = 'block';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';

    document.getElementById('new-warehouse-button').style.display = 'none';
    document.getElementById('new-warehouse-cancel').style.display = 'block';
});

// cancels adding a new warehouse
document.getElementById('new-warehouse-cancel').addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';

    document.getElementById('new-warehouse-button').style.display = 'block';
    document.getElementById('new-warehouse-cancel').style.display = 'none';
});

// adds a new warehouse to the table
function addWarehouseToTable(newWarehouse) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let name = document.createElement('td');
    let manager = document.createElement('td');
    let currInv = document.createElement('td');
    let maxInv = document.createElement('td');  
    let city = document.createElement('td');  
    let editBtn = document.createElement('td');  
    let deleteBtn = document.createElement('td');

    id.innerText = newWarehouse.id;
    id.style.display = "none";                      // hides the id
    name.innerText = newWarehouse.name;
    manager.innerText= newWarehouse.manager;
    currInv.innerText = newWarehouse.currInv;
    currInv.style.textAlign="center";               // keeps numbers centered
    maxInv.innerText = newWarehouse.maxInv;
    maxInv.style.textAlign="center";                // keeps numbers centered
    city.innerText = newWarehouse.city.city + ', ' + newWarehouse.city.state + ', ' + newWarehouse.city.zip;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="update-button" onclick="activateEditForm(${newWarehouse.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newWarehouse.id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(manager);
    tr.appendChild(currInv);
    tr.appendChild(maxInv);
    tr.appendChild(city);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newWarehouse.id);

    document.getElementById('warehouse-table-body').appendChild(tr);

    // addes the warehouse to the list of warehouses
    allWarehouses.push(newWarehouse);
};

// cancels the warehouse update form
document.getElementById('update-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

// cancels the warehouse delete form
document.getElementById('delete-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

// resets the page back to how it initially loaded
function resetAllForms() {

    document.getElementById('new-warehouse-form').reset();
    document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';
    document.getElementById('game-table').style.visibility = 'hidden';
    document.getElementById('warehouse-table').style.display= 'block';
}

// updates warehouses to the database
document.getElementById('update-warehouse-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let inputData = new FormData(document.getElementById('update-warehouse-form'));

    // creates the warehouse object
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
    }           // sends a PUT request to the back end
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
                // updates the warehouse in the table and then resets the form
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
                resetAllForms();
});

// updates the table when warehouses are updated
function updateWarehouseInTable (warehouse) {
    document.getElementById('TR' + warehouse.id).innerHTML =`
    <td>${warehouse.name}</td>
    <td>${warehouse.manager}</td>
    <td style="text-align: center;">${warehouse.currInv}</td>
    <td style="text-align: center;">${warehouse.maxInv}</td>
    <td>${warehouse.city.city + ", " + warehouse.city.state + ", " + warehouse.city.zip}</td>
    <td><button class="btn btn-primary" id="update-button" onclick="activateEditForm(${warehouse.id})">Edit</button></td>
    <td><button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${warehouse.id})">Delete</button></td>
    `

};

// deletes a warehouse from the database
document.getElementById('delete-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let idOnForm = document.getElementById('delete-warehouse-id').value;
    let nameOnForm = document.getElementById('delete-warehouse-name').value;
    let managerOnForm = document.getElementById('delete-warehouse-manager').value;
    let currInvOnForm = document.getElementById('delete-warehouse-currinv').value;
    let maxInvOnForm = document.getElementById('delete-warehouse-maxinv').value;
    let cityOnForm = document.getElementById('delete-warehouse-city').value;
    let stateOnForm = document.getElementById('delete-warehouse-state').value;
    let zipOnForm = document.getElementById('delete-warehouse-zip').value;

    // creates the warehouse object
    let warehouse = {
        id : idOnForm,
        name : nameOnForm,
        manager : managerOnForm,
        currInv : currInvOnForm,
        maxInv : maxInvOnForm,
        city : {
            city : cityOnForm,
            state : stateOnForm,
            zip : zipOnForm
        }
    };
    console.log(warehouse);

    // sends the delete request to the back end
    fetch(URL+'/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(warehouse)
    })
    .then((data) => {
        if(data.status === 204) {
            // removes the warehouse from the table and resets the forms
            removeWarehouseFromTable(warehouse);
            resetAllForms();
        }
    })
    .catch((error) => {
        console.error(error);
    })
});

// removes a deleted warehouse from the table
function removeWarehouseFromTable(warehouse) {

    const element = document.getElementById('TR' + warehouse.id);
    element.remove();
};
});

// sends a PUT request to the junction table to update inventory
async function doPutRequest(gameId, wareId, quantity) {

    let returnedData = await fetch(URLInv + `?wareId=${wareId}&gameId=${gameId}&quantity=${quantity}`, {
        method : 'PUT',
    });
    let game = await returnedData.json();
}

// sends a POST request to the junction table to add new inventory
async function doPostRequest(gameId, wareId, quantity) {

    let returnedData = await fetch(URLInv + `?wareId=${wareId}&gameId=${gameId}&quantity=${quantity}`, {
        method : 'POST',
    });
    let game = await returnedData.json();
}

// enables the Update form when clicked
function activateEditForm(warehouseId) {

    for(let w of allWarehouses) {
        if(w.id === warehouseId) {
            document.getElementById('update-warehouse-id').value = w.id;
            document.getElementById('update-warehouse-name').value = w.name;
            document.getElementById('update-warehouse-manager').value = w.manager;
            document.getElementById('update-warehouse-currinv').value = w.currInv;
            document.getElementById('update-warehouse-maxinv').value = w.maxInv;
            document.getElementById('update-warehouse-city').value = w.city.city;
            document.getElementById('update-warehouse-state').value = w.city.state;
            document.getElementById('update-warehouse-zip').value = w.city.zip;
        }
    }

    // gets current inventory for the selected warehouse
    fetch(URLInv +`/warehouseinv?wareId=${warehouseId}`, {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
        } 
    })

    .then((data) => {
        return data.json();
    })
    
    // sorts the games by name instead of id number
    .then((invJson) => {
        let sortedJson = invJson.sort((g1, g2) => (g1.game.title > g2.game.title) ? 1 : (g1.game.title < g2.game.title) ? -1 : 0);
        // adds the games to the warehouse's individual table
        for (let i = 0; i < invJson.length; i++) {
            addGameToTable(sortedJson[i].game, sortedJson[i].quantity);
        }
        document.getElementById('warehouse-table').style.display='none';
        document.getElementById('game-table').style.visibility = 'visible';
        document.getElementById('new-warehouse-form').style.display = 'none';
        document.getElementById('update-warehouse-form').style.display = 'block';
        document.getElementById('delete-warehouse-form').style.display = 'none';  
    })
    .catch((error) => {
        console.error(error);
})   
}           // end of DOM Content Loader

// enables the warehouse delete form
function activateDeleteForm(warehouseId) {

    for(let w of allWarehouses) {
        if(w.id === warehouseId) {
            document.getElementById('delete-warehouse-id').value = w.id;
            document.getElementById('delete-warehouse-name').value = w.name;
            document.getElementById('delete-warehouse-manager').value = w.manager;
            document.getElementById('delete-warehouse-currinv').value = w.currInv;
            document.getElementById('delete-warehouse-maxinv').value = w.maxInv;
            document.getElementById('delete-warehouse-city').value = w.city.city;
            document.getElementById('delete-warehouse-state').value = w.city.state;
            document.getElementById('delete-warehouse-zip').value = w.city.zip;
        }
    }
    // gets currently inventory for the selected warehouse
    fetch(URLInv +`/warehouseinv?wareId=${warehouseId}`, {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
        } 
    })

    .then((data) => {
        return data.json();
    })
    // sorts the games by name instead of id number
    .then((invJson) => {
        let sortedJson = invJson.sort((g1, g2) => (g1.game.title > g2.game.title) ? 1 : (g1.game.title < g2.game.title) ? -1 : 0);
        for (let i = 0; i < invJson.length; i++) {
            // adds the games to the warehouse's individual table
            addGameToTable(sortedJson[i].game, sortedJson[i].quantity);
        }
        document.getElementById('warehouse-table').style.display='none';
        document.getElementById('game-table').style.visibility = 'visible';
        document.getElementById('new-warehouse-form').style.display = 'none';
        document.getElementById('update-warehouse-form').style.display = 'none';
        document.getElementById('delete-warehouse-form').style.display = 'block';
    })
    .catch((error) => {
        console.error(error);
})
}

// adds a game to the warehouse's individual table
function addGameToTable(newGame, quantity) {
    let gameTr = document.createElement('tr');
    let gameId = document.createElement('td');
    let gameTitle = document.createElement('td');
    let platform = document.createElement('td');
    let releaseDate = document.createElement('td');  
    let quant = document.createElement('td');  

    gameId.innerText = newGame.id;
    gameId.style.display = "none";
    gameTitle.innerText = newGame.title;
    platform.innerText= newGame.platform;
    releaseDate.innerText = newGame.releaseDate;
    quant.innerText = quantity;
    quant.style.textAlign="center";

    gameTr.appendChild(gameId);
    gameTr.appendChild(gameTitle);
    gameTr.appendChild(platform);
    gameTr.appendChild(releaseDate);
    gameTr.appendChild(quant);

    gameTr.setAttribute('id', 'TR' + newGame.id);

    document.getElementById('game-table-body').appendChild(gameTr);
};
