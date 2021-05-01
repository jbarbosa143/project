const playerPokemon = document.querySelector('.userPoke');
const uKey = document.querySelector('.key');
const pSub = document.querySelector(".uPSub");
const themeSong = new Audio('sounds/Pokemon-Theme-Song.mp3');
const pika = new Audio('sounds/19.mp3');



pSub.addEventListener('click', function(){
    // console.log('i was clicked')
    const URL = ` https://pokeapi.co/api/v2/pokemon/${playerPokemon.value}`
    
    pika.play();

    fetch(URL)
    
    .then((res) => res.json())
    
    .then((json) =>{
        const displayLeft = document.querySelector('.left')
        
        // console.log(json)
        
        fetch(`${json.types[0].type.url}`)
        
        .then((res)=> res.json())
        
        .then((dmg)=>{
            // console.log(dmg)
            // console.log(dmg.damage_relations.double_damage_to[0].name)
            // let leftHtml = `<div class="leftPokemon">
            // <h1>Name : ${json.name} </h1>
            // <img src="${json.sprites.front_default}" alt=""></img>
            // <h2>Type : ${json.types[0].type.name}</h2>
            // <h2>Weak Against : ${dmg.damage_relations.double_damage_from[0].name}</h2>
            // <h2>Strong Against : ${dmg.damage_relations.double_damage_to[0].name} </h2>
            
            // </div>`
            // displayLeft.innerHTML += leftHtml;
            
        })
    })
})

// ----- Main right side=============================
const ePokemon = document.querySelector('.enemyPoke');
const ePSub = document.querySelector('.ePSub');


ePSub.addEventListener('click', function(){
    // console.log('i was clicked')
    const URL = ` https://pokeapi.co/api/v2/pokemon/${ePokemon.value}`

    pika.play();
    
    fetch(URL)
    
    .then((res) => res.json())
    
    .then((json) =>{
        const displayRight = document.querySelector('.right')
        
        // console.log(json)
        
        fetch(`${json.types[0].type.url}`)
        
        .then((res)=> res.json())
        
        .then((dmg)=>{
            // console.log(dmg)
            // console.log(dmg.damage_relations.double_damage_to[0].name)
            let rightHtml = `<div class="rightPokemon">
            <h1>Name : ${json.name} </h1>
            <img src="${json.sprites.front_default}" alt=""></img>
            <h2>Type : ${json.types[0].type.name}</h2>
            <h2>Weak Against : ${dmg.damage_relations.double_damage_from[0].name}</h2>
            <h2>Strong Against : ${dmg.damage_relations.double_damage_to[0].name} </h2>
            
            </div>`
            displayRight.innerHTML = rightHtml;
        })
    })
})

// =======Center=================================
const apiSub = document.querySelector('.keySub');
const key = document.querySelector('.apiKey');
const pokem = document.querySelector('.pokem');
const info = document.querySelector('.addinfo');
let pokeId = 0;
let normArr = [];
let randArr=[];
let normMoves =[];
let ranMoves = [];
let normalMove = [];
let chargedMove = [];
let reqCandy = 0;
let evoInto = "";

apiSub.addEventListener('click', function(){
    const evoURL =  `https://pokemon-go1.p.rapidapi.com/pokemon_evolutions.json?rapidapi-key=${key.value}`;
    const evoEncoded = encodeURI(evoURL);
    
    fetch(evoEncoded)
    
    .then((res) => res.json())
    
    .then((evo) =>{
        // console.log(evo)
        for(const stage of evo){
            for(let i = 0; i < stage.evolutions.length; i ++){
                if(stage.evolutions[i].form === "Normal"){
                    normArr.push(stage.evolutions[i])
                }
                else{
                    randArr.push(stage.evolutions[i])
                }
            }
            
        }
        normalTypePokemonMovesArr();
        candyToEvolve();
        console.log('Normal M',normalMove,'Charge M',chargedMove)
        let moveHTML = `<div class="moves">
        <h3>Pokemons Avalible Attacks</h3>
        <ul>
        
        <ol><span id="att">Fast Attacks</span></li>
        <br>
        <li>${normalMove}</li>
        <br>
        <ol><span id="att">Charged Attacks</span></li>
        <br>
        <li>${chargedMove}</li>
        <br>
        </ul>
        </div>
        <div class="candys">
        <h3>Required Candies To Evolve <span id="pokemonName"></span></h3>
        <h3 id="howMany">${reqCandy}</h3>
        </div>`
        info.innerHTML += moveHTML;
        console.log('Normal M',normalMove,'Charge M',chargedMove)
    })
})


function normalTypePokemonMovesArr(){
    const pokeMovesURL = `https://pokemon-go1.p.rapidapi.com/current_pokemon_moves.json?rapidapi-key=${key.value}`;
    const movesEncoded = encodeURI(pokeMovesURL)
    
    
    fetch(movesEncoded)
    
    .then((res) => res.json())
    
    .then((moves)=>{
        // for(const move of moves){
        for(const move of Object.values(moves)){
            if(move.form === "Normal"){
                normMoves.push(move)
            }
            else{
                ranMoves.push(move)
            }
            // console.log(normMoves)
        }
        for(const move of normMoves){
            if(pokem.value === move.pokemon_name){
                normalMove = move.fast_moves;
                chargedMove = move.charged_moves;
            }
            // console.log(move)
        }
        console.log('Normal Move',normalMove,'charged Move',chargedMove)
    })
}
normalTypePokemonMovesArr();

function candyToEvolve(){
    for(const norm of normArr){
        // console.log(normArr)
        if(pokem.value === norm.pokemon_name){
            reqCandy = norm.candy_required;
            // evolveForm = norm.pokemon_name;
        } 
        // console.log(norm)
    }
    console.log(reqCandy)
}
candyToEvolve();