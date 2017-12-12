import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SprintComponent } from './sprint/sprint.component';
import { ProjectComponent } from './project/project.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../popups/add-user/add-user.component';
import { NewSprintComponent } from '../popups/new-sprint/new-sprint.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HttpClient } from '@angular/common/http';
import { Project } from '../objects/Project';
import { User } from '../objects/User';

const projectUrl = 'http://localhost:3000/api/project';
const sprintUrl = 'http://localhost:3000/api/sprint';
const userUrl = 'http://localhost:3000/api/user';
//const urlStatus = 'http://localhost:3000/api/status';

@Component({
	selector: 'app-home-project',
	templateUrl: './home-project.component.html',
	styleUrls: ['./home-project.component.css']
})
export class HomeProjectComponent implements OnInit, OnDestroy {
	private subPar: any;

	private project: Project;
	private developers = new Array<User>();
	private usSprint = [];
	//private userStatus: any;

	@ViewChild(SidebarComponent)
	private sidebar: SidebarComponent;

	@ViewChild('dynamicContent', { read: ViewContainerRef })
	private pageContent: ViewContainerRef;


	constructor(
		private route: ActivatedRoute,
		private cfr: ComponentFactoryResolver,
		private modalService: NgbModal,
		private http: HttpClient,
		private el: ElementRef
	) { }

	private updateSidebar(): void {
		this.http.get(sprintUrl + 's/' + this.project.id).subscribe((sprints: any) => {
			this.http.get(userUrl + 's/' + this.project.id).subscribe((users: any) => {
				this.sidebar.setContent({
					sprints: sprints,
					users: users
				});
			}, error => console.log(error));
		}, error => console.log(error));
	}

	ngOnInit() {
		this.subPar = this.route.params.subscribe(params => {
			this.project = new Project();
			this.project.id = params['id'];
			this.http.get(projectUrl + '/' + this.project.id).subscribe((result: any) => {
				this.project = result;
				this.sidebar.onSelectProject.emit(); // update project on load
				this.updateSidebar();
			}, error => console.log(error));

		});

		const projectComponentFactory = this.cfr.resolveComponentFactory(ProjectComponent);

		const sprintComponentFactory = this.cfr.resolveComponentFactory(SprintComponent);
		const userComponentFactory = this.cfr.resolveComponentFactory(UserInfoComponent);

		this.sidebar.onSelectProject.subscribe(() => {
			this.pageContent.remove();
			const projectFactory = this.pageContent.createComponent(projectComponentFactory);
			projectFactory.instance.project = this.project;
			this.usSprint = projectFactory.instance.usSprintSelection;
		});


		this.sidebar.onSelectSprint.subscribe(sprint => {
			this.pageContent.remove();
			const sprintComponent = this.pageContent.createComponent(sprintComponentFactory);
			sprintComponent.instance.project = this.project;
			sprintComponent.instance.setSprint(sprint);
		});

		this.sidebar.onNewSprint.subscribe(() => {
			// if (projectFactory.instance.usSprintSelection.count > 0) {
			const modalRef = this.modalService.open(NewSprintComponent);
			modalRef.componentInstance.project = this.project;
			modalRef.componentInstance.usSelection = this.usSprint;
			modalRef.result
				.then(value => {
					this.updateSidebar();
					this.resetUsSelection();
				}).catch(reason => console.log(reason));
		});

		this.sidebar.onSelectUser.subscribe(user => {
			this.pageContent.remove();
			const userComponent = this.pageContent.createComponent(userComponentFactory);
			userComponent.instance.project = this.project;
			userComponent.instance.setUser(user);
		});

		this.sidebar.onAddUser.subscribe(() => {
			const modalRef = this.modalService.open(AddUserComponent);
			modalRef.componentInstance.project = this.project;
			modalRef.result
				.then(value => {
					this.updateSidebar();
					console.log(value);
				}).catch(reason => console.log(reason));
		});
	}

	resetUsSelection() {
		let selection = this.el.nativeElement.querySelectorAll('.usID');
		for(let i = 0 ; i < selection.length; i ++ ) {
			selection[i].classList.remove('btn-primary');
			selection[i].classList.add('btn-outline-secondary');
		}
	}

	ngOnDestroy() {
		this.subPar.unsubscribe();
	}
}
