import { data } from "./data.js";
import { generateDialogHTML, generateProductHTML } from "./functions.js";

// selection des elements
const productsContainer = document.querySelector(".produits");
const dialog = document.querySelector("dialog");
const cartNumber = document.querySelector(".nombre");

let currentItem = null;

// Items in cart
let cartItems = [];
cartNumber.textContent = cartItems.length;
let produitAffciher = data;

// Code pour looper entre différents produits et les afficher

const afficherProduit = (produits) => {
  produits.forEach((product) => {
    const productHTML = document.createElement("div");
    productHTML.classList.add("carte-produit");
    //Ajout de l'id pour identifier chaque produit cliqué
    productHTML.setAttribute("data-id", product.id);
    productHTML.innerHTML = generateProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
};

afficherProduit(produitAffciher);

// Recherche des produits
const input = document.querySelector(".recherche");

input.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const resultat = data.filter((p) =>
    p.nom.toLocaleLowerCase().includes(e.target.value)
  );
  productsContainer.innerHTML = "";
  if (resultat.length > 0) {
    afficherProduit(resultat);
    actionProduit();
  } else {
    const vide = document.createElement("h3");
    vide.textContent = "Aucun produit trouvé";
    productsContainer.appendChild(vide);
  }
});
// Fonction pour tester si une fois un produit existe dans le panier

const testerSiExiste = (produit, arr) => {
  const ele = arr.find((p) => p.id === produit.id);
  return ele ? true : false;
};

const actionProduit = () => {
  // Ajout de l'action pour afficher la boite de dialogue
  const cards = document.querySelectorAll(".carte-produit");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Selection des elements
      const dialog = document.querySelector("dialog");

      // Effacer le contenu d'avant
      const dialogContent = document.querySelector(".dialog-menu");

      dialogContent && dialogContent.remove();
      dialog.showModal();
      dialog.scrollTo(0, 0);
      const section = document.createElement("section");
      section.classList.add("dialog-menu");
      currentItem = data.filter((i) => i.id == card.dataset.id)[0];
      section.innerHTML = generateDialogHTML(currentItem);
      dialog.appendChild(section);

      // Selection element carte
      const btnAdd = document.querySelector(".ajouter");
      const qte = document.querySelector(".qte");
      let existedeja = false;
      const numberOfTimeIncart = cartItems.filter(
        (item) => item.id === currentItem.id
      );
      qte.textContent = numberOfTimeIncart.length;

      // Incrémenter la valeur
      const btnDimunuer = document.querySelector(".counter .fa-minus");
      const btnAjouter = document.querySelector(".counter .fa-plus");

      btnAjouter.addEventListener("click", () => {
        qte.textContent = numberOfTimeIncart.length++;
      });

      btnDimunuer.addEventListener("click", () => {
        if (parseInt(qte.textContent) > 0) {
          qte.textContent = numberOfTimeIncart.length--;
        }
      });

      // Ajouter dans le panier
      if (testerSiExiste(currentItem, cartItems)) {
        btnAdd.textContent = "Efface du panier";
        btnAdd.classList.add("ajoute");
        qte.textContent = 1;
      }

      btnAdd.addEventListener("click", () => {
        if (testerSiExiste(currentItem, cartItems)) {
          const b = `  <div class="icon"><i class="fa-solid fa-plus"></i></div>
            <p>Ajouter au panier</p>`;
          btnAdd.innerHTML = b;
          cartItems = cartItems.filter((item) => item.id !== currentItem.id);
          qte.textContent = 0;
          btnAdd.classList.remove("ajoute");
        } else {
          cartNumber.textContent = cartItems.length;
          btnAdd.textContent = "Efface du panier";
          btnAdd.classList.add("ajoute");
          qte.textContent = 1;
          console.log(cartItems);
          existedeja = true;
          cartItems.push(currentItem);
        }
        cartNumber.textContent = cartItems.length;
        console.log(btnAdd.dataset);
      });

      const bgPng = document.querySelector(".gauche");
      // Colors
      const colors = document.querySelectorAll(".color.change");
      colors.forEach((item, key) => {
        item.addEventListener("click", () => {
          switch (key) {
            case 0:
              bgPng.style.background = "#ff6b58";
              break;
            case 1:
              bgPng.style.background = "#3333";
              console.log(key);
            case 2:
              bgPng.style.background = "#5f69d5";
            default:
              break;
          }
        });
      });
    });
  });
};

actionProduit();

// Close popover
const btnClose = document.querySelector(".close");
btnClose.addEventListener("click", () => {
  dialog.close();
});
