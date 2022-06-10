import { recipes } from "../../data/recipes.js";

const recipesSection = document.querySelector(".section-list-recipes");

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

  const arrayIngredients = [];

  recipe.ingredients.forEach((ingredients) => {
    arrayIngredients.push(ingredients);

    article.innerHTML = `     
    <div class="picture-recipe"></div>
   `;

    informationsRecipe.innerHTML = `<div class="name-and-timer"><h2 class="name-recipe">${recipe.name}</h2><span class="timer-recipe">${recipe.time} min</span></div>`;

    recipeDescription.textContent = `${recipe.description}`;
  });

  if (articleId == recipe.id) {
    arrayIngredients.forEach((element) => {
      const ingredientsRecipe = document.createElement("span");
      ingredientsRecipe.classList.add("ingredients-recipe");

      ingredientsRecipe.innerHTML = `<b>${element.ingredient}</b>${
        element.quantity
          ? ": " + element.quantity
          : `${" "}` && element.quantite
          ? ": " + element.quantite
          : `${" "}`
      } ${element.unit ? element.unit : `${" "}`}`;

      listIngredients.appendChild(ingredientsRecipe);
    });
  }

  ingredientsAndDescriptions.appendChild(listIngredients);
  ingredientsAndDescriptions.appendChild(recipeDescription);
  informationsRecipe.appendChild(ingredientsAndDescriptions);
  article.appendChild(informationsRecipe);
  recipesSection.appendChild(article);
});
