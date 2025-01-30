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

const formulaire = document.getElementById('formulaire');

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
