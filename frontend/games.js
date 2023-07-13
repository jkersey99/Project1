const URL = 'http://localhost:8080/games'
const URLInv = 'http://localhost:8080/inventory'
const URLWare = 'http://localhost:8080/warehouses'
let allGames=[];
let allWarehouses=[];
let allInv=[];


document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();
    


    xhr.onreadystatechange = () => {

        if(xhr.readyState === 4) {
            let games = JSON.parse(xhr.responseText);

            games.forEach(newGame => {
                addGameToTable(newGame);
            });
        }
    };

    xhr.open('GET', URL);

    xhr.send();

    let xhr2 = new XMLHttpRequest();

    xhr2.onreadystatechange = () => {

        if(xhr2.readyState === 4) {
            let warehouses = JSON.parse(xhr2.responseText);
            let count = 1;
            warehouses.forEach(newWarehouse => {
                allWarehouses.push(newWarehouse);
                let newDiv = document.createElement("div");
                let newInput = document.createElement("input");
                let newLabel = document.createElement("label");
                let newNode = document.createTextNode(`Warehouse ${count}`);
                newDiv.class = "form-group";               
                newInput.type="number";
                newInput.className = "form-control";
                newInput.id=`new-warehouse${count}`;
                newInput.name= `new-warehouse${count}`;
                newInput.defaultValue=0
                newLabel.appendChild(newNode);
                newDiv.appendChild(newLabel);
                newDiv.appendChild(newInput);
                document.getElementById('new-game-form').appendChild(newDiv);
                let updateDiv = document.createElement("div");
                let updateInput = document.createElement("input");
                let updateLabel = document.createElement("label");
                let updateNode = document.createTextNode(`Warehouse ${count}`);
                updateDiv.class = "form-group";               
                updateInput.type="number";
                updateInput.className = "form-control";
                updateInput.id=`update-warehouse${count}`;
                updateInput.name= `update-warehouse${count}`;
                updateLabel.appendChild(updateNode);
                updateDiv.appendChild(updateLabel);
                updateDiv.appendChild(updateInput);
                document.getElementById('update-game-form').appendChild(updateDiv);
                let deleteDiv = document.createElement("div");
                let deleteInput = document.createElement("input");
                let deleteLabel = document.createElement("label");
                let deleteNode = document.createTextNode(`Warehouse ${count}`);
                deleteDiv.class = "form-group";               
                deleteInput.type="number";
                deleteInput.className = "form-control";
                deleteInput.id=`delete-warehouse${count}`;
                deleteInput.name= `delete-warehouse${count}`;
                deleteInput.defaultValue=0
                deleteInput.setAttribute("disabled", true);
                deleteLabel.appendChild(deleteNode);
                deleteDiv.appendChild(deleteLabel);
                deleteDiv.appendChild(deleteInput);
                document.getElementById('delete-game-form').appendChild(deleteDiv);
             
                count++;    
            });
            
            
        }
    };

    xhr2.open('GET', URLWare);

    xhr2.send();
    

});



document.getElementById('new-game-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-game-form'));

    let newGame = {

        title : inputData.get('new-game-title'),
        platform : inputData.get('new-game-platform'),
        publisher : inputData.get('new-game-publisher'),
        releaseDate: inputData.get('new-game-releaseDate'),
        genre : inputData.get('new-game-genre'),
        description : inputData.get('new-game-description'),
        price : inputData.get('new-game-price')
    }

    fetch(URL, {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(newGame)
    })

    .then((data) => {
        return data.json();
    })

    .then((gameJson) => {
        addGameToTable(gameJson);

        document.getElementById('new-game-form').reset();
    })

    .catch((error) => {
        console.error(error);
    })
    resetAllForms();
});

function addGameToTable(newGame) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let title = document.createElement('td');
    let platform = document.createElement('td');
    let publisher = document.createElement('td');  
    let releaseDate = document.createElement('td'); 
    let genre = document.createElement('td');
    let description = document.createElement('td');
    let price = document.createElement('td');   
    let editBtn = document.createElement('td');  
    let deleteBtn = document.createElement('td');

    id.innerText = newGame.id;
    title.innerText = newGame.title;
    platform.innerText= newGame.platform;
    publisher.innerText = newGame.publisher;
    releaseDate.innerText = newGame.releaseDate; 
    genre.innerText = newGame.genre;
    description.innerText = newGame.description;
    price.innerText = newGame.price;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="update-button" onclick="activateEditForm(${newGame.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newGame.id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(platform);
    tr.appendChild(publisher);
    tr.appendChild(releaseDate);
    tr.appendChild(genre);
    tr.appendChild(description);
    tr.appendChild(price);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newGame.id);

    document.getElementById('game-table-body').appendChild(tr);

    allGames.push(newGame);
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

    document.getElementById('new-game-form').reset();
    document.getElementById('update-game-form').reset();
    document.getElementById('delete-game-form').reset();

    document.getElementById('new-game-form').style.display = 'block';
    document.getElementById('update-game-form').style.display = 'none';
    document.getElementById('delete-game-form').style.display = 'none';
}


function activateEditForm(gameId) {
    allInv=[];

    for(let g of allGames) {
        if(g.id === gameId) {
            document.getElementById('update-game-id').value = g.id;
            document.getElementById('update-game-title').value = g.title;
            document.getElementById('update-game-platform').value = g.platform;
            document.getElementById('update-game-publisher').value = g.publisher;
            document.getElementById('update-game-releaseDate').value = g.releaseDate;
            document.getElementById('update-game-genre').value = g.genre;
            document.getElementById('update-game-description').value = g.description;
            document.getElementById('update-game-price').value = g.price;
            document.getElementById('update-game-picture').src = g.image;

            fetch(URLInv +`/gameinv?gameId=${gameId}`, {
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                } 
            })
        
            .then((data) => {
                return data.json();
            })
        
            .then((invJson) => {
                allInv.push(invJson)
                for(let i = 0; i < invJson.length; i++) {
                    document.getElementById(`update-warehouse${i+1}`).value = 0;

                 
                    document.getElementById(`update-warehouse${i+1}`).value = invJson[i].quantity;
                    
                    
                }

            })
        
            .catch((error) => {
                console.error(error);
        })
    }}

    document.getElementById('new-game-form').style.display = 'none';
    document.getElementById('update-game-form').style.display = 'block';
    document.getElementById('delete-game-form').style.display = 'none';
    
}

function activateDeleteForm(gameId) {
    allInv=[];

    for(let g of allGames) {
        if(g.id === gameId) {
            document.getElementById('delete-game-id').value = g.id;
            document.getElementById('delete-game-title').value = g.title;
            document.getElementById('delete-game-platform').value = g.platform;
            document.getElementById('delete-game-publisher').value = g.publisher;
            document.getElementById('delete-game-releaseDate').value = g.releaseDate;
            document.getElementById('delete-game-genre').value = g.genre;
            document.getElementById('delete-game-description').value = g.description;
            document.getElementById('delete-game-price').value = g.price;
            document.getElementById('delete-game-picture').src = g.image;

            fetch(URLInv +`/gameinv?gameId=${gameId}`, {
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                } 
            })
        
            .then((data) => {
                return data.json();
            })
        
            .then((invJson) => {
                allInv.push(invJson)
                for(let i = 0; i < invJson.length; i++) {             
                    document.getElementById(`delete-warehouse${i+1}`).value = invJson[i].quantity;
                    
                    
                }

            })
        
            .catch((error) => {
                console.error(error);
        })
        }
    }

    document.getElementById('new-game-form').style.display = 'none';
    document.getElementById('update-game-form').style.display = 'none';
    document.getElementById('delete-game-form').style.display = 'block';
}

/**document.getElementById('update-game-form').addEventListener('submit', (event) => {

    event.preventDefault();


    let inputData = new FormData(document.getElementById('update-game-form'));

    let game = {
        id : document.getElementById('update-game-id').value,
        title : inputData.get('update-game-title'),
        platform : inputData.get('update-game-platform'),
        publisher : inputData.get('update-game-publisher'),
        releaseDate: inputData.get('update-game-releaseDate'),
        genre : inputData.get('update-game-genre'),
        description : inputData.get('update-game-description'),
        price : inputData.get('update-game-price')
        
    }
    let j = 1;
        for(let i = 1; i < allWarehouses.length +1; i++) {
            doInvRequest(game.id, i, parseInt(document.getElementById(`update-warehouse${i}`).value));
            j++;
        }
        

    fetch(URL + '/game', {
        method : 'PUT',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(game)
    })

    .then((data) => {
        return data.json();
    })

    .then((gameJson) => {
        updateGameInTable(gameJson);

        document.getElementById('update-game-form').reset();
        document.getElementById('new-game-form').style.display = 'block';
        document.getElementById('update-game-form').style.display = 'none';
        document.getElementById('delete-game-form').style.display = 'none';
    })

    .catch((error) => {
        console.error(error);
    })

    resetAllForms();
    


}); */

async function doInvRequest(gameId, wareId, quantity) {

    let returnedData = await fetch(URLInv + `?wareId=${wareId}&gameId=${gameId}&quantity=${quantity}`, {
        method : 'PUT'
    });
    let game = await returnedData.json();
}

async function doInvPostRequest(gameId, wareId, quantity) {

    let returnedData = await fetch(URLInv + `?wareId=${wareId}&gameId=${gameId}&quantity=${quantity}`, {
        method : 'POST'
    });
    let game = await returnedData.json();
}

async function doWareRequest(warehouse) {

    let returnedData = await fetch(URLWare + `/warehouse`, {
        method : 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(warehouse)
    });
    let warehouseData = await returnedData.json();
}







function updateGameInTable (game) {
    document.getElementById('TR' + game.id).innerHTML =`
    <td>${game.id}</td>
    <td>${game.title}</td>
    <td>${game.platform}</td>
    <td>${game.publisher}</td>
    <td>${game.releaseDate}</td>
    <td>${game.genre}</td>
    <td>${game.description}</td>
    <td>${game.price}</td>
    <td><button class="btn btn-primary" id="update-button" onclick="activateEditForm(${game.id})">Edit</button></td>
    <td><button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${game.id})">Delete</button></td>`

    for(let g of allGames) {
        if(g.id === game.id) {
            let i = allGames.indexOf(g);
            allGames[i] = game;
        }
    }

};

document.getElementById('delete-game-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let idOnForm = document.getElementById('delete-game-id').value;
    let titleOnForm = document.getElementById('delete-game-title').value;
    let platformOnForm = document.getElementById('delete-game-platform').value;
    let publisherOnForm = document.getElementById('delete-game-publisher').value;
    let releaseDateOnForm = document.getElementById('delete-game-releaseDate').value;
    let genreOnForm = document.getElementById('delete-game-genre').value;
    let descriptionOnForm = document.getElementById('delete-game-description').value;
    let priceOnForm = document.getElementById('delete-game-price').value;
    let imageOnForm = document.getElementById('delete-game-picture').src;

    let game = {
        id : idOnForm,
        title : titleOnForm,
        platform : platformOnForm,
        publisher : publisherOnForm,
        releaseDate : releaseDateOnForm,
        genre : genreOnForm,
        description : descriptionOnForm,
        price : priceOnForm,
        image : imageOnForm
    };
    console.log(game);

    fetch(URL + '/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(game)
    })
    .then((data) => {
        return data;
    })
    .then(() => {

    })
    .catch((error) => {
        console.error(error);
    })

    for (let i = 0; i < allWarehouses.length; i++){
        console.log(allWarehouses[i].currInv);
        console.log(parseInt(document.getElementById(`delete-warehouse${i+1}`).value))
        allWarehouses[i].currInv -= parseInt(document.getElementById(`delete-warehouse${i+1}`).value);
        console.log(allWarehouses[i].currInv);
        doWareRequest(allWarehouses[i])
    }
    removeGameFromTable(game);

    resetAllForms();



});

function removeGameFromTable(game) {

    const element = document.getElementById('TR' + game.id);
    element.remove();
};

$(document).ready(function(){
    $("#save-button").click(function(event) {
        event.preventDefault();
    
        var gameTitle = document.getElementById('new-game-title').value
        var api = '?format=jsonp&api_key=da0a26a3994cb8bd2bc52f6fe82255ae874430bd';
        var gameURL

        $.ajax ({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: `http://www.giantbomb.com/api/search/` + api + `&query=${gameTitle}&resources=game`,
            complete: function() {
            },
            success: function(giantData) {
                gameURL = giantData.results[0].api_detail_url + api;
                $.ajax ({
                    type: 'GET',
                    dataType: 'jsonp',
                    crossDomain: true,
                    jsonp: 'json_callback',
                    url: gameURL,
                    complete: function() {
                    },
                    success: function(giantData2) {
        
        
        
                        
                        let inputData = new FormData(document.getElementById('new-game-form'));
        
                        let game = {
                            title : gameTitle,
                            price : inputData.get('new-game-price'),
                            image : giantData2.results.image.small_url
                            
                        }

                        if (document.getElementById('new-game-platform').value !== "") {
                            game.platform = document.getElementById('new-game-platform').value
                        }
                        else {
                            game.platform = giantData2.results.platforms[0].name
                        }
                        if (document.getElementById('new-game-publisher').value !== "") {
                            game.publisher = document.getElementById('new-game-publisher').value
                        }
                        else {
                            game.publisher = giantData2.results.publishers[0].name
                        }
                        if (document.getElementById('new-game-releaseDate').value !== "") {
                            game.releaseDate = document.getElementById('new-game-releaseDate').value
                        }
                        else {
                            game.releaseDate = giantData2.results.original_release_date
                        }
                        if (document.getElementById('new-game-genre').value !== "") {
                            game.genre = document.getElementById('new-game-genre').value
                        }
                        else {
                            game.genre = giantData2.results.genres[0].name
                        }
                        if (document.getElementById('new-game-description').value !== "") {
                            game.description = document.getElementById('new-game-description').value
                        }
                        else {
                            game.description = giantData2.results.deck
                        };
         
                            fetch(URL + '/game', {
                                method : 'PUT',
                                headers : {
                                    "Content-Type" : "application/json",
                                },
                                body : JSON.stringify(game)
                            })
                        
                            .then((data) => {
                                return data.json();
                                wait
                            })
                        
                            .then((gameJson) => {
                                addGameToTable(gameJson);
                                let overInv = false;
                                let total = 0;
                                for(let i = 0; i < allWarehouses.length; i++) {
                                        total = parseInt(document.getElementById(`new-warehouse${i+1}`).value) + allWarehouses[i].currInv;
                                        console.log(parseInt(document.getElementById(`new-warehouse${i+1}`).value))
                                        console.log(allWarehouses[i].currInv)
                                        if (allWarehouses[i].maxInv < total) {
                                            overInv = true;
                                            window.alert("You are over Warehouse " + (i+1) + "'s maximum capacity by " + (total - allWarehouses[i].maxInv) + ". Please adjust your numbers and try again.")
                                        }

                                }
                                total=0
                                if (!overInv) {
                                    for(let i = 0; i < allWarehouses.length; i++) {
                                        total = parseInt(document.getElementById(`new-warehouse${i+1}`).value) + allWarehouses[i].currInv;  
                                        doInvPostRequest(gameJson.id, (i+1), parseInt(document.getElementById(`new-warehouse${i+1}`).value));
                                        allWarehouses[i].currInv = total;
                                        console.log(allWarehouses[i].currInv)
                                        doWareRequest(allWarehouses[i]);    
                                    }
                                }
                        
                                document.getElementById('new-game-form').reset();
                            })
                        
                            .catch((error) => {
                                console.error(error);
                            })
                        
                    }                   
                })          
            }
        })              
        })
      

});





$(document).ready(function(){
    $("#update-button").click(function(event) {
        event.preventDefault();
    
        var gameTitle = document.getElementById('update-game-title').value
        var api = '?format=jsonp&api_key=da0a26a3994cb8bd2bc52f6fe82255ae874430bd';
        var gameURL

        $.ajax ({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: `http://www.giantbomb.com/api/search/` + api + `&query=${gameTitle}&resources=game`,
            complete: function() {
            },
            success: function(giantData) {
                gameURL = giantData.results[0].api_detail_url + api;
                $.ajax ({
                    type: 'GET',
                    dataType: 'jsonp',
                    crossDomain: true,
                    jsonp: 'json_callback',
                    url: gameURL,
                    complete: function() {
                    },
                    success: function(giantData2) {
        
        
        
                        
                        let inputData = new FormData(document.getElementById('update-game-form'));
        
                        let game = {
                            id : document.getElementById('update-game-id').value,
                            title : gameTitle,
                            price : inputData.get('update-game-price'),
                            image : giantData2.results.image.small_url
                            
                        }

                        if (document.getElementById('update-game-platform').value !== "") {
                            game.platform = document.getElementById('update-game-platform').value
                        }
                        else {
                            game.platform = giantData2.results.platforms[0].name
                        }
                        if (document.getElementById('update-game-publisher').value !== "") {
                            game.publisher = document.getElementById('update-game-publisher').value
                        }
                        else {
                            game.publisher = giantData2.results.publishers[0].name
                        }
                        if (document.getElementById('update-game-releaseDate').value !== "") {
                            game.releaseDate = document.getElementById('update-game-releaseDate').value
                        }
                        else {
                            game.releaseDate = giantData2.results.original_release_date
                        }
                        if (document.getElementById('update-game-genre').value !== "") {
                            game.genre = document.getElementById('update-game-genre').value
                        }
                        else {
                            game.genre = giantData2.results.genres[0].name
                        }
                        if (document.getElementById('update-game-description').value !== "") {
                            game.description = document.getElementById('update-game-description').value
                        }
                        else {
                            game.description = giantData2.results.deck
                        };
                        let overInv = false;
                        let total = 0;
                        for(let i = 0; i < allWarehouses.length; i++) {
                            if (parseInt(document.getElementById(`update-warehouse${i+1}`).value) > allInv[0][i].quantity) {
                                total = parseInt(document.getElementById(`update-warehouse${i+1}`).value) + allWarehouses[i].currInv - allInv[0][i].quantity; 
                                if (allWarehouses[i].maxInv < total) {
                                    overInv = true;
                                    window.alert("You are over Warehouse " + (i+1) + "'s maximum capacity by " + (total - allWarehouses[i].maxInv) + ". Please adjust your numbers and try again.")
                                }
                                
                            }
                            
                        }
                        total = 0;
                        if (!overInv) {
                            for(let i = 0; i < allWarehouses.length; i++) {  
                                total = parseInt(document.getElementById(`update-warehouse${i+1}`).value) + allWarehouses[i].currInv - allInv[0][i].quantity;
                                doInvRequest(game.id, (i+1), parseInt(document.getElementById(`update-warehouse${i+1}`).value));
                                allWarehouses[i].currInv = total;
                                doWareRequest(allWarehouses[i]);
                                allInv[0][i].quantity = document.getElementById(`update-warehouse${i+1}`).value;

                                
                            }

                            

                            fetch(URL + '/game', {
                                method : 'PUT',
                                headers : {
                                    "Content-Type" : "application/json",
                                },
                                body : JSON.stringify(game)
                            })
                        
                            .then((data) => {
                                return data.json();
                                wait
                            })
                        
                            .then((gameJson) => {
                                updateGameInTable(gameJson);
                        
                                document.getElementById('update-game-form').reset();
                                document.getElementById('new-game-form').style.display = 'block';
                                document.getElementById('update-game-form').style.display = 'none';
                                document.getElementById('delete-game-form').style.display = 'none';
                            })
                        
                            .catch((error) => {
                                console.error(error);
                            })
                        }
                    }                   
                })          
            }
        })              
        })
      

});
