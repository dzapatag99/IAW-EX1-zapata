import { Authors } from "./Authors.js";

let aDavid = new Authors("43478020Q", "David", "Zapata", "26/07/1999", "Administrator");

const containerTravels = document.querySelector("#container-travels");
let travelsJSON = [];
let authorsList = [aDavid];

console.log(aDavid.render())

document.addEventListener("DOMContentLoaded", () => {
    getTravels();
    populateAuthors();
    addLocalData();
    
});

function getTravels() {
    fetch('data/travels.json')
        .then(result => result.json())
        .then(data => {
            travelsJSON = data;
            populateTravelsHTML(travelsJSON);
            console.log(travelsJSON)
        });
}

function populateTravelsHTML(travelsJSON) {
    travelsJSON.forEach(travel => {
        // Generate card question
        containerTravels.innerHTML +=
            `<article class="entrada">
            <h2><img id="post-1" class="favorite" src="img/favorite-off-icon.png" alt="marcar como favorita" />${travel.title}</h2>
            <img src="${travel.img}" alt="Imagen Viaje a Londres">
            <p>${travel.description}</p>
            <a href="#" class="boton">Leer Más</a>
          </article>`;
    });
}

const btnAddAuthor = document.querySelector("#btnUser")
btnAddAuthor.addEventListener("click", ()=> {

    addLocalData();
    validateData();

    let author = new Authors(
        document.querySelector("#NIF").value,
        document.querySelector("#name").value,
        document.querySelector("#surname").value,
        document.querySelector("#dobirth").value,
        document.querySelector("#role").value
    );

    authorsList.push(author);
    populateAuthors();
});

function validateData() {
    const valuesForm = document.querySelector(".form-val").value;
    let nifInput = document.querySelector("#NIF").value;
    let nameInput =  document.querySelector("#name").value;
    let surnameInput =  document.querySelector("#surname").value;
    let dobirthInput =  document.querySelector("#dobirth").value;
    let roleInput =  document.querySelector("#role").value;

    const expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
    const expresion_regular_name = /[a-z]/;
    const contNIF = document.querySelector("#container-errors-dni")
    const contName = document.querySelector("#container-errors-name")
    if (valuesForm === "") {
        alert("Todos los valores son obligatorios");
        return false;
    }
    if (nifInput.match(expresion_regular_dni)){
        return true;
    }else{
        contNIF.innerHTML+=`
        <span>El DNI no es correcto</span>
        `
    }

    if (nameInput.match(expresion_regular_name)){
        return true;
    }else{
        contName.innerHTML+=
        `
        <span>El nombre no es correcto</span>
        `
    }
}



function populateAuthors(){

    const listTag = document.querySelector("#list");
    listTag.innerHTML="";

    authorsList.forEach(aut =>{
        listTag.innerHTML+=
        `
        <p> 

        <span>#${aut.nif}</span>
        <span>${aut.name}</span>
        <span>${aut.surname}</span>
        <span>${aut.dobirth}</span>
        <span>${aut.role}</span>
        <span><button type="button" class="btn btn-danger">X</button>

        </p>
        `
    });
}

function addLocalData(){
    let nifInput =  document.querySelector("#NIF").value;
    localStorage.setItem('user', nifInput)
}
