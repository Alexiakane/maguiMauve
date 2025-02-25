//fonction header/footer
function includeHTML() {
    let z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    //Bouton mode sombre
    // Encapsulation du code dans une fonction immédiatement invoquée
    (function () {
        // Déclaration des variables
        const themeSwitcher = {
            button: document.querySelector('.js-theme-switcher'),
            prefersDark: window.matchMedia('(prefers-color-scheme: dark)'),
            currentTheme: null
        };

        // Initialisation du thème
        function initTheme() {
            if (localStorage.getItem('theme-preference')) {
                themeSwitcher.currentTheme = localStorage.getItem('theme-preference');
            } else if (themeSwitcher.prefersDark.matches) {
                themeSwitcher.currentTheme = 'dark';
            } else {
                themeSwitcher.currentTheme = 'light';
            }
            setTheme(themeSwitcher.currentTheme);
        }

        // Gestion du clic sur le bouton
        themeSwitcher.button.addEventListener('click', function () {
            themeSwitcher.currentTheme = document.documentElement.getAttribute('data-theme-preference') === "dark" ? "light" : "dark";
            setTheme(themeSwitcher.currentTheme);
        });

        // Gestion du changement de préférence système
        themeSwitcher.prefersDark.addEventListener('change', function (event) {
            themeSwitcher.currentTheme = event.matches ? 'dark' : 'light';
            setTheme(themeSwitcher.currentTheme);
        });

        // Fonction pour définir le thème
        function setTheme(theme) {
            const pressed = theme === 'dark' ? 'true' : 'false';
            document.documentElement.setAttribute('data-theme-preference', theme);
            localStorage.setItem('theme-preference', theme);
            themeSwitcher.button.setAttribute('aria-pressed', pressed);
        }

        // Initialisation
        initTheme();
    })();
}

//formulaire contact
const formulaire = document.getElementById('formulaire');

if (formulaire != null) {
    formulaire.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(formulaire);
        console.log(formData);
        const data = {}
        for (const [key, value] of formData) {
            console.log(`${key}: ${value}\n`);
            data[key] = value;
        }
        console.log(data);


        fetch('https://679742c1c2c861de0c6c0783.mockapi.io/exoRegex/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    })

    const photoR = document.getElementById('randomPhoto');

    fetch('https://foodish-api.com/api/')
        .then((response) => {
            return response.json();
        })
        .then((random) => {
            let images = random.image;
            const photo = document.createElement('img');
            photo.src = images;
            photoR.append(photo);
            photo.style.height = "45vh";
            photo.style.width = "30vw";
            photo.style.border = "solid gold";
            photo.style.borderRadius = "15%"
        })
}

// chargement d'une recette choice avec la portion ratio dans les pages salt ou sugar
function page(choice, ratio) {
    const recettes = document.getElementById("recettes")
    const container = document.getElementById("fiche");
    const title = document.getElementById("title");
    const image = document.getElementById("photo");
    const ingredient = document.getElementById("ingredient");
    const etapes = document.getElementById("etapes");
    const coteG = document.getElementById("left");
    const coteD = document.getElementById("right");
    const multiple = document.getElementById("ratio");

    if (choice != null) {
        recettes.style.display = "none";
        coteD.style.display = "none";
        coteG.style.display = "none";
        fetch("/recettes.json")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.recipes.forEach(recette => {
                    if (recette.name === choice) {
                        const titre = document.createElement("h1");
                        titre.textContent = recette.name;
                        title.appendChild(titre);
                        const photo = document.createElement("img");
                        photo.src = recette.img;
                        photo.style.height = "15em";
                        image.appendChild(photo);
                        const selector1 = document.createElement("input");
                        selector1.setAttribute("type", "radio");
                        selector1.setAttribute("id", "normal");
                        selector1.addEventListener("click", function(event){
                            while(title.firstChild) {
                             title.removeChild(title.firstChild);
                            }
                            while(image.firstChild) {
                             image.removeChild(image.firstChild);
                            }
                            while(ingredient.firstChild) {
                             ingredient.removeChild(ingredient.firstChild);
                            }
                            while(etapes.firstChild){
                             etapes.removeChild(etapes.firstChild);
                            }
                            while(multiple.firstChild){
                             multiple.removeChild(multiple.firstChild);
                            }
                            page(choice, 1);
                         })
                        const label1 = document.createElement("label");
                        label1.textContent = "Portion normal";
                        label1.style.fontSize = "4vh";
                        label1.style.color = "hotpink";
                        multiple.appendChild(label1);
                        multiple.appendChild(selector1);
                        const selector2 = document.createElement("input");
                        selector2.setAttribute("type", "radio");
                        selector2.setAttribute("id", "double");
                        selector2.addEventListener("click", function(event){
                           while(title.firstChild) {
                            title.removeChild(title.firstChild);
                           }
                           while(image.firstChild) {
                            image.removeChild(image.firstChild);
                           }
                           while(ingredient.firstChild) {
                            ingredient.removeChild(ingredient.firstChild);
                           }
                           while(etapes.firstChild){
                            etapes.removeChild(etapes.firstChild);
                           }
                           while(multiple.firstChild){
                            multiple.removeChild(multiple.firstChild);
                           }
                           page(choice, 2);
                        })
                        const label2 = document.createElement("label");
                        label2.textContent = "On double la dose !";
                        label2.style.fontSize = "4vh";
                        label2.style.color = "hotpink";
                        multiple.appendChild(label2);
                        multiple.appendChild(selector2);
                        const selector3 = document.createElement("input");
                        selector3.setAttribute("type", "radio");
                        selector3.setAttribute("id", "triple");
                        selector3.addEventListener("click", function(event){
                            while(title.firstChild) {
                             title.removeChild(title.firstChild);
                            }
                            while(image.firstChild) {
                             image.removeChild(image.firstChild);
                            }
                            while(ingredient.firstChild) {
                             ingredient.removeChild(ingredient.firstChild);
                            }
                            while(etapes.firstChild){
                             etapes.removeChild(etapes.firstChild);
                            }
                            while(multiple.firstChild){
                             multiple.removeChild(multiple.firstChild);
                            }
                            page(choice, 3);
                         })
                        const label3 = document.createElement("label");
                        label3.textContent = "Une triple bien fraîche !";
                        label3.style.fontSize = "4vh";
                        label3.style.color = "hotpink";
                        multiple.appendChild(label3);
                        multiple.appendChild(selector3);
                        const ul = document.createElement("ul");
                        recette.ingredients.forEach(course => {
                            const liste = document.createElement("li");
                            liste.textContent = course.quantity*ratio + " " + course.mesure + " " + course.name;
                            ul.appendChild(liste);

                        })
                        ingredient.appendChild(ul);
                        recette.preparation.forEach(derouler => {
                            const titrePreparation = document.createElement("p");
                            titrePreparation.style.fontSize = "2em";
                            titrePreparation.textContent = derouler.name;
                            titrePreparation.style.color = "hotpink";
                            titrePreparation.style.marginLeft = "1em";
                            etapes.appendChild(titrePreparation);
                            const ul2 = document.createElement("ul");
                            ul2.style.fontSize = "4vh";
                            derouler.ingredients.forEach(ssIngredients => {
                                const liste2 = document.createElement("li");
                                liste2.textContent =  ssIngredients.quantity*ratio + " " + ssIngredients.mesure + " " + ssIngredients.name;
                                ul2.appendChild(liste2);
                            })
                            etapes.appendChild(ul2);
                            const description = document.createElement("p");
                            description.textContent = derouler.description;
                            etapes.appendChild(description);
                            description.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
                            description.style.fontSize = "3vh";
                            description.style.margin = "2em";
                        })

                    }

                });
            })
    }

}

// ajout des listener declic sur une dernière recette pour la page home
// le listener clic fait une bascule sur page salt ou sugar avec un paramètre d'url = recette
const curry = document.getElementById("curry");
if(curry != null){
    curry.addEventListener("click", function(event){
        window.location.href = "/html/salt.html?id=curry";
    }
)
}
const gyoza = document.getElementById("gyoza");
if(gyoza != null){
    gyoza.addEventListener("click", function(event){
        window.location.href = "/html/salt.html?id=gyoza";
    }
)
}
const chocolatAtartiner = document.getElementById("chocolatAtartiner");
if(chocolatAtartiner != null){
    chocolatAtartiner.addEventListener("click", function(event){
        window.location.href = "/html/salt.html?id=chocolatAtartiner";
    }
)
}
const brioche = document.getElementById("brioche");
if(brioche != null){
    brioche.addEventListener("click", function(event){
        window.location.href = "/html/salt.html?id=brioche";
    }
)
}
const layerCake = document.getElementById("layerCake");
if(layerCake != null){
    layerCake.addEventListener("click", function(event){
        window.location.href = "/html/salt.html?id=layerCake";
    }
)
}
const tarteCitron = document.getElementById("tarteCitron");
if(tarteCitron != null){
    tarteCitron.addEventListener("click", function(event){
        window.location.href = "/html/salt.html?id=tarteCitron";
    }
)
}

// détection d'un paramètre d'url et appel de la fonction page pour charger la recette associée
const urlParams = new URLSearchParams(window.location.search);
const idRecette = urlParams.get('id');
if (idRecette != null) {
    switch(idRecette) {
        case "curry":
            page("Curry japonais", 1);
            break;
        case "gyoza":
            page("Gyoza", 1);
            break;
        case "chocolatAtartiner":
            page("Pâte à tartiner", 1);
            break;
        case "brioche":
            page("Brioche", 1);
            break;
        case "layerCake":
            page("Layer cake au chocolat", 1);
            break;
        case "tarteCitron":
            page("Tarte citron merringué", 1);
            break;
    }

}

// responsive menu burger
function myFunction() {
    const x = document.getElementById("nav");
    if (x.className === "top") {
        x.classList.add("responsive");
    } else {
        x.classList.remove("responsive");
    }
    const burger = document.getElementById("burger");
    if (burger.getAttribute("src") === "/images/menuB.PNG") {
        burger.setAttribute("src", "/images/fermer.PNG");
    } else {
        burger.setAttribute("src", "/images/menuB.PNG");
    }
}