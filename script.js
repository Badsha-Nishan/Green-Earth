const categoriesContainer = document.getElementById("categories-container");
const cardsContainer = document.getElementById("card-container");
const spinner = document.getElementById("loadingSpinner");
const allBtn = document.getElementById("allBtn");

const showLoading = () => {
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
  cardsContainer.innerHTML = "";
};

const hideLoading = () => {
  spinner.classList.add("hidden");
  spinner.classList.remove("flex");
};
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
    categoreisBtn.className = "btn btn-outline text-[#15803D] w-full mb-1";
    const categoryName = category.category_name;
    categoreisBtn.innerText = categoryName;
    categoreisBtn.onclick = () => selectCategory(category.id, categoreisBtn);
    categoriesContainer.appendChild(categoreisBtn);
  }
};

const selectCategory = async (id, btn) => {
  showLoading();

  const allButtons = document.querySelectorAll(
    "#categories-container button, #allBtn"
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-outline");
  });
  btn.classList.add("btn-success");
  btn.classList.remove("btn-outline");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  const data = await res.json();
  displayCards(data.plants);
};

allBtn.addEventListener("click", () => {
  const allButtons = document.querySelectorAll(
    "#card-container button, #allBtn"
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-outline");
  });

  allBtn.classList.add("btn-success");
  allBtn.classList.remove("btn-outline");
  loadCards();
});
// Load Cards
const loadCards = async () => {
  showLoading();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideLoading();
  displayCards(data.plants);
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
