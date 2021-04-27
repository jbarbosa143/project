const playerPokemon = document.querySelector('.userPoke');
const uKey = document.querySelector('.key');
const pSub = document.querySelector(".uPSub");

pSub.addEventListener('click', function(){
    // console.log('i was clicked')
    const URL = ` https://pokeapi.co/api/v2/pokemon/${playerPokemon.value}`
    
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
            let leftHtml = `<div class="leftPokemon">
            <h1>Name : ${json.name} </h1>
            <img src="${json.sprites.front_default}" alt=""></img>
            <h2>Type : ${json.types[0].type.name}</h2>
            <h2>Weak Against : ${dmg.damage_relations.double_damage_from[0].name}</h2>
            <h2>Strong Against : ${dmg.damage_relations.double_damage_to[0].name} </h2>
            
        </div>`
        displayLeft.innerHTML += leftHtml;
        
        })
    })
})

// ----- Main right side=============================
const ePokemon = document.querySelector('.enemyPoke');
const ePSub = document.querySelector('.ePSub');


ePSub.addEventListener('click', function(){
    // console.log('i was clicked')
    const URL = ` https://pokeapi.co/api/v2/pokemon/${ePokemon.value}`
    
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
let pokeId = 0;

apiSub.addEventListener('click', function(){
console.log('CLick ME HARD! DADDY UWU')

const poGoURL = `https://pokemon-go1.p.rapidapi.com/pokemon_types.json?rapidapi-key=${key.value}`;
console.log(pokem.value)
const encodedPoGo = encodeURI(poGoURL)
fetch(encodedPoGo)

.then((res)=> res.json())

.then((poGo)=>{
    
    
    for(const pokemon of poGo){
        if(pokem.value === pokemon.pokemon_name){
            pokeId = pokemon.pokemon_id
            console.log('Id is :',pokeId)
        }
        
    }
})
})