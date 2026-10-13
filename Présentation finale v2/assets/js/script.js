/* =========================================================
   Fichier JavaScript - Atelier BTS SIO
   Fiche métier : Ingénieur en Cybersécurité

   Ce fichier contient :
   1. La gestion du mode sombre / mode clair
   2. L'animation "effet terminal"
========================================================= */


/* =========================================================
   PARTIE 1 : GESTION DU MODE SOMBRE / MODE CLAIR
   Le bouton dans la navbar permet de basculer entre les
   deux thèmes. Le choix est sauvegardé dans localStorage
   pour être conservé à la prochaine visite.
========================================================= */

// Je récupère le bouton et l'icône qui est dedans
const boutonMode = document.getElementById("bouton-mode");
const iconeMode = boutonMode.querySelector("i");

// Fonction qui applique le thème demandé
function appliquerTheme(theme) {
    const estSombre = theme === "sombre";

    // Ajoute ou retire la classe "mode-sombre" sur le body
    document.body.classList.toggle("mode-sombre", estSombre);

    // Change l'icône du bouton (lune ou soleil)
    iconeMode.classList.remove("bi-moon-stars-fill", "bi-sun-fill");

    if (estSombre) {
        // En mode sombre, on affiche le soleil pour pouvoir revenir en clair
        iconeMode.classList.add("bi-sun-fill");
        boutonMode.setAttribute("aria-pressed", "true");
        boutonMode.setAttribute("aria-label", "Désactiver le mode sombre");
        boutonMode.title = "Désactiver le mode sombre";
    } else {
        // En mode clair, on affiche la lune pour pouvoir passer en sombre
        iconeMode.classList.add("bi-moon-stars-fill");
        boutonMode.setAttribute("aria-pressed", "false");
        boutonMode.setAttribute("aria-label", "Activer le mode sombre");
        boutonMode.title = "Activer le mode sombre";
    }
}

// Je récupère le thème sauvegardé, s'il existe
const themeSauvegarde = localStorage.getItem("theme");

// Si aucun thème n'est sauvegardé, je suis le thème du système
const themeSysteme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "sombre"
    : "clair";

// J'applique le thème au chargement de la page
appliquerTheme(themeSauvegarde || themeSysteme);

// Quand on clique sur le bouton, on change de thème
boutonMode.addEventListener("click", function () {
    // Si on est en sombre, on passe en clair, et inversement
    const nouveauTheme = document.body.classList.contains("mode-sombre")
        ? "clair"
        : "sombre";

    appliquerTheme(nouveauTheme);

    // Je sauvegarde le choix pour la prochaine visite
    localStorage.setItem("theme", nouveauTheme);
});


/* =========================================================
   PARTIE 2 : ANIMATION EFFET TERMINAL
   Le texte est écrit lettre par lettre dans le <span>
   d'id "texte-terminal".
   Si l'utilisateur préfère moins d'animations, on laisse
   le texte complet sans animation.
========================================================= */

// Le texte à afficher
const texteTerminal = "Analyse du poste : Ingénieur en Cybersécurité... accès autorisé.";

// La zone où on écrit
const zoneTerminal = document.getElementById("texte-terminal");

// Je vérifie si l'utilisateur a demandé à réduire les animations
const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Si l'utilisateur ne veut pas d'animation, on laisse le texte complet
if (!mouvementReduit) {
    // Je vide la zone avant de réécrire lettre par lettre
    zoneTerminal.textContent = "";

    // Position de la lettre en cours
    let position = 0;

    // Fonction qui écrit une lettre, puis programme la suivante
    function ecrireLettre() {
        if (position < texteTerminal.length) {
            // J'ajoute une lettre à ce qui est déjà affiché
            zoneTerminal.textContent += texteTerminal.charAt(position);
            position++;

            // J'attends 40 millisecondes avant la lettre suivante
            setTimeout(ecrireLettre, 40);
        }
    }

    // L'animation démarre quand la page est complètement chargée
    window.addEventListener("load", ecrireLettre);
}