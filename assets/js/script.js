const idProduct = [];
const idCartProduct = [];

/*********************************FUNÇÃO CRIA PRODUTO*************************************/
function createProduct(arrayData) {
    const ul = document.getElementById("parentList");
    ul.innerHTML = "";

    for (let i = 0; i < arrayData.length; i++) {
        const li = document.createElement("li");
        li.classList.add("productCard");
        li.id = arrayData[i].id;
        idProduct.push(li.id);

        const divIMG = document.createElement("div");
        divIMG.classList.add("boxIMG");
        const img = document.createElement("img");
        img.src = arrayData[i].img;

        const divInfo = document.createElement("div");
        divInfo.classList.add("boxInfo");

        const pCategory = document.createElement("p");
        pCategory.innerText = arrayData[i].category;
        pCategory.classList.add("productCategory");

        const h2 = document.createElement("h2");
        h2.innerText = arrayData[i].name;

        const divDescription = document.createElement("div");
        divDescription.classList.add("productDescription");
        const pDescription = document.createElement("p");
        pDescription.innerText = arrayData[i].description;

        const pPrice = document.createElement("p");
        pPrice.innerText = "R$" + arrayData[i].price;

        const cartButton = document.createElement("button");
        cartButton.innerText = "Adicionar ao carrinho";

        divIMG.appendChild(img);
        li.appendChild(divIMG);
        divInfo.appendChild(pCategory);
        divInfo.appendChild(h2);
        divDescription.appendChild(pDescription);
        divInfo.appendChild(divDescription);
        divInfo.appendChild(pPrice);
        divInfo.appendChild(cartButton);
        li.appendChild(divInfo);

        ul.appendChild(li);
    };
};
createProduct(data);


/*********************************FUNÇÃO FILTRA PRODUTO*************************************/
function filterProducts(event) {
    const newData = [];
    const item = event.target;
    const listItem = document.querySelectorAll(".filterItem");

    if (item.dataset.tag === "Todos") {
        createProduct(data);
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.includes(item.dataset.tag)) {
                newData.push(data[i]);
            };
        };
        createProduct(newData);
    };

    for (let i = 0; i < listItem.length; i++) {
        listItem[i].classList.remove("filterActive");
    };
    item.classList.add("filterActive");
}
const filterList = document.getElementById("filterNav");
filterList.addEventListener("click", filterProducts);


/*********************************FUNÇÃO PESQUISA PRODUTO*************************************/
function searchProducts() {
    const input = document.getElementById("findInput");
    const newData = [];

    for (let i = 0; i < data.length; i++) {
        const lowerStringData = data[i].name.toLowerCase();
        const upperStringData = data[i].name.toUpperCase();
        const lowerStringInput = input.value.toLowerCase();
        const upperStringInput = input.value.toUpperCase();
        if (lowerStringData.includes(lowerStringInput) || upperStringData.includes(upperStringInput)) {
            newData.push(data[i]);
        };
    };
    createProduct(newData);
    input.value = "";
};
const searchBtn = document.getElementById("searchButton");
searchBtn.addEventListener("click", searchProducts);


/*********************************FUNÇÃO DARK MODE*************************************/

const darkBtn = document.getElementById("darkModeBtn");

function darkMode() {
    const body = document.getElementById("darkBody");
    body.classList.toggle("bodyDark");

    const header = document.getElementById("header");
    header.classList.toggle("headerElementsDark");

    const ul = document.getElementById("parentList");
    ul.classList.toggle("parentListDark");

    const aside = document.getElementById("asideContent");
    aside.classList.toggle("asideDark");

    const cart = document.getElementById("cartList");
    cart.classList.toggle("cartListDark");

    darkBtn.classList.toggle("active");
};
darkBtn.addEventListener("click", darkMode);


/*********************************FUNÇÃO IDENTIFICA ITEM*************************************/

const parentList = document.getElementById("parentList");
const cartList = document.getElementById("cartList");

function identifyItem(event) {
    const itemClick = event.target;

    if (itemClick.tagName === "BUTTON") {
        addItem(itemClick);
    };
    if (itemClick.tagName === "SPAN") {
        removeItem(itemClick);
    };
};

parentList.addEventListener("click", identifyItem);
cartList.addEventListener("click", identifyItem);


/*********************************FUNÇÃO ADICIONA ITEM AO CARRINHO*************************************/

function addItem(button) {
    const cartList = document.getElementById("cartList");

    for (let i = 0; i < data.length; i++) {
        if (button.parentElement.parentElement.id === idProduct[i]) {

            const cartItem = document.createElement("li");
            cartItem.classList.add("cartItem");
            cartItem.id = "cartProduct" + (i + 1);
            idCartProduct.push(cartItem.id);

            const cartItemIMG = document.createElement("img");
            cartItemIMG.src = data[i].imgCart;

            const cartItemInfo = document.createElement("div");
            cartItemInfo.classList.add("cartItemInfo");

            const cartItemh3 = document.createElement("h3");
            cartItemh3.innerText = data[i].name;

            const cartItemp = document.createElement("p");
            cartItemp.innerText = "R$" + data[i].price;

            const removeItem = document.createElement("span");
            removeItem.innerText = "Remover produto";

            cartItem.appendChild(cartItemIMG);
            cartItemInfo.appendChild(cartItemh3);
            cartItemInfo.appendChild(cartItemp);
            cartItemInfo.appendChild(removeItem);
            cartItem.appendChild(cartItemInfo);

            cartList.appendChild(cartItem);
        };
    };

    const emptyCart = document.querySelector(".emptyCart");
    emptyCart.classList.add("emptyCartHidden");

    const amount = document.getElementById("amountCart");
    const price = document.getElementById("priceCart");

    amount.innerText = idCartProduct.length;

    let output = 0;
    for (let i = 0; i < idCartProduct.length; i++) {
        const priceValue = cartList.children[i].lastChild.children[1].textContent;
        output += Number(priceValue.replace("R$", ""));
    };
    price.innerText = "R$" + output.toFixed(2);

    const purchaseInfo = document.getElementById("purchaseInfo");
    purchaseInfo.classList.remove("purchaseInfoHidden");
};


/*********************************FUNÇÃO REMOVE ITEM DO CARRINHO*************************************/

function removeItem(span) {
    span.parentElement.parentElement.remove();

    let output = 0;
    const price = document.getElementById("priceCart");
    const amount = document.getElementById("amountCart");
    const cartItem = span.parentElement.parentElement.id;
    const indexItem = idCartProduct.indexOf(cartItem);

    idCartProduct.splice(indexItem, 1);

    amount.innerText = idCartProduct.length;

    for (let i = 0; i < idCartProduct.length; i++) {
        const priceValue = cartList.children[i].lastChild.children[1].textContent;
        output -= Number(priceValue.replace("R$", ""));
    };
    price.innerText = "R$" + (output * (-1)).toFixed(2);

    if (idCartProduct.length === 0) {
        const emptyCart = document.querySelector(".emptyCart");
        emptyCart.classList.remove("emptyCartHidden");

        const purchaseInfo = document.getElementById("purchaseInfo");
        purchaseInfo.classList.add("purchaseInfoHidden");
    };
};


/*********************************FUNÇÃO VOLTAR TOPO DA PÁGINA*************************************/

const btnTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function(event) {
    if (window.scrollY < 450) {
        btnTop.classList.remove("visibleButton");
    } else {
        btnTop.classList.add("visibleButton");
    };
});


btnTop.addEventListener("click", function() {
    window.scrollTo(0, 0);
});