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

const buttonUstensilsFilter = document.querySelectorAll(
  ".button-filter-cooking-tools"
);

const buttonIngredientsFilter = document.querySelectorAll(
  ".button-filter-ingredients"
);

const buttonApplicanceFilter = document.querySelectorAll(
  ".button-filter-appliances"
);

const filterSelection = document.querySelector(".filter-selection");

function creationTag(classTag, currentElement) {
  const divFilter = document.createElement("div");
  divFilter.classList.add(classTag, "selection-filter");
  divFilter.textContent = currentElement.textContent;

  currentElement.style.display = "none";
  filterSelection.appendChild(divFilter);
  filtersList();
}

// function creationRestoredTag(classTag, tagRestored) {
//   const buttonTag = document.createElement("button");
//   buttonTag.classList.add(classTag);
//   buttonTag.innerHTML = tagRestored;
//   return buttonTag;
// }


function filtersList() {
  const filterSelectionArray = document.querySelectorAll(".selection-filter");



  filterSelectionArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      const tagRestored = e.target.textContent;

      switch (e.target.classList.value) {
        case "ingredient-selection-filter selection-filter":
        // const createdButtonIngredients = creationRestoredTag(
        //   "button-filter-ingredients",
        //   tagRestored
        // );
        // document.querySelector('.ingredients-filter').appendChild(createdButtonIngredients)  
        Array.from(document.querySelectorAll('.ingredients-filter button')).forEach(element => {
          if (element.textContent === tagRestored) {
            element.style.display = ""
          }
        })
        break;

        case "ustensil-selection-filter selection-filter":
        Array.from(document.querySelectorAll('.ustensils-filter button')).forEach(element => {
          if (element.textContent === tagRestored) {
            element.style.display = ""
          }
        })
        break;
        
        case "appliance-selection-filter selection-filter":
        Array.from(document.querySelectorAll('.appliances-filter button')).forEach(element => {
          if (element.textContent === tagRestored) {
            element.style.display = ""
          }
        })
        break;
      }

      e.target.remove();
    });
  });
}

// Moteur de recherche principal
searchInput.addEventListener("keyup", () => {
  const searchQuery = searchInput.value;

  articles.forEach((article) => {
    const articleName = article.querySelector(".name-recipe").textContent;
    const articleDescription = article.querySelector(
      ".recipe-description"
    ).textContent;
    const articleIngredient =
      article.querySelector(".ingredient-name").textContent;

    if (searchQuery.length > 3) {
      if (
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

buttonIngredientsFilter.forEach((element) => {
  element.addEventListener("click", () => {
    creationTag("ingredient-selection-filter", element);
  });

  searchFilterIngredientsInput.addEventListener("keyup", () => {
    const searchQuery = searchFilterIngredientsInput.value;

    if (searchQuery.length > 3) {
      if (element.textContent.toLowerCase().match(searchQuery.toLowerCase())) {
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
      if (element.textContent.toLowerCase().match(searchQuery.toLowerCase())) {
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
      if (element.textContent.toLowerCase().match(searchQuery.toLowerCase())) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    } else {
      element.style.display = "block";
    }
  });
});
