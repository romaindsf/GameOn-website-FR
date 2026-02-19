function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const formReserve = document.querySelector("form[name='reserve']");
const confirmation = document.getElementById("confirmation");
const btnClose = document.getElementById("btn-close");

// Événements d'ouverture et de fermeture de la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
btnClose.addEventListener("click", closeModal);
modalbg.addEventListener("click", (e) => {
  if (e.target === modalbg) closeModal();
});

// Ouvre le formulaire modal
function launchModal() {
  modalbg.style.display = "block";
}

// Ferme la modale et réinitialise l'affichage
function closeModal() {
  modalbg.style.display = "none";
  formReserve.style.visibility = "visible";
  confirmation.classList.remove("active");
}

// Validation du formulaire
function validate() {
  const champPrenom = document.getElementById("first");
  const champNom = document.getElementById("last");
  const champEmail = document.getElementById("email");
  const champQuantity = document.getElementById("quantity");
  const champsLocation = document.querySelectorAll("input[name='location']");
  const champConditions = document.getElementById("checkbox1");

  // Les gardes-fous s'assurent qu'on ne manipule jamais des nœuds DOM absents.
  if (!champPrenom || !champNom) {
    return false;
  }
  if (!champEmail) {
    return false;
  }
  if (!champQuantity) {
    return false;
  }
  if (champsLocation.length === 0) {
    return false;
  }
  if (!champConditions) {
    return false;
  }

  // trim() supprime les espaces en début et fin de la saisie utilisateur
  const valeurPrenom = champPrenom.value.trim();
  const valeurNom = champNom.value.trim();
  const valeurEmail = champEmail.value.trim();
  const valeurQuantity = champQuantity.value.trim();
  let valide = true;

  const champBirthdate = document.getElementById("birthdate");

  // Active ou désactive l'affichage d'erreur sur le parent .formData
  const setError = (champ, estErreur) => {
    const formData = champ.closest(".formData");
    if (formData) {
      formData.setAttribute("data-error-visible", estErreur ? "true" : "false");
    }
    if (estErreur) valide = false;
  };

  // Prénom et nom : min 2 caractères
  setError(champPrenom, valeurPrenom.length < 2);
  setError(champNom, valeurNom.length < 2);

  // Email valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setError(champEmail, !emailRegex.test(valeurEmail));

  // Date de naissance
  setError(champBirthdate, !champBirthdate.value);

  // Quantité : doit être un nombre
  const valeurNumeric = parseFloat(valeurQuantity);
  setError(champQuantity, valeurQuantity === "" || Number.isNaN(valeurNumeric));

  // Au moins un tournoi sélectionné
  const locationSelectionnee = document.querySelector(
    "input[name='location']:checked",
  );
  const locationFormData = champsLocation[0].closest(".formData");
  if (!locationSelectionnee) {
    locationFormData.setAttribute("data-error-visible", "true");
    valide = false;
  } else {
    locationFormData.setAttribute("data-error-visible", "false");
  }

  // Conditions acceptées
  const conditionsFormData = champConditions.closest(".formData");
  if (!champConditions.checked) {
    conditionsFormData.setAttribute("data-error-visible", "true");
    valide = false;
  } else {
    conditionsFormData.setAttribute("data-error-visible", "false");
  }

  if (valide) {
    formReserve.style.visibility = "hidden";
    confirmation.classList.add("active");
  }

  return false;
}
