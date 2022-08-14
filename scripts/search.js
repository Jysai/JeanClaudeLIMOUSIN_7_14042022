import { recipes } from "../data/recipes.js";

const arrayIngredientsForFilters = [];
const arrayCookingtoolsForFilters = [];
const arrayAppliancesForFilters = [];

const searchInput = document.getElementById("searchbox-input");
const ingredientsFilterSection = document.querySelector(".ingredients-filter");
const appliancesFilterSection = document.querySelector(".appliances-filter");
const cookingtoolsFilterSection = document.querySelector(".ustensils-filter");

const searchFilterAppliancesInput = document.getElementById(
  "search-filter-appliance-input"
);

const searchFilterUstensilsInput = document.getElementById(
  "search-filter-ustensil-input"
);

const searchFilterIngredientsInput = document.getElementById(
  "search-filter-ingredient-input"
);

const recipesSection = document.querySelector(".section-list-recipes");
const filterSelection = document.querySelector(".filter-selection");

function displayRecipes(recipeDisplay) {
  // affichage des recettes

  recipeDisplay.forEach((element) => {
    const article = document.createElement("article");
    article.classList.add("article-recipe");
    article.setAttribute("data-id", `${element.id}`);
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

    arrayAppliancesForFilters.push(element.appliance.toLowerCase());

    element.ingredients.forEach((ingredients) => {
      arrayIngredientsForArticle.push(ingredients);
      arrayIngredientsForFilters.push(ingredients);
    });

    element.ustensils.forEach((ustensils) => {
      arrayCookingtoolsForFilters.push(ustensils.toLowerCase());
    });

    article.innerHTML = `
      <div class="picture-recipe"></div>
     `;

    informationsRecipe.innerHTML = `<div class="name-and-timer"><h2 class="name-recipe">${element.name} </h2><span class="timer-recipe">${element.time}min </span></div>`;

    recipeDescription.textContent = `${element.description}`;

    if (articleId == element.id) {
      arrayIngredientsForArticle.forEach((element) => {
        const ingredientsRecipe = document.createElement("span");
        ingredientsRecipe.classList.add("ingredients-recipe");

        ingredientsRecipe.innerHTML = `<b class="ingredient-name">${
          element.ingredient
        }</b>
        ${element.quantity ? ": " + element.quantity : `${" "}`}
        ${element.unit ? element.unit : `${" "}`}`;

        listIngredients.appendChild(ingredientsRecipe);
      });
    }

    ingredientsAndDescriptions.appendChild(listIngredients);
    ingredientsAndDescriptions.appendChild(recipeDescription);
    informationsRecipe.appendChild(ingredientsAndDescriptions);
    article.appendChild(informationsRecipe);
    recipesSection.appendChild(article);
  });
}

// Moteur de recherche principal
function filterRecipes(allrecipes) {
  const ingredientsFiltersSelected = Array.from(
    document.querySelectorAll(".ingredient-selection-filter")
  ).map((tag) => tag.textContent);
  const appliancesFiltersSelected = Array.from(
    document.querySelectorAll(".appliance-selection-filter")
  ).map((tag) => tag.textContent);
  const ustensilsFiltersSelected = Array.from(
    document.querySelectorAll(".ustensil-selection-filter")
  ).map((tag) => tag.textContent);
  const searchQuery = searchInput.value;

  let arrayFilters = [];
  let recipeDisplay = [];

  if (searchQuery.length >= 3) {
    allrecipes.forEach((element) => {
      const descriptions = element.description;
      const names = element.name;
      const ingredients = element.ingredients;
      if (
        descriptions.match(searchQuery.toLowerCase()) ||
        names.toLowerCase().match(searchQuery.toLowerCase()) ||
        ingredients.some((ingredients) =>
          ingredients.ingredient.toLowerCase().match(searchQuery.toLowerCase())
        )
      ) {
        arrayFilters.push(element);
      }
    });
  } else {
    arrayFilters = allrecipes;
  }

  arrayFilters.forEach((element) => {
    const appliance = element.appliance;
    const ustensils = element.ustensils;
    const ingredients = element.ingredients;

    if (
      appliancesFiltersSelected.every((e) =>
        appliance.toLowerCase().includes(e)
      ) &&
      ingredientsFiltersSelected.every((e) =>
        ingredients.some((ingredients) =>
          ingredients.ingredient.toLowerCase().includes(e)
        )
      ) &&
      ustensilsFiltersSelected.every((e) =>
        ustensils.some((ustensil) => ustensil.toLowerCase().includes(e))
      )
    ) {
      recipeDisplay.push(element);
    }
  });
  recipesSection.innerHTML = "";
  ingredientsFilterSection.innerHTML = "";
  cookingtoolsFilterSection.innerHTML = "";
  appliancesFilterSection.innerHTML = "";

  updatedFilters(recipeDisplay);
  displayRecipes(recipeDisplay);

  if (arrayFilters.length == 0 ) {
    recipesSection.innerHTML = `<p class="no-recipe">"Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson', etc."</p>`;
  }
}

searchInput.addEventListener("keyup", () => {
  filterRecipes(recipes);
});
filterRecipes(recipes);

function creationTag(classTag, currentElement) {
  // Création d'un tag quand un filtre est sélectionné
  const divFilter = document.createElement("div");
  divFilter.classList.add(classTag, "selection-filter");
  divFilter.textContent = currentElement.textContent;

  filterSelection.appendChild(divFilter);
  filtersList();
  filterRecipes(recipes);
}

function updatedFilters(recipeDisplay) {
  // Permet de mettre à jour la liste des tags quand une recette est recherchée
  const ingredientsFiteredArray = [];
  const ustensilsFiteredArray = [];
  const appliancesFiteredArray = [];

  const ListFiltersIngredients = recipeDisplay.flatMap((recipe) =>
    recipe.ingredients.map((allIngredients) =>
      allIngredients.ingredient.toLowerCase()
    )
  );
  const filtersIngredientsUniqueArray = [...new Set(ListFiltersIngredients)];

  filtersIngredientsUniqueArray.forEach((element) => {
    const buttonFilter = document.createElement("button");

    buttonFilter.classList.add("button-filter-ingredients", "button-tags");

    buttonFilter.textContent = element;

    ingredientsFilterSection.appendChild(buttonFilter);

    ingredientsFiteredArray.push(buttonFilter);

    buttonFilter.addEventListener("click", () => {
      creationTag("ingredient-selection-filter", buttonFilter);
    });
  });

  const ListFiltersUstensils = recipeDisplay.flatMap((recipe) =>
    recipe.ustensils.map((allUstensils) => allUstensils.toLowerCase())
  );
  const filtersUstensilsUniqueArray = [...new Set(ListFiltersUstensils)];

  filtersUstensilsUniqueArray.forEach((element) => {
    const buttonFilter = document.createElement("button");

    buttonFilter.classList.add("button-filter-cooking-tools", "button-tags");

    buttonFilter.textContent = element;

    cookingtoolsFilterSection.appendChild(buttonFilter);
    ustensilsFiteredArray.push(buttonFilter);

    buttonFilter.addEventListener("click", () => {
      creationTag("ustensil-selection-filter", buttonFilter);
    });
  });

  const ListFiltersAppliances = recipeDisplay.flatMap((recipe) =>
    recipe.appliance.toLowerCase()
  );
  const filtersAppliancesUniqueArray = [...new Set(ListFiltersAppliances)];

  filtersAppliancesUniqueArray.forEach((element) => {
    const buttonFilter = document.createElement("button");

    buttonFilter.classList.add("button-filter-appliances", "button-tags");

    buttonFilter.textContent = element;

    appliancesFilterSection.appendChild(buttonFilter);
    appliancesFiteredArray.push(buttonFilter);

    buttonFilter.addEventListener("click", () => {
      creationTag("appliance-selection-filter", buttonFilter);
    });
  });

  ingredientsFitered(ingredientsFiteredArray);
  ustensilsFitered(ustensilsFiteredArray);
  appliancesFitered(appliancesFiteredArray);
}

function filtersList() {
  // Permet de retirer les tags sélectionnés
  const filterSelectionArray = document.querySelectorAll(".selection-filter");

  filterSelectionArray.forEach((element) => {
    element.addEventListener("click", (e) => {

      e.target.remove();
      filterRecipes(recipes);
    });
  });
}

// Moteur de recherche pour les filtres ingrédients
function ingredientsFitered(recipe) {
  recipe.forEach((element) => {
    searchFilterIngredientsInput.addEventListener("keyup", () => {
      const searchQuery = searchFilterIngredientsInput.value;

      if (searchQuery.length > 3) {
        if (
          element.textContent.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      } else {
        element.style.display = "block";
      }
    });

    const filterSelectionArray = document.querySelectorAll(".selection-filter");

    filterSelectionArray.forEach((ingredient) => {
      if (element.textContent === ingredient.textContent) {
        element.remove();
      }
    });
  });
}

// Moteur de recherche pour les filtres ustensiles
function ustensilsFitered(recipe) {
  recipe.forEach((element) => {
    searchFilterUstensilsInput.addEventListener("keyup", () => {
      const searchQuery = searchFilterUstensilsInput.value;

      if (searchQuery.length > 3) {
        if (
          element.textContent.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      } else {
        element.style.display = "block";
      }
    });

    const filterSelectionArray = document.querySelectorAll(".selection-filter");

    filterSelectionArray.forEach((ustensil) => {
      if (element.textContent === ustensil.textContent) {
        element.remove();
      }
    });
  });
}

// Moteur de recherche pour les filtres Appareils

function appliancesFitered(recipe) {
  recipe.forEach((element) => {
    searchFilterAppliancesInput.addEventListener("keyup", () => {
      const searchQuery = searchFilterAppliancesInput.value;

      if (searchQuery.length > 3) {
        if (
          element.textContent.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      } else {
        element.style.display = "block";
      }
    });

    const filterSelectionArray = document.querySelectorAll(".selection-filter");

    filterSelectionArray.forEach((appliance) => {
      if (element.textContent === appliance.textContent) {
        element.remove();
      }
    });
  });
}
