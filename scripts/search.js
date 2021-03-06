import { recipes } from "../data/recipes.js";

const arrayIngredientsForFilters = [];
const arrayCookingtoolsForFilters = [];
const arrayAppliancesForFilters = [];

const searchInput = document.getElementById("searchbox-input");
const searchFilterIngredientsInput = document.getElementById(
  "search-filter-ingredient-input"
);

const searchFilterAppliancesInput = document.getElementById(
  "search-filter-appliance-input"
);

const searchFilterUstensilsInput = document.getElementById(
  "search-filter-ustensil-input"
);

const buttonUstensilsFilter = document.querySelectorAll(
  ".button-filter-cooking-tools"
);

const buttonIngredientsFilter = document.querySelectorAll(
  ".button-filter-ingredients"
);

const buttonApplicanceFilter = document.querySelectorAll(
  ".button-filter-appliances"
);

const recipesSection = document.querySelector(".section-list-recipes");
const filterSelection = document.querySelector(".filter-selection");

function displayRecipes(recipeDisplay) { // affichage des recettes
  
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

function filterRecipes(allrecipes){

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
  
  let arrayFilters = []
  let recipeDisplay = [];

  if (searchQuery.length >= 3) {
    
    allrecipes.forEach(element => {

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
    
  }else{
    arrayFilters = allrecipes
  }
  
  arrayFilters.forEach(element => {

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
  
  displayRecipes(recipeDisplay);
  updatedFilters(recipeDisplay)
  if (arrayFilters.length == 0) {
    recipesSection.innerHTML = "Aucune recette n'a ??t?? trouv??e";
  }
}

searchInput.addEventListener("keyup", () => {
  filterRecipes(recipes)
});

function creationTag(classTag, currentElement) {  // Cr??ation d'un tag quand un filtre est s??lectionn??
  const divFilter = document.createElement("div");
  divFilter.classList.add(classTag, "selection-filter");
  divFilter.textContent = currentElement.textContent;

  currentElement.style.display = "none";
  filterSelection.appendChild(divFilter);
  filtersList();
  filterRecipes(recipes)
}

function updatedFilters(recipeDisplay) {  // Permet de mettre ?? jour la liste des tags quand une recette est recherch??e
  const ListFiltersIngredients = recipeDisplay.flatMap((recipe) =>
    recipe.ingredients.map((allIngredients) =>
     allIngredients.ingredient.toLowerCase()
    )
  );
  const filtersIngredientsUniqueArray = [...new Set(ListFiltersIngredients)];

  const ingredients = Array.from(
    document.querySelectorAll(".ingredients-filter button")
  ).filter(
    (element) =>
      filtersIngredientsUniqueArray.indexOf(element.textContent) !== -1
  );

  document
    .querySelectorAll(".button-filter-ingredients")
    .forEach((elementNone) => {
      elementNone.style.display = "none";
      ingredients.forEach((elementBlock) => {
        elementBlock.style.display = "block";
      });
    });

    const ListFiltersUstensils = recipeDisplay.flatMap((recipe) => recipe.ustensils.map((allUstensils) =>
    allUstensils.toLowerCase()))
    const filtersUstensilsUniqueArray  = [...new Set(ListFiltersUstensils)];
    
    const ustensils = Array.from(
      document.querySelectorAll(".ustensils-filter button")
    ).filter(
      (element) =>
      filtersUstensilsUniqueArray.indexOf(element.textContent) !== -1
    );
    
    document
      .querySelectorAll(".button-filter-cooking-tools")
      .forEach((elementNone) => {
        elementNone.style.display = "none";
        ustensils.forEach((elementBlock) => {
          
          elementBlock.style.display = "block";
        });
      });

      const ListFiltersAppliances = recipeDisplay.flatMap((recipe) => recipe.appliance.toLowerCase())
    const filtersAppliancesUniqueArray  = [...new Set(ListFiltersAppliances)];
  
    const appliances = Array.from(
      document.querySelectorAll(".appliances-filter button")
    ).filter(
      (element) =>
      filtersAppliancesUniqueArray.indexOf(element.textContent) !== -1
    );
  
    document
      .querySelectorAll(".button-filter-appliances")
      .forEach((elementNone) => {
        elementNone.style.display = "none";
        appliances.forEach((elementBlock) => {
          
          elementBlock.style.display = "block";
        });
      });


}

function filtersList() { // Permet de filtrer les recettes avec les tags s??lectionn??s
  const filterSelectionArray = document.querySelectorAll(".selection-filter");

  // const ingredientsFiltersSelected = Array.from(
  //   document.querySelectorAll(".ingredient-selection-filter")
  // ).map((tag) => tag.textContent);
  // const appliancesFiltersSelected = Array.from(
  //   document.querySelectorAll(".appliance-selection-filter")
  // ).map((tag) => tag.textContent);
  // const ustensilsFiltersSelected = Array.from(
  //   document.querySelectorAll(".ustensil-selection-filter")
  // ).map((tag) => tag.textContent);

  // const recipeDisplay = recipes.filter(
  //   (recipe) =>
  //     appliancesFiltersSelected.every((e) =>
  //       recipe.appliance.toLowerCase().includes(e)
  //     ) &&
  //     ingredientsFiltersSelected.every((e) =>
  //       recipe.ingredients.some((ingredients) =>
  //         ingredients.ingredient.toLowerCase().includes(e)
  //       )
  //     ) &&
  //     ustensilsFiltersSelected.every((e) =>
  //       recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(e))
  //     )
  // );

  recipesSection.innerHTML = "";

  // displayRecipes(recipeDisplay);
 

  filterSelectionArray.forEach((element) => {
    element.addEventListener("click", (e) => {
    //   const tagRestored = e.target.textContent;
    //   switch (e.target.classList.value) {
    //     case "ingredient-selection-filter selection-filter":
 
    //       Array.from(
    //         document.querySelectorAll(".ingredients-filter button")
    //       ).forEach((element) => {
    //         if (element.textContent === tagRestored) {
    //           element.style.display = "";
    //         }
    //       });
    //       break;

    //     case "ustensil-selection-filter selection-filter":
    //       Array.from(
    //         document.querySelectorAll(".ustensils-filter button")
    //       ).forEach((element) => {
    //         if (element.textContent === tagRestored) {
    //           element.style.display = "";
    //         }
    //       });
    //       break;

    //     case "appliance-selection-filter selection-filter":
    //       Array.from(
    //         document.querySelectorAll(".appliances-filter button")
    //       ).forEach((element) => {
    //         if (element.textContent === tagRestored) {
    //           element.style.display = "";
    //         }
    //       });
    //       break;
    //   }
      e.target.remove();
      // filtersList();
      filterRecipes(recipes)
    });
  });
}

// Moteur de recherche pour les filtres ingr??dients
buttonIngredientsFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("ingredient-selection-filter", element);
    
  });

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
});

// Moteur de recherche pour les filtres ustensiles
buttonUstensilsFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("ustensil-selection-filter", element);
   
  });

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
});

// Moteur de recherche pour les filtres Appareils
buttonApplicanceFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("appliance-selection-filter", element);
    
  });

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
});


