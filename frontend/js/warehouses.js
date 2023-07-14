const URL = 'http://localhost:8080/warehouses'
const URLInv = 'http://localhost:8080/inventory'
const URLGame = 'http://localhost:8080/games'
let allWarehouses=[];
let allGames=[];


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

    let xhr2 = new XMLHttpRequest();

    xhr2.onreadystatechange = () => {

        if(xhr2.readyState === 4) {
            let games = JSON.parse(xhr2.responseText);
            games.forEach(newGame => {
                allGames.push(newGame);
                
            });
        }
    };

    xhr2.open('GET', URLGame);

    xhr2.send();


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

document.getElementById('new-warehouse-cancel').addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';

    document.getElementById('new-warehouse-button').style.display = 'block';
    document.getElementById('new-warehouse-cancel').style.display = 'none';
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
    id.style.display = "none";
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

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none';
    document.getElementById('game-table').style.visibility = 'hidden';
    document.getElementById('warehouse-table').style.display= 'block';
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

    let wareQuant = 0;
        let overInv = false;
        for(let i = 1; i < allGames.length +1; i++) {
            wareQuant += parseInt(document.getElementById(`update-game${i}`).value);
            if (wareQuant > warehouse.maxInv) {
                overInv = true;
            }
    warehouse.currInv = wareQuant;
            
        }
        if (overInv) {
            window.alert("You are over this warehouse's maximum capacity by " + (wareQuant - warehouse.maxInv) + ". Please adjust your numbers and try again.")
        }
        else {
            for(let i = 1; i < allGames.length +1; i++) {
                
                doPutRequest(i, warehouse.id, parseInt(document.getElementById(`update-game${i}`).value));

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
                
            }
        }   
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

async function doPutRequest(gameId, wareId, quantity) {

    let returnedData = await fetch(URLInv + `?wareId=${wareId}&gameId=${gameId}&quantity=${quantity}`, {
        method : 'PUT',
    });
    let game = await returnedData.json();
    console.log(game);
}
});

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

    fetch(URLInv +`/warehouseinv?wareId=${warehouseId}`, {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
        } 
    })

    .then((data) => {
        return data.json();
    })
    
    .then((invJson) => {
        let sortedJson = invJson.sort((g1, g2) => (g1.game.title > g2.game.title) ? 1 : (g1.game.title < g2.game.title) ? -1 : 0);
        for (let i = 0; i < invJson.length; i++) {
            console.log(invJson);
            
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

    fetch(URLInv +`/warehouseinv?wareId=${warehouseId}`, {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
        } 
    })

    .then((data) => {
        return data.json();
    })
    
    .then((invJson) => {
        let sortedJson = invJson.sort((g1, g2) => (g1.game.title > g2.game.title) ? 1 : (g1.game.title < g2.game.title) ? -1 : 0);
        for (let i = 0; i < invJson.length; i++) {
            console.log(invJson);
            
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

function addGameToTable(newGame, quantity) {
    let gameTr = document.createElement('tr');
    let gameId = document.createElement('td');
    let gameTitle = document.createElement('td');
    let platform = document.createElement('td');
    let releaseDate = document.createElement('td');  
    let quant = document.createElement('td');  
    let editBtn = document.createElement('td');  
    let deleteBtn = document.createElement('td');

    

    gameId.innerText = newGame.id;
    gameId.style.display = "none";
    gameTitle.innerText = newGame.title;
    platform.innerText= newGame.platform;
    releaseDate.innerText = newGame.releaseDate;
    quant.innerHTML = `<input id="${newGame.id}-quant" name="${newGame.id}-quant" type="text" class="form-control" value="${quantity}disabled/>`
    quant.innerText = quantity;
    deleteBtn.style.display = "none";

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="${newGame.id}-quant-button" onclick="quantEditButton(${newGame.id})">Edit</button><button class="btn btn-primary" id="${newGame.id}-cancel-button" onclick="activateCancelButton(${newGame.id})" style="display:none;">Cancel</button>`;

    gameTr.appendChild(gameId);
    gameTr.appendChild(gameTitle);
    gameTr.appendChild(platform);
    gameTr.appendChild(releaseDate);
    gameTr.appendChild(quant);
    gameTr.appendChild(editBtn);
    gameTr.appendChild(deleteBtn);

    gameTr.setAttribute('id', 'TR' + newGame.id);

    document.getElementById('game-table-body').appendChild(gameTr);
};

function quantEditButton (gameId) {
    document.getElementById(`${gameId}-quant`).setAttribute("disabled", false);
    document.getElementById(`${gameId}-quant-button`).style.display="none";
    document.getElementById(`${gameId}-cancel-button`).style.visibility="visible";
}

function activateCancelButton(gameId) {

}