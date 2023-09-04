export const generateDialogHTML = (product) => {
  return `
    <div class="product-page">
      <div class="gauche">
        <img src="${product.img}" />
      </div>
      <div class="droite">
        <div class="titre">
          <h1>${product.nom}</h1>
          <div class="last">
            <i class="fa-solid fa-star"></i>
            <p>4.5</p>
          </div>
        </div>
        <p class="description">
          ${product.description}
        </p>
        <div class="colors">
          <p>Couleur :</p>
          <div class="color-container">
            <div class="color change"></div>
            <div class="color change"></div>
          </div>
        </div>
        <div class="sizes">
          <p>Size:</p>
          <div class="container">
            <div class="size">XS</div>
            <div class="size active">S</div>
            <div class="size">M</div>
            <div class="size">L</div>
            <div class="size">XL</div>
          </div>
        </div>

        <div class="prix">$ ${product.prix}</div>

        <div class="footer">
          <div class="counter">
            <i class="fa-solid fa-minus"></i>
            <p class="qte">5</p>

            <i class="fa-solid fa-plus"></i>
          </div>
          <button class="ajouter">
            <div class="icon"><i class="fa-solid fa-plus"></i></div>
            <p>Ajouter au panier</p>
          </button>

          <div class="like">
            <i class="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="accessoire">
      <div class="bottom">
        <div class="carte-cat">
          <img src="/assets/im6.png" />
        </div>
        <div class="carte-cat">
          <img src="/assets/im6.png" />
        </div>
        <div class="carte-cat">
          <img src="/assets/im6.png" />
        </div>
        <div class="carte-cat">
          <img src="/assets/im6.png" />
        </div>
        <div class="carte-cat">
          <p>...</p>
        </div>
      </div>
      <div class="avantages">
        <div class="carte-service">
          <div class="icone">
            <i class="fa-solid fa-truck"></i>
          </div>
          <p>Livraison gratuite</p>
        </div>
        <div class="carte-service">
          <div class="icone">
            <i class="fa-solid fa-undo"></i>
          </div>
          <p>Retour gratuit</p>
        </div>
        <div class="carte-service">
          <div class="icone">
            <i class="fa-solid fa-credit-card"></i>
          </div>
          <p>Paiement sécurisé</p>
        </div>
      </div>
    </div>
    `;
};

// On crée une fonction qui va nous permettre de générer le HTML pour chaque produit
export function generateProductHTML(product) {
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
