document.addEventListener('DOMContentLoaded', () => {
    // Réinitialiser le localStorage au début
    // localStorage.clear();
    // localStorage.removeItem('theme');
    // console.log("Le localStorage a été réinitialisé au chargement de la page.");

    // Récupérer les éléments du DOM
    const theme = document.getElementById("theme");
    const ancres = document.querySelectorAll(".sect");
    const header = document.querySelector("header");
    const navbar = document.querySelector(".navbar");
    const onglets = navbar.querySelectorAll("a");
    const progressbar = document.getElementById("progress").firstElementChild;
    const name = document.getElementsByName('Name');
    const email = document.getElementsByName('Email');
    const message = document.getElementById('message');
    const submit = document.querySelector('button[type="submit"]');
    const form = document.querySelector('.form');

    // Gestion du mode
    let mode = localStorage.getItem('theme');

    if (mode === 'dark') {
        document.body.classList.add('light_mode');
        theme.checked = true;
        console.log(mode);
        
    } else {
        document.body.classList.remove('light_mode');
        theme.checked = false;
        console.log(mode);
    }

    theme.addEventListener('change', () => {
        if (theme.checked) {
            document.body.classList.add('light_mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light_mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Gestion de la bar de progression
    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;
        let winheight = document.documentElement.scrollHeight - window.innerHeight;
        let pourcentage = (scrolled / winheight) * 100;
        progressbar.style.width = `${pourcentage}%`;
    });

    // Gestion des ancres
    const headh = header.offsetHeight;
    ancres.forEach((ancre) => {
        ancre.style.top = `-${headh}px`;
    });

    // Gestion de la couleur des onglets
    onglets[0].classList.add("active");
    ancres.forEach((ancre, i) => {
        document.addEventListener('scroll', () => {
            let rect = ancre.getBoundingClientRect();

            if (rect.top <= 0) {
                onglets.forEach((onglet) => {
                    onglet.classList.remove("active");
                });
                onglets[i].classList.add("active");
            }
        });
    });

    // Variables pour suivre l'état de validation
    let isname = false;
    let isemail = false;
    let ismessage = false;

    // Validation du nom
    name[0].addEventListener('input', () => {
        const regex = /^[a-zA-Z]{3,12}(\s[a-zA-Z]{3,12}){0,2}$/;
        const valid = regex.test(name[0].value);
        const value = name[0].value;
        const error = name[0].nextElementSibling.nextElementSibling;

        if (value.length < 3 && value !== "") {
            error.textContent = "Name must contain at least 3 characters.";
            error.style.display = 'block';
            isname = false;
        } else if (valid) {
            isname = true;
            error.style.display = 'none';
        } else if (value === "") {
            isname = false;
            error.style.display = 'none';
        } else {
            error.textContent = "Please enter a valid name.";
            error.style.display = 'block';
            isname = false;
        }

        // Mettre à jour l'état du bouton de soumission
        submit.disabled = !(isname && isemail && ismessage);
    });

    // Validation de l'email
    email[0].addEventListener('input', () => {
        const regex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        const valid = regex.test(email[0].value);
        const error = email[0].nextElementSibling.nextElementSibling;

        if (valid) {
            error.style.display = 'none';
            isemail = true;
        } else if (email[0].value === "") {
            error.style.display = 'none';
            isemail = false;
        } else {
            error.textContent = "Please enter a valid email address.";
            error.style.display = 'block';
            isemail = false;
        }

        // Mettre à jour l'état du bouton de soumission
        submit.disabled = !(isname && isemail && ismessage);
    });

    // Validation du message
    message.addEventListener('input', () => {
        const regex = /^[\p{L}0-9@#%.()';:+-_!?$&*\s]{1,}$/u;
        const valid = regex.test(message.value);
        const saisie = message.value;
        const error = message.nextElementSibling.nextElementSibling;

        if (valid && saisie.length > 500) {
            error.textContent = "Message is too long (maximum 500 characters).";
            error.style.display = 'block';
            ismessage = false;
        } else if (valid || saisie === "") {
            ismessage = true;
            error.style.display = 'none';
        } else {
            error.textContent = "Message contains invalid characters.";
            error.style.display = 'block';
            ismessage = false;
        }

        // Mettre à jour l'état du bouton de soumission
        submit.disabled = !(isname && isemail && ismessage);
    });

    // Désactiver le bouton de soumission par défaut
    submit.disabled = true;
});