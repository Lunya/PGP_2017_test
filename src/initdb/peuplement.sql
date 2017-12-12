INSERT INTO User (name,password,mail) VALUES ('Clément','password','clement.nerestan@gmail.com');
INSERT INTO User (name,password,mail) VALUES ('Jean','1234','jean.charles@gmail.com');
INSERT INTO User (name,password,mail) VALUES ('Lea','mdp123','lea.gauthier@gmail.com');

INSERT INTO Project (name, description, url, begin, end) VALUES ('Test','Test de la base de donnée','www.github.com','2017-11-19','2018-01-01');

INSERT INTO User_Project (id_project, id_user, status) VALUES (1,1,'OWNER');
INSERT INTO User_Project (id_project, id_user) VALUES (1,2);
INSERT INTO User_Project (id_project, id_user) VALUES (1,3);



INSERT INTO UserStory (id_project,description,difficulty, priority) VALUES (1,'Faire Marcher la BD',5, 1);
INSERT INTO UserStory (id_project,description,difficulty, priority) VALUES (1,'Faire Marcher le projet',8, 2);
INSERT INTO UserStory (id_project,description,difficulty, priority) VALUES (1,'Valider l UE',13, 3);
INSERT INTO UserStory (id_project,description,difficulty, priority) VALUES (1,'Valider le semestre',20,4);

INSERT INTO Sprint (id_project, begin, end) VALUES (1,'2017-11-19','2017-12-19');
INSERT INTO Sprint (id_project, begin, end) VALUES (1,'2017-12-24','2018-01-19');

INSERT INTO UserStory_Sprint (id_us,id_sprint) VALUES (1,1);
INSERT INTO UserStory_Sprint (id_us,id_sprint) VALUES (2,1);
INSERT INTO UserStory_Sprint (id_us,id_sprint) VALUES (3,2);
INSERT INTO UserStory_Sprint (id_us,id_sprint) VALUES (4,2);


INSERT INTO Task (id_sprint, description) VALUES(1,"Tache 1");
INSERT INTO Task (id_sprint, description) VALUES(1,"Tache 2");
INSERT INTO Task (id_sprint, description) VALUES(2,"Tache 3");
INSERT INTO Task (id_sprint, description) VALUES(2,"Tache 4");



/*INSERT INTO UserStory (id_us,id_project,description,difficulty, priority) VALUES (1,1,'Faire Marcher la BD',5, 1);
INSERT INTO UserStory (id_us,id_project,description,difficulty, priority) VALUES (2,1,'Faire Marcher le projet',8, 2);
INSERT INTO UserStory (id_us,id_project,description,difficulty, priority) VALUES (3,1,'Valider l UE',13, 3);
INSERT INTO UserStory (id_us,id_project,description,difficulty, priority) VALUES (4,1,'Valider le semestre',20,4);

INSERT INTO Sprint (id_sprint,id_project, begin, end) VALUES (1,1,'2017-11-19','2017-12-19');
INSERT INTO Sprint (id_sprint,id_project, begin, end) VALUES (2,1,'2017-12-24','2018-01-19');*/


/*INSERT INTO Task (id_task, id_sprint, description) VALUES(1,1,"Tache 1");
INSERT INTO Task (id_task, id_sprint, description) VALUES(2,1,"Tache 2");
INSERT INTO Task (id_task, id_sprint, description) VALUES(3,2,"Tache 3");
INSERT INTO Task (id_task, id_sprint, description) VALUES(4,2,"Tache 4");*/
