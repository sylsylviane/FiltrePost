//Fonction auto exécutante
(function(){
    let filtre__bouton = document.querySelectorAll(".filtre__bouton button");
    for(const elm of filtre__bouton){
      elm.addEventListener("click", function(e){
        categorie = e.target.dataset.id;
        console.log(categorie);
        extraire_cours();

        document.addEventListener("DOMContentLoaded", extraire_cours);

        function extraire_cours(){
          fetch (`http://localhost/31w/wp-json/wp/v2/posts?categories=${categorie}&per_page=30`).then((response) => response.json()).then((data) => {

            console.log("Articles récupérés: ", data);
            afficherArticles(data); // Appel à la fonction pour afficher les articles
          }).catch((error) => console.error("Erreur lors de l’extraction des cours: ", error)); // En cas d’erreur 
        }

        function afficherArticles(articles){
          const conteneurCours = document.getElementById("contenu__restapi");
          conteneurCours.innerHTML = "";

          articles.forEach((article)=>{
            const item = document.createElement("div");
            item.className = "cours-item";
            item.textContent = article.title.rendered;
            conteneurCours.appendChild(item);
          });
        }
      })



    }
})();


