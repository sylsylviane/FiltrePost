let categorie = 3;
let bouton_categorie = document.querySelectorAll(".filtre__bouton button"); //
// Ajoute un écouteur d’événements pour chaque bouton de catégorie
for (const elm of bouton_categorie) {
  elm.addEventListener("mousedown", function (e) {
    // Lorsqu’un bouton est cliqué, on récupère l’ID de la catégorie associée
    categorie = e.target.dataset.id;
    console.log("Catégorie sélectionnée: ", categorie);
    // Appel de la fonction pour extraire les cours de la catégorie sélectionnée
    extraire_categories();
    // Lorsque le DOM est complètement chargé, on lance la récupération des cours (au cas où une catégorie serait pré-sélectionnée)
    document.addEventListener("DOMContentLoaded", extraire_cours);
    // Fonction pour extraire les cours via l’API REST de WordPress

    function extraire_categories() {
      // Construction de l’URL pour appeler l’API REST en fonction de la catégorie
      fetch(
        `http://localhost/31w/wp-json/wp/v2/posts?categories=${categorie}&per_page=30`
      )
        // Conversion de la réponse en JSON
        .then((response) => response.json())
        .then((data) => {
          // Affiche les articles récupérés pour déboguer
          console.log("Articles récupérés: ", data);
          afficherArticles(data); // Appel à la fonction pour afficher les articles
        })
        .catch((error) =>
          console.error("Erreur lors de l’extraction des cours: ", error)
        );
      // En cas d’erreur
    }
  });
}

function afficherArticles(articles) {
  const conteneurCours = document.querySelector(".filtre__resultat");
  console.log(conteneurCours);
  conteneurCours.innerHTML = "";
  articles.forEach((article) => {
    // Crée un nouvel élément div pour chaque article
    const item = document.createElement("div");
    item.className = "cours-item"; // Ajoute une classe pour la mise en forme

    // Ajoute le titre de l’article dans le div
    item.textContent = article.title.rendered;

    // Ajoute le div créé dans le conteneur des cours
    conteneurCours.appendChild(item);
  });
}
