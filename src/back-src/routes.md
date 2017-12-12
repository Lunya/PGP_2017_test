# Définitions des différentes routes

Route de base : `/api`
* `/register` :
	* **POST** : Crée un utilisateur
		* Données : JSON
			* user : string
			* password : string
		* résultats : JSON
			* error : string | null
			* id : int
			* token : string
* `/login` :
	* **POST** : Vérifie qu'un utilisateur peut se connecter
* `/user` :
	* **POST** : Récupère les données d'un utilisateur
		* Données : JSON
			* id : int
		* Résultats : JSON
			* name : string
			* mail : string
	* **PATCH** : Modification des données relatives a l'utilisateur
		* Données : JSON
			* id : int
		* Résultats : JSON
			* error : bool
	* **DELETE** : Suppression du compte de l'utilisateur
		* Données : JSON
			* id : int
		* Résultats : JSON
			* error : bool
* `/projects` :
	* **GET** : Récupère la liste des projets
		* Données : JSON
			* idUser : int
		* Résultats : JSON
			* projects : array
				* id : int
				* name : string
				* description : string
* `/project/:id` :
	* *id* : identifiant du projet
	* **GET** : Récupère les détails d'un projet
		* Données :
		* Résultats : JSON
			* id : int
			* name : string
			* description : string
			* git : string
			* begin : date
			* end : date
	* **PATCH** : Modification des attributs d'un projet
		* Données : JSON
			* name : string
			* description : string
			* git : string
			* begin : date
			* end : date
		* Résultats : JSON
	* **DELETE** : Supprime un projet dans la base de données
		* Données :
		* Résultats : JSON
			* error : bool
* `/project` :
	* **POST** : Création d'un nouveau projet
		* Données : JSON
			* name : string
			* description : string
			* git : string
			* begin : date
			* end : date
		* Résultats : JSON
			* error : bool
* `/userstories/:id` :
	* *id* : id du projet auquel appartiennent les user stories
	* **GET** : Récupère la liste des user stories
		* Données :
		* Résultats : JSON
			* description : string
			* difficulty : int
			* priority : int
	* **POST** : Ajouter une user storie au projet
		* Données :
			* id : int
			* description : string
			* difficulty : int
			* priority : int
		* Résultats : JSON
			* error : bool
* `/sprints/:id` :
	* *id* : id du projet auquel appartiennent les sprints
	* **GET** : Récupère la liste des sprints sur projet
		* Données :
		* Résultats :
	* **POST** : Insère un sprint dans le projet
		* Données :
		* Résultats :
* `/userstorie/:idProject/:idUS` :
	* *idProject* : id du projet auquel appartiennent les sprints
	* *idUS* : id de l'user storie dans le projet
	* **PATCH** : Modifier une user storie
		* Données :
		* Résultats : JSON
			* error : bool
	* **DELETE** : supprimer une user storie
		* Données :
		* Résultats : JSON
			* error : bool
* `/sprint/:idProject/:idSprint` :
	* *idProject* : id du projet auquel appartiennent les sprints
	* *idSprint* : id du sprint dans le projet
	* **POST** : Créer une tâche dans le sprint
		* Données :
			* id : int
			* us : int[]
			* description : string
			* statut : booléen
		* Résultats : JSON
			* error : bool
	* **GET** : Récupère le détail du sprint
		* Données :
		* Résultats :
	* **PATCH** : Modifier un sprint
		* Données :
		* Résultats :
	* **DELETE** : Supprimer un sprint
		* Données :
		* Résultats :
* `/sprint/:idProject/:idSprint/:idTache` :
	* *idProject* : id du projet auquel appartiennent les sprints
	* *idSprint* : id du sprint dans le projet
	* *idTache* : id de la tâche du sprint
	* **GET** : Récupère le détail d'une tâche d'un sprint
		* Données :
		* Résultats :
	* **PATCH** : Modifier les détails d'une tâche
		* Données :
		* Résultats :
	* **DELETE** : Supprimer une tâche
		* Données :
		* Résultats :
