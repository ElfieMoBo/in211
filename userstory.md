<span style="color:rgb(120, 150, 50);"><font size="5">**Fonctionnalités demandées**</span></font>

* [x] ETQU, sur la page d'accueil je vois une liste de 100 films ou plus triés selon un critère au choix
    * [x] Avoir encore plus de films disponibles ?
    * [x] N'afficher qu'un certain nombre de films et avoir un système de pages pour en afficher plus
    * [x] Revoir les critères pour mieux les trier

* [x] ETQU, j'ai accès à une page ou je peux manuellement ajouter des films sur mon site
    * [x] Reconsturire la base de données avec les critères dont je me suis servie dans l'affichage
    * [x] Rendre l'affichage meilleur 
    * [x] Avoir un lien direct jusqu'à cette page sur la page principale
    * [x] Gérer les genres
    * [x] Suppression du film
    * [x] Afficher les notes avec un système d'étoile qu'on met en orange
 
* [x] ETQU, sur la page d'accueil je peux faire une recherche par nom sur les films

* [x] ETQU, sur la page d'accueil quand je clique sur un film, j'arrive sur une page dédiée qui me présente les détails du film / ETQU, sur la page d'accueil je peux directement voir les détails d'un film
    * [x] Afficher une belle mise en page
    * [x] Essayer d'afficher le système d'étoiles ?

* [x] ETQU, sur la page de détails d'un film, je peux ajouter un commentaire qui contient une note au nom d’un user 
    * [x] Regarder comment stocker les commentaires 
    * [x] Stocker plusieurs commentaires ? Pour l'instant, juste un seul

* [x] ETQU, sur la page d’accueil je vois une liste de films triés par nombre de likes

<span style="color:rgb(120, 150, 50);"><font size="5">**Fonctionnalités supplémentaires**</span></font>

* [x] Le site permet de changer d'utilisateur et les recommandations sont stockées par utilisateur (on ne demande pas nécessairement un système complexe d'authentification, mais un moyen simple de changer d'utilisateur)
  * [x] Changer d'utilisateur
  * [x] Se déconnecter
  * [x] Garder les recommandations par personnes
  * [x] Ajouter et supprimer un profil

* [x] La liste des films en page d'accueil est paginée ou possède un bouton "Load more" afin d'éviter d'éventuels problèmes de performance s'il y a beaucoup de films à afficher

<span style="color:rgb(120, 150, 50);"><font size="5">**Bugs**</span></font>

* [x] Quand on recherche un film ajouté par un autre utilisateur $\rightarrow$ `too many re-renders`
* [ ] Quand on se déconnecte $\rightarrow$ connection à un ancien user...
* [ ] Message d'erreur affiché à chaque fois quand on créer un user