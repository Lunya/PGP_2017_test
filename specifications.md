# Spécifications techniques sur le projet

On s'autorise à push directement les modifications apportées aux fichiers .md .
Cependant, le reste des commit (notamment le code) se feront en pull request.

## Organisation du dépôt
* `/e2e` : tests end to end
* `/src` : code de l'application
	* `/api` : API + backend
	* `/app` : frod end
* `/doc` : documentation de l'application


## Lancement du projet en développement
* Vérifier que les dépendances NPM sont à jour : `npm update`
* Vérifier que le fichier `.env` est bien créé à la racine du projet. Il doit contenir les champs : `NODE_PORT, DB_SERVER_HOST, DB_SERVER_USER, DB_SERVER_PASSWORD, DB_NAME`
* Compiler Angular et lancer le serveur node : `npm run-script dev`
	* Ou `pm2 start src/server.js --watch`
	* Et `ng build --dev --watch true`
* Arrêter le serveur : `pm2 delete 0`

En développement, les changements effectués sur les fichiers enregistrés seront automatiquement recompilés.

## Lancement du projet en production
* Vérifier que les dépendances NPM sont à jour : `npm update`
* Vérifier que les variables d'environnement suivantes sont bien définies : `NODE_ENV="production", NODE_PORT, DB_SERVER_HOST, DB_SERVER_USER, DB_SERVER_PASSWORD, DB_NAME`
* Compiler Angular et lancer le serveur node : `npm start`

## Technologies
* __Base de données__
  * MySQL (MariaDB)
* __Serveur WEB__
  * NodeJS (express)
* __Front__
  * AngularJS
  * Materialize
* __Test__
  * mocha
* __Build__
  * docker
