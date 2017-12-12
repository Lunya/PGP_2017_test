# Sprint 1

Date de début : 06/11/17  
Date de fin : 17/11/17

## Backlog lié
| Id | Description | Difficulté | Priorité | Fait |
|---:|:---|:---:|:---:|:---:|
| 1 | En tant qu'**utilisateur**, je veux créer un profil (username, password, adresse mail) | 2 | 1 | ✓ |
| 2 | En tant qu'**utilisateur**, je souhaite me connecter a mon profil en utilisant mon adresse mail et mon mot de passe | 1 | 1 | ✓ |
| 3 | En tant qu'**utilisateur connecté**, je souhaite créer un projet (nom, description, URL dépôt git associé, date de début/fin théorique du projet) | 5 | 1 | ✓ |
| 4 | En tant que **membre d'un projet**, je souhaite ajouter des membres a un projet | 1 | 2 | ✓ |
| 6 | En tant que **membre d'un projet**, je souhaite obtenir la liste des US du backlog | 1 | 2 | ✓ |
| 7 | En tant que **membre d'un projet**, je souhaite éditer le backlog (ajout, modification, suppression d'une US contenant (description, difficulté)) | 2 | 2 | ✓ |

## Tâches

| Id | US | Description | Statut |
|---:|:---:|:---|:---:|
| 1 | **-** | Créer un serveur NodeJS dans le fichier `src/server.js` qui va écouter sur le port 80 et répondre a des requêtes de type GET sur les URLs : `/` pour la page d'accueil, `/connection` pour la page de connexion et `/project` pour la page de gestion de projet. | DONE |
| 2 | **1,2,3,7** | Créer une liste de requêtes SQL puis s'en servir pour créer les tables dans la base de données. | DONE |
| 3 | **2** | Intégrer un module JavaScript de connexion sécurisé pour l'authentification des utilisateurs. | DONE |
| 4 | **-** | Créer une connexion a une base de données *MariaDB* en utilisant les variables d'environnement pour stocker les informations de connexion à celle-ci (identifiant, adresse, port, mot de passe). | DONE |
| 5 | **-** | Créer une vue principale Angular.js avec Bootstrap pour le design qui sera héritée par tout le reste de l'application. | DONE |
| 6 | **2** | Créer une vue pour la page d'accueil (connexion). | DONE |
| 7 | **1** | Créer un onglet sur la page d'accueil permettant de créer un profil. | DONE |
| 8 | **3** | Créer une vue du workspace de l'utilisateur connecté, contenant la liste des projets. | DONE |
| 9 | **3** | Créer une vue pour la création d'un projet (formulaire avec champs). | DONE |
| 10 | **3,7** | Créer une vue d'un projet sélectionné, avec backlog du projet. | DONE |
| 12 | **1** | Tester la création d'un compte. | DONE |
| 13 | **2** | Tester le module de connexion. | DONE |
| 14 | **3** | Tester la création d'un projet. | DONE |
| 15 | **1,2,3,7** | Tester la base de données avec des requêtes. | DONE |
| 16 | **-** | Créer un script de peuplement de base de données, supprimant puis réinsérant des entités dans la base de données. | DONE |
| 17 | **-** | Mettre en place `travis` qui appelera `mocha`. | DONE |
| 18 | **7** | Rendre le backlog modifiable (ajout, modification, et suppression d'une tâche). | DONE |
| 19 | **-** | Pouvoir trier les colonnes du backlog par ID, et Statut. | TODO |
| 20 | **4** | Pouvoir lier un utilisateur à un projet. | DONE |
| 21 | **6** | Voir la liste des contributeurs dans un projet | DONE |
| 22 | **-** | Créer les routes `/register, /login` | DONE |
| 23 | **-** | Créer les routes `/project, /project/:id, /userstories/:id` | DONE |
| 24 | **-** | Créer les routes `/userstorie/:idProject/:idUS` | DONE |
