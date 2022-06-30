const articles = document.querySelectorAll(".article-recipe");
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

function filtersList() {
  const filterSelectionArray = document.querySelectorAll(".selection-filter");
  

  filterSelectionArray.forEach((element) => {
    console.log(element);
  });
}

const filterSelection = document.querySelector(".filter-selection");

function creationTag(classTag, currentElement) {
  const divFilter = document.createElement("div");

  divFilter.classList.add(classTag, "selection-filter");
  divFilter.innerHTML = currentElement.innerHTML;
  currentElement.style.display = "none";
  filterSelection.appendChild(divFilter);
  filtersList();
}

// Moteur de recherche principal
searchInput.addEventListener("keyup", () => {
  const searchQuery = searchInput.value;

  articles.forEach((article) => {
    const articleName = article.querySelector(".name-recipe").innerHTML;
    const articleDescription = article.querySelector(
      ".recipe-description"
    ).innerHTML;
    const articleIngredient =
      article.querySelector(".ingredient-name").innerHTML;

    if (searchQuery.length > 3) {
      if (
        // console.log(article.textContent)
        articleName.toLowerCase().match(searchQuery.toLowerCase()) ||
        articleDescription.toLowerCase().match(searchQuery.toLowerCase()) ||
        articleIngredient.toLowerCase().match(searchQuery.toLowerCase())
      ) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    } else {
      article.style.display = "block";
    }
  });
});

// Moteur de recherche pour les filtres ingrédients

const buttonIngredientsFilter = document.querySelectorAll(
  ".button-filter-ingredients"
);

buttonIngredientsFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("ingredient-selection-filter", element);

    // const divFilter = document.createElement("div");
    // divFilter.classList.add("ingredient-selection-filter", "selection-filter");
    // divFilter.innerHTML = element.innerHTML
    // filterSelection.appendChild(divFilter)
  });
});

searchFilterIngredientsInput.addEventListener("keyup", () => {
  const searchQuery = searchFilterIngredientsInput.value;
  const ingredientFilter = document.querySelectorAll(
    ".button-filter-ingredients"
  );

  ingredientFilter.forEach((element) => {
    if (searchQuery.length > 3) {
      if (
        // console.log(article.textContent)
        element.innerHTML.toLowerCase().match(searchQuery.toLowerCase())
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
const buttonUstensilsFilter = document.querySelectorAll(
  ".button-filter-cooking-tools"
);

buttonUstensilsFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("ustensil-selection-filter", element);
  });
});

searchFilterUstensilsInput.addEventListener("keyup", () => {
  const searchQuery = searchFilterUstensilsInput.value;
  const ustensilFilter = document.querySelectorAll(
    ".button-filter-cooking-tools"
  );

  ustensilFilter.forEach((element) => {
    if (searchQuery.length > 3) {
      if (element.innerHTML.toLowerCase().match(searchQuery.toLowerCase())) {
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
const buttonApplicanceFilter = document.querySelectorAll(
  ".button-filter-appliances"
);

buttonApplicanceFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("appliance-selection-filter", element);
  });
});

searchFilterAppliancesInput.addEventListener("keyup", () => {
  const searchQuery = searchFilterAppliancesInput.value;

  buttonApplicanceFilter.forEach((element) => {
    if (searchQuery.length > 3) {
      if (element.innerHTML.toLowerCase().match(searchQuery.toLowerCase())) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    } else {
      element.style.display = "block";
    }
  });
});
