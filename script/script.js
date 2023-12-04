/*********************************************************************************
 *
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu.
 *
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */

function afficherResultat(score, nbMotsProposes) {
  // Récupération de la zone dans laquelle on va écrire le score
  let spanScore = document.querySelector(".zoneScore span");
  // Ecriture du texte
  let affichageScore = `${score} / ${nbMotsProposes}`;
  // On place le texte à l'intérieur du span.
  spanScore.innerText = affichageScore;
}

function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}

/*function countdown(seconds, updateCallback, finishCallback) {
  let remainingTime = seconds;

  function update() {
    if (remainingTime > 0) {
      remainingTime--;
      if (updateCallback) {
        updateCallback(remainingTime);
      }
      setTimeout(update, 1000); // Appel récursif après 1 seconde
    } else {
      if (finishCallback) {
        finishCallback();
      }
    }
  }

  update(); // Commencer le compte à rebours
}

// Exemple d'utilisation :
// Supposons que vous ayez un élément avec l'ID "countdownDisplay" pour afficher le compte à rebours
let countdownDisplay = document.getElementById("countdownDisplay");

countdown(
  60, // Nombre de secondes
  function (remainingTime) {
    // Fonction de mise à jour
    countdownDisplay.textContent = remainingTime + "s";
  },
  function () {
    // Fonction de fin
    countdownDisplay.textContent = "Terminé!";
    // Ajoutez ici le code à exécuter lorsque le compte à rebours est terminé
  }
);*/

/**
 * Cette fonction lance le jeu.
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
  // Initialisations
  let score = 0;
  let i = 0;
  let listeProposition = listeMots;

  let btnValiderMot = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");

  afficherProposition(listeMots[i]);

  btnValiderMot.addEventListener("click", () => {
    //console.log(inputEcriture.value);
    if (inputEcriture.value === listeProposition[i]) {
      score++;
    }
    i++;

    afficherResultat(score, i);
    inputEcriture.value = "";
    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini");
      btnValiderMot.disabled = true;
    } else {
      afficherProposition(listeProposition[i]);
    }
  });

  // Gestion de l'événement change sur les boutons radios.
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      // Si c'est le premier élément qui a été modifié, alors nous voulons
      // jouer avec la listeMots.
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        // Sinon nous voulons jouer avec la liste des phrases
        listeProposition = listePhrases;
      }
      // Et on modifie l'affichage en direct.
      afficherProposition(listeProposition[i]);
    });
  }

  afficherResultat(score, i);
}
