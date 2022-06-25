const articles = document.querySelectorAll(".article-recipe");
const searchInput = document.getElementById("searchbox-input");

searchInput.addEventListener("keyup", liveSearch);
function liveSearch() {
  let searchQuery = searchInput.value;

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
}
