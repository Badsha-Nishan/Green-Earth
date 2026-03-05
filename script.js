const categoriesContainer = document.getElementById("categories-container");

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (categories) => {
  console.log(categories);
  for (const category of categories) {
    const categoreisBtn = document.createElement("button");
    categoreisBtn.className = "btn btn-outline btn-success w-full mb-1";
    const categoryName = category.category_name;
    categoreisBtn.innerText = categoryName;
    categoriesContainer.appendChild(categoreisBtn);
  }
};
loadCategories();
