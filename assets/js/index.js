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
    const burger = document.getElementById("burger");
    const progressbar = document.getElementById("progress").firstElementChild;
    const name = document.getElementsByName('Name');
    const email = document.getElementsByName('Email');
    const message = document.getElementById('message');
    const submit = document.querySelector('button[type="submit"]');
    const form = document.querySelector('.form');

    // Gestion du mode
    let mode = localStorage.getItem('theme');

    if (mode === 'light') {
        document.body.classList.add('light_mode');
        theme.checked = true;
    } else {
        document.body.classList.remove('light_mode');
        theme.checked = false;
    }

    theme.addEventListener('change', () => {
        if (theme.checked) {
            document.body.classList.add('light_mode');
            localStorage.setItem('theme', 'light');
            mode = localStorage.getItem('theme');
        } else {
            document.body.classList.remove('light_mode');
            localStorage.setItem('theme', 'dark');
            mode = localStorage.getItem('theme');
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

            if (rect.top <= 1) {
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

    // Gestion du responsive
    navbar.style.top = `${headh}px`;

    // bouton & menu burger
    let isburger = false;
    let span1 = burger.firstElementChild;
    let span2 = burger.children[1];
    let span3 = burger.lastElementChild;
    let navul = navbar.firstElementChild;
    
    burger.addEventListener('click', () => {
        let jiophone = navbar.classList.contains('jiophone');

        if (!isburger) {
            // animation bouton burger
            span1.style.transform = "rotateZ(45deg) translateY(9px) translateX(2px)";
            span1.style.width = "100%";
            span3.style.transform = "rotateZ(-45deg) translateY(-9px) translateX(2px)";
            span3.style.width = "100%";
            span2.style.opacity = "0";

            // animation du menu
            navbar.classList.add('active');
            navul.style.opacity = "1";

            navbar.classList.add('jiophone');
            isburger = true;
        } else {
            span1.style.transform = "rotateZ(0deg) translateY(0px) translateX(0px)";
            span1.style.width = "80%";
            span3.style.transform = "rotateZ(0deg) translateY(0px) translateX(0px)";
            span3.style.width = "80%";
            span2.style.opacity = "1";

            navbar.classList.remove('active');
            navul.style.opacity = "0";

            navbar.classList.remove('jiophone');
            isburger = false;
        }
    });

    // fermeture du menu lors du click des onglets
    onglets.forEach((onglet) => {
        onglet.addEventListener('click', () => {
            if (isburger) {
                navbar.classList.remove('active');
                navul.style.opacity = "0";

                span1.style.transform = "rotateZ(0deg) translateY(0px) translateX(0px)";
                span1.style.width = "80%";
                span3.style.transform = "rotateZ(0deg) translateY(0px) translateX(0px)";
                span3.style.width = "80%";
                span2.style.opacity = "1";

                isburger = false;
            }
        });
    });
});