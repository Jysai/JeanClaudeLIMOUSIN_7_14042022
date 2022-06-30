import { recipes } from "../data/recipes.js";

const recipesSection = document.querySelector(".section-list-recipes");
const arrayIngredientsForFilters = [];
const arrayCookingtoolsForFilters = [];
const arrayAppliancesForFilters = [];

recipes.forEach((recipe) => {
  const article = document.createElement("article");
  article.classList.add("article-recipe");
  article.setAttribute("data-id", `${recipe.id}`);
  const articleId = article.getAttribute("data-id");

  const informationsRecipe = document.createElement("div");
  informationsRecipe.classList.add("informations-recipe");

  const ingredientsAndDescriptions = document.createElement("div");
  ingredientsAndDescriptions.classList.add("ingredients-and-description");

  const listIngredients = document.createElement("div");
  listIngredients.classList.add("list-of-ingredients");

  const recipeDescription = document.createElement("span");
  recipeDescription.classList.add("recipe-description");

  const arrayIngredientsForArticle = [];

  arrayAppliancesForFilters.push(recipe.appliance);

  recipe.ingredients.forEach((ingredients) => {
    arrayIngredientsForArticle.push(ingredients);
    arrayIngredientsForFilters.push(ingredients);
  });

  recipe.ustensils.forEach((ustensils) => {
    arrayCookingtoolsForFilters.push(ustensils);
  });

  article.innerHTML = `     
    <div class="picture-recipe"></div>
   `;

  informationsRecipe.innerHTML = `<div class="name-and-timer"><h2 class="name-recipe">${recipe.name} </h2><span class="timer-recipe">${recipe.time}min </span></div>`;

  recipeDescription.textContent = `${recipe.description}`;

  if (articleId == recipe.id) {
    arrayIngredientsForArticle.forEach((element) => {
      const ingredientsRecipe = document.createElement("span");
      ingredientsRecipe.classList.add("ingredients-recipe");

      ingredientsRecipe.innerHTML = `<b class="ingredient-name">${
        element.ingredient
      }</b>${
        element.quantity
          ? ": " + element.quantity
          : `${" "}` && element.quantite
          ? ": " + element.quantite
          : `${" "}`
      } ${element.unit ? element.unit : `${" "}`} `;

      listIngredients.appendChild(ingredientsRecipe);
    });
  }

  ingredientsAndDescriptions.appendChild(listIngredients);
  ingredientsAndDescriptions.appendChild(recipeDescription);
  informationsRecipe.appendChild(ingredientsAndDescriptions);
  article.appendChild(informationsRecipe);
  recipesSection.appendChild(article);
});

const arrayIngredientForDisplayFilters = [];
const arrayCookingtoolsForDisplayFilters = [];

arrayIngredientsForFilters.forEach((element) => {
  arrayIngredientForDisplayFilters.push(element.ingredient.toLowerCase());
});

arrayCookingtoolsForFilters.forEach((element) => {
  arrayCookingtoolsForDisplayFilters.push(element.toLowerCase());
});

// let unique_names = [...new Set(arrayCookingtoolsForFilters)]

// console.log(unique_names);

const arrayCookingtoolsWithoutDuplicates = Array.from(
  new Set(arrayCookingtoolsForDisplayFilters)
);

const arrayAppliancesWithoutDuplicates = Array.from(
  new Set(arrayAppliancesForFilters)
);

const arrayIngredientsWithoutDuplicates = Array.from(
  new Set(arrayIngredientForDisplayFilters)
);

const ingredientsFilterSection = document.querySelector(".ingredients-filter");
const appliancesFilterSection = document.querySelector(".appliances-filter");
const cookingtoolsFilterSection = document.querySelector(".ustensils-filter");

arrayCookingtoolsWithoutDuplicates.forEach((element) => {
  const buttonFilter = document.createElement("button");
  buttonFilter.classList.add("button-filter-cooking-tools");

  buttonFilter.innerHTML = element;

  cookingtoolsFilterSection.appendChild(buttonFilter);
});

arrayAppliancesWithoutDuplicates.forEach((element) => {
  const buttonFilter = document.createElement("button");
  buttonFilter.classList.add("button-filter-appliances");

  buttonFilter.innerHTML = element;

  appliancesFilterSection.appendChild(buttonFilter);
});

arrayIngredientsWithoutDuplicates.forEach((element) => {
  const buttonFilter = document.createElement("button");

  buttonFilter.classList.add("button-filter-ingredients");


  buttonFilter.innerHTML = element;

  ingredientsFilterSection.appendChild(buttonFilter);
});

document.querySelector(".button-ingredient").addEventListener("click", () => {
  document.querySelector(".ingredients-input-and-filters").style.display =
    "block";
  document.querySelector(".ingredients-input-and-filters").style.margin =
    "10px";
  document.querySelector(".button-ingredient").style.display = "none";
  document.getElementById("search-filter-ingredient-input").focus();
})

document.querySelector(".button-appliance").addEventListener("click", () => {
  document.querySelector(".appliances-input-and-filters").style.display =
    "block";
  document.querySelector(".appliances-input-and-filters").style.margin = "10px";
  document.querySelector(".button-appliance").style.display = "none";
  document.getElementById("search-filter-appliance-input").focus();
})



document.querySelector(".button-ustensil").addEventListener("click", () => {
  document.querySelector(".ustensils-input-and-filters").style.display =
    "block";
  document.querySelector(".ustensils-input-and-filters").style.margin = "10px";
  document.querySelector(".button-ustensil").style.display = "none";
  document.getElementById("search-filter-ustensil-input").focus();
})

window.onclick = (e) => {
  if (!e.target.closest(".button-appliance")) {
    document.querySelector(".appliances-input-and-filters").style.display =
      "none";
    document.querySelector(".button-appliance").style.display = "flex";
  }
  if (e.target.closest(".appliances-input-and-filters")) {
    document.querySelector(".appliances-input-and-filters").style.display =
      "block";
    document.querySelector(".button-appliance").style.display = "none";
  }
  if (!e.target.closest(".button-ingredient")) {
    document.querySelector(".ingredients-input-and-filters").style.display =
      "none";
    document.querySelector(".button-ingredient").style.display = "flex";
  }
  if (e.target.closest(".ingredients-input-and-filters")) {
    document.querySelector(".ingredients-input-and-filters").style.display =
      "block";
    document.querySelector(".button-ingredient").style.display = "none";
  }
  if (!e.target.closest(".button-ustensil")) {
    document.querySelector(".ustensils-input-and-filters").style.display =
      "none";
    document.querySelector(".button-ustensil").style.display = "flex";
  }
  if (e.target.closest(".ustensils-input-and-filters")) {
    document.querySelector(".ustensils-input-and-filters").style.display =
      "block";
    document.querySelector(".button-ustensil").style.display = "none";
  }
};

