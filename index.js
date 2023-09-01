import { data } from "./data.js";
import { generateDialogHTML } from "./functions.js";

// selection des elements
const productsContainer = document.querySelector(".produits");
const dialog = document.querySelector("dialog");
const cartNumber = document.querySelector(".nombre");

let currentItem = null;

// Items in cart
let cartItems = [];
cartNumber.textContent = cartItems.length;

console.log(productsContainer);
// On crée une fonction qui va nous permettre de générer le HTML pour chaque produit
function generateProductHTML(product) {
  return `
    <div class="img">
            <img src='${product.img}' alt="" />
            <div class="icons">
              <div class="first">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-cart-flatbed-suitcase"></i>
              </div>
              <div class="last">
                <i class="fa-solid fa-star"></i>
                <p>4.5</p>
              </div>
            </div>
          </div>
          <div class="text">
            <p class="nom">${product.categorie}</p>
            <h3>${product.nom}</h3>
          </div>

          <div class="footer">
            <div class="prix">
              <p class="prix-actuel">$ ${product.prix}</p>
            </div>
            <div class="color">
              <div class="item-color"></div>
              <div class="item-color"></div>
              <div class="item-color"></div>
            </div>
          </div>
      
    `;
}

// Code pour looper entre différents produits et les afficher

console.log(generateProductHTML(data[0]));

data.forEach((product) => {
  const productHTML = document.createElement("div");
  productHTML.classList.add("carte-produit");
  // adding popovertarget attribute
  productHTML.setAttribute("popovertarget", "my-popover");
  productHTML.setAttribute("data-id", product.id);
  productHTML.innerHTML = generateProductHTML(product);

  productsContainer.appendChild(productHTML);
});

// Adding action on card click to display popover
const cards = document.querySelectorAll(".carte-produit");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Selection des elements
    const dialog = document.querySelector("dialog");

    // remove previous dialog content
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
    const numberOfTimeIncart = cartItems.filter(
      (item) => item.id === currentItem.id
    );
    qte.textContent = numberOfTimeIncart.length;

    // Verifier si l'item est deja dans le panier
    const existe = cartItems.find((item) => item.id === currentItem.id);
    if (existe) {
      btnAdd.disabled = true;
      btnAdd.textContent = "Ajouté";
    } else {
      btnAdd.disabled = false;
      btnAdd.textContent = "Ajouter au panier";
    }

    // Ajouter dans le panier

    // Remove item

    if (btnAdd.dataset.panier === "oui") {
      console.log("test");
      btnAdd.addEventListener("click", () => {
        cartItems = cartItems.filter((item) => item.id !== currentItem.id);
        btnAdd.classList.remove("ajoute");
        btnAdd.textContent = "Ajouter au panier";
      });
    } else {
      btnAdd.addEventListener("click", () => {
        console.log(btnAdd.textContent);
        cartItems.push(currentItem);
        cartNumber.textContent = cartItems.length;
        btnAdd.textContent = "Efface du panier";
        btnAdd.setAttribute("panier", "oui");
        btnAdd.classList.add("ajoute");
        qte.textContent = 1;
        console.log(cartItems);
        console.log(btnAdd.dataset);
      });
    }

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

// Close popover
const btnClose = document.querySelector(".close");
btnClose.addEventListener("click", () => {
  dialog.close();
});
