import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../objects/User';
import { Project } from '../../objects/Project';
import { Task } from '../../objects/Task';
import { HttpClient } from '@angular/common/http';

const projectsUrl = 'http://localhost:3000/api/projects';
const urlUser = 'http://localhost:3000/api/user';
const tasksUrl = 'http://localhost:3000/api/tasks';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
	private user: User;
	private userTasks = [];
	private allProjects = [];
	private taskTableView = true;
	private userStatus: any;

	@Input('project')
	public project: Project;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.loadTasks();
		this.loadProjects();
		this.userStatus = localStorage.getItem('user.status');
	}

	public setUser(userFrom) {
		this.user = userFrom;
		console.log(userFrom);
	}

	private loadProjects(): void {
		this.http.get<Project[]>(projectsUrl + '/' + this.user.id).subscribe((result) => {
			for (let i = 0; i < result.length; i++) {
				result[i].begin = new Date(result[i].begin);
				result[i].end = new Date(result[i].end);
			}
			this.allProjects = result;
			console.log(this.allProjects);
		}, error => console.log(error));
	}

	private loadTasks(): void {
		this.http.get<Task[]>(tasksUrl + '/' + this.project.id + '/' + this.user.name).subscribe((result) => {
			this.userTasks = result;
			console.log(this.userTasks);
		}, error => console.log(error));
	}

	deleteUser() {
		const urlRequest = urlUser + '/' + this.project.id + '/' + this.user.id;
		this.http.delete(urlRequest)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					window.location.reload();
				}
			}, err => {
				console.log(err);
			});
	}

	taskView(value) {
		this.taskTableView = value;
	}
}
