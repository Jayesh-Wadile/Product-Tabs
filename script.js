document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tab-link").click();

  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      populateProductCards(data.categories);
    })
    .catch((error) => console.error("Error fetching the data:", error));
});

function populateProductCards(categories) {
  categories.forEach((category) => {
    category.category_products.forEach((product) => {
      createCard(product, category.category_name);
    });
  });
}

function createCard(product, categoryName) {
  const card = document.createElement("div");
  card.classList.add("card");

  const badge = product.badge_text
    ? `<div class="badge">${product.badge_text}</div>`
    : "";
  const image = `<img src="${product.image}" alt="${product.title}">`;
  const title = `<h2>${product.title}</h2>`;
  const vendor = `<p>Vendor: ${product.vendor}</p>`;
  const price = `<p><span class="price">₹${product.compare_at_price}</span> <span class="discount">₹${product.price}</span></p>`;
  const button = `<button class="btn">Add to Cart</button>`;

  card.innerHTML = `${badge}${image}${title}${vendor}${price}${button}`;
  document.getElementById(categoryName).appendChild(card);
}

function openTab(evt, tabName) {
  const tabContent = document.querySelectorAll(".tab-content");
  tabContent.forEach((content) => {
    content.style.display = "none";
  });

  const tabLinks = document.querySelectorAll(".tab-link");
  tabLinks.forEach((link) => {
    link.classList.remove("active");
  });

  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.classList.add("active");
}
