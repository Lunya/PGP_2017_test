import { Component, OnInit, NgZone, Input } from '@angular/core';
import { UserStory } from '../../objects/UserStory';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../objects/Project';
import { EditProjectComponent } from './edit-project/edit-project.component';

const url_uStory = 'http://localhost:3000/api/userstory';
const url_uStories = 'http://localhost:3000/api/userstories';
const urlProject = 'http://localhost:3000/api/project';
const urlStatus = 'http://localhost:3000/api/status';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
	providers: [NgbDatepickerConfig]
})


export class ProjectComponent implements OnInit {
	private addUsMode = false;
	private usList = [];
	private userStory = new UserStory();
	private previousUserStory = new Array<UserStory>();
	public usSprintSelection = [];
	private userStatus: any;

	@Input('project')
	public project: Project;

	// private idUS = 1;
	// private index = 10;

	private repositoryForm: FormGroup;
	// private userStoryForm: FormGroup;

	constructor(
		private el: ElementRef,
		private fb: FormBuilder,
		private lc: NgZone,
		private http: HttpClient,
		private modalService: NgbModal,
	) { }


	ngOnInit() {
		this.loadUserStories();
	}


	loadUserStories(): void {
		this.http.get<UserStory[]>(url_uStories + '/' + this.project.id).subscribe((result) => {
			this.usList = result;
			//this.loadPermissions();
		}, error => console.log(error));
	}

	loadPermissions() {
		this.http.get<any>(urlStatus + '/' + localStorage.getItem('user.id') + '/' + this.project.id).subscribe((result) => {
			if (result) {
				localStorage.setItem('user.status', result.status);
				this.userStatus = localStorage.getItem('user.status');
			}
			/*const button = this.el.nativeElement.querySelectorAll('button');
			for (let i = 0; i < button.length; ++i) {
				console.log(i);
				button[i].setAttribute('disabled','true');
			}*/
			else {
				const td_priority = this.el.nativeElement.querySelectorAll('td.priority');
				for (let i = 0; i < td_priority.length; ++i) {
					td_priority[i].classList.remove('editable');
				}
			}
		}, error => console.log(error));
	}


	resetModel() {
		this.userStory.id = -1;
		this.userStory.description = '';
		this.userStory.difficulty = 0;
		this.userStory.priority = 0;
		this.userStory.state = 'TODO';
		this.userStory.onEdit = false;
	}

	onEditRow(ligne) {
		const tr_id = '#US' + ligne['id'];
		ligne['onEdit'] = true;
		this.previousUserStory.push(Object.assign(new UserStory(), ligne));
		this.el.nativeElement.querySelector(tr_id).classList.add('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'true');
		}
	}

	onBackRow(ligne) {
		const tr_id = '#US' + ligne['id'];
		const save = this.previousUserStory.filter((us) => us.id === ligne.id)[0];
		ligne['description'] = save.description;
		ligne['difficulty'] = save.difficulty;
		ligne['priority'] = save.priority;
		ligne['state'] = save.state;
		ligne['onEdit'] = false;
		this.previousUserStory.splice(this.previousUserStory.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
	}

	onConfirmRow(ligne) {
		const tr_id = '#US' + ligne['id'];
		const urlRequest = url_uStory + '/' + this.project.id + '/' + ligne['id'];
		this.http.patch(urlRequest, ligne)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				}
			}, err => {
				console.log(err);
			});
		const save = this.previousUserStory.filter((us) => us.id === ligne.id)[0];
		this.previousUserStory.splice(this.previousUserStory.indexOf(save), 1);
		this.el.nativeElement.querySelector(tr_id).classList.remove('table-info');
		const tab = this.el.nativeElement.querySelectorAll(tr_id + ' .editable');
		for (let i = 0; i < tab.length; ++i) {
			tab[i].setAttribute('contenteditable', 'false');
		}
		ligne['onEdit'] = false;
	}

	onDeleteRow(ligne) {
		const urlRequest = url_uStory + '/' + this.project.id + '/' + ligne['id'];
		this.http.delete(urlRequest)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					const i = this.usList.indexOf(ligne);
					this.usList.splice(i, 1);
				}
			}, err => {
				console.log(err);
			});
	}

	onEdit() {
		this.addUsMode = true;
		// this.backlog.push(this.initItems());
	}

	onBack() {
		this.addUsMode = false;
	}

	onConfirm() {
		this.addUsMode = false;
		const urlRequest = url_uStories + '/' + this.project.id;
		this.http.post(urlRequest, this.userStory)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				} else {
					this.loadUserStories();
				}
			}, err => {
				console.log(err);
			});
		this.resetModel();
	}

	selectUS(ligne) {
		if (!ligne.onEdit) {
			const tr_id = '#US' + ligne['id'] + ' button';
			const classes = this.el.nativeElement.querySelector(tr_id).classList;
			if (classes.contains('btn-primary')) {
				classes.remove('btn-primary');
				classes.add('btn-outline-secondary');
				this.usSprintSelection.splice(this.usSprintSelection.indexOf(ligne), 1);
			} else {
				classes.add('btn-primary');
				classes.remove('btn-outline-secondary');

				this.usSprintSelection.push(ligne);
			}
		}

	}


	deleteProject() {
		const urlRequest = urlProject + '/' + this.project.id;
		this.http.delete(urlRequest)
			.subscribe((result: any) => {
				if (result.error) {
					console.log(result);
				}
			}, err => {
				console.log(err);
			});
	}

	editProject() {
		const modalRef = this.modalService.open(EditProjectComponent);
		modalRef.componentInstance.project = this.project;
		modalRef.result
			.then(res => {
				//this.loadProjects('OWNER');
			}).catch(reason => console.log(reason));

	}

	leaveProject() {

	}

}
