import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../objects/Project';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProjectComponent } from './new-project/new-project.component';
import { HttpClient } from '@angular/common/http';
import { current } from 'codelyzer/util/syntaxKind';

const projectsUrl = 'http://localhost:3000/api/projects';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.css'],
	providers: [NgbDatepickerConfig]
})
export class WorkspaceComponent implements OnInit {
	private myProjects = [];
	private otherProjects = [];
	private projectsTableView = true;

	constructor(
		private modalService: NgbModal,
		private http: HttpClient
	) {}

	private loadProjects(status: string): void {
		this.http.get<Project[]>(projectsUrl + '/' + localStorage.getItem('user.id') + '/' + status).subscribe((result) => {
			for (let i = 0; i < result.length; i++) {
				result[i].begin = new Date(result[i].begin);
				result[i].end = new Date(result[i].end);
			}
			status === 'OWNER' ? this.myProjects = result : this.otherProjects = result;
			console.log(this.myProjects);
		}, error => console.log(error));
	}


	ngOnInit() {
		this.loadProjects('OWNER');
		this.loadProjects('DEVELOPER');
	}

	newProject() {
		const modalRef = this.modalService.open(NewProjectComponent);
		modalRef.result
			.then(res => {
				this.loadProjects('OWNER');
			}).catch(reason => console.log(reason));
	}

	projectsView(value) {
		this.projectsTableView = value;
	}
}
