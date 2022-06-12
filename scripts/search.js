const articles = document.querySelectorAll(".article-recipe");
const searchInput = document.getElementById("searchbox-input");

searchInput.addEventListener("keyup", liveSearch);

function liveSearch() {
  let searchQuery = searchInput.value;

  articles.forEach((article) => {
    if (searchQuery.length > 3) {
      if (
        article.textContent.toLowerCase().includes(searchQuery.toLowerCase())
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
