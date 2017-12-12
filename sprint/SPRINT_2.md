# Sprint 2

Date de début :  
Date de fin :

## Backlog lié
| Id | Description | Difficulté | Priorité | Fait |
|---:|:---|:---:|:---:|:---:|
| 8 | En tant que **membre d'un projet**, je souhaite créer des sprints (numéro, sélection des user stories que l'on souhaite associer au sprint via le backlog, date de début/fin) | 2 | 2 | ✓ |
| 5 | En tant que **propriétaire**, je souhaite éditer les priorités des US | 1 | 3 | ✗ |
| 9 | En tant que **membre d'un projet**, je souhaite créer des tâches dans un sprint (description, état{done, not done}, lien vers le dépôt) | 3 | 3 | ✗ |
| 10 | En tant que **membre d'un projet**, je souhaite modifier la description et l'état des tâches d'un sprint | 2 | 3 | ✗ |

## Tâches

| Id | US | Description | Statut |
|---:|:---:|:---|:---:|
| 1 | **-** | Créer les routes `/sprints/:id, /sprint/:idProject/:idSprint` | DONE |
| 2 | **-** | Ajouter l'affectation du status propriétaire pour un membre du projet qui doit lui permettre exclusivement d'éditer les priorités des US (ajout d'une colonne status dans la table d'association Project_User) | DONE |
| 3 | **-** | Créer la vue d'un sprint séléctionné (liste des US associé  -> mini backlog, liste des tâches, dates, durée) | DONE |
| 4 | **-** | Rendre éditable le tableau des tâches d'un sprint | DONE |
| 5 | **-** | Rendre séléctionnable les US du backlog pour créer un sprint à partir d'une séléction | DONE |
| 6 | **-** | Rédaction des tests e2e pour chacune des US | DONE |
| 7 | **-** | Tester l'édition des priorités des US | TODO |
| 8 | **-** | Tester la création de sprint | DONE |
| 9 | **-** | Tester la création de tâche dans un sprint | TODO |
| 10 | **-** | Tester la modification de tâche d'un sprint | TODO |
| 11 | **-** | Créer les route `/tasks/:idSprint, /task/:idSprint/:idTask` | DONE |
| 12 | **-** | Rajouter une table task dans la base de données pgp | DONE |
