const categoriesContainer = document.getElementById("categories-container");
const cardsContainer = document.getElementById("card-container");

// Load Categories Button
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// Display Categories Button
const displayCategories = (categories) => {
  for (const category of categories) {
    const categoreisBtn = document.createElement("button");
    categoreisBtn.className = "btn btn-outline btn-success w-full mb-1";
    const categoryName = category.category_name;
    categoreisBtn.innerText = categoryName;
    categoriesContainer.appendChild(categoreisBtn);
  }
};

// Load Cards
const loadCards = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayCards(data.plants));
};

// Display Cards
const displayCards = (cardDetails) => {
  cardDetails.forEach((element) => {
    const card = document.createElement("div");
    card.className = "bg-base-100 w-96 shadow-sm p-4 max-w-80";
    card.innerHTML = `
                  <figure>
                    <img
                    class="h-48 w-full object-cover"
                      src="${element.image}"
                      alt="${element.name}"
                      title="${element.name}"
                    />
                  </figure>
                  <div class="card-body">
                    <h2 class="card-title">${element.name}</h2>
                    <p class="line-clamp-2">${element.description}
                    </p>
      
                    <div class="flex justify-between">
                      <div class="badge bg-[#DCFCE7]">${element.category}</div>
                      <div class="font-semibold text-xl">${element.price}</div>
                    </div>
                    <button
                      class="btn btn-active btn-success rounded-full text-white text-xl bg-[#15803D]"
                    >
                      Add to Cart
                    </button>
                  </div>
          `;
    cardsContainer.appendChild(card);
  });
};

loadCards();

loadCategories();
