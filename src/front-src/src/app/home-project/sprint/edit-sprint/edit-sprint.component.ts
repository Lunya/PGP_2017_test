import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../objects/Project';
import { Sprint } from '../../../objects/Sprint';


const sprintUrl = 'http://localhost:3000/api/sprint';

@Component({
	selector: 'app-edit-sprint',
	templateUrl: '../../../popups/new-sprint/popup-sprint.component.html',
	providers: [NgbDatepickerConfig]
})
export class EditSprintComponent implements OnInit, OnDestroy {
	private sprintForm: FormGroup;
	private formAction: string;
	private dateModel;

	@Input('project')
	public project: Project;

	@Input('sprint')
	public sprint: Sprint;

	public usSelection = [];

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private http: HttpClient,
		private datepickerConfig: NgbDatepickerConfig
	) {}

	ngOnInit() {
		console.log('AddUserComponent initialized');
		console.log(this.usSelection);
		let endDate = new Date(this.sprint.end);
		let beginDate = new Date(this.sprint.begin);
		this.sprintForm = this.fb.group({
			begin: [this.sprint.begin, [Validators.required/*, CustomValidators.dateISO*/]],
			duration: [(endDate.getTime() - beginDate.getTime())/1000/60/60/24, [Validators.required, CustomValidators.gte(1)]]
		});
		this.formAction = 'Edit';
	}

	ngOnDestroy() {
		console.log('AddUserComponent destroyed');
	}

	ngOnSubmit(event): void {
		event.preventDefault();
		const values = this.sprintForm.value;
		console.log(this.project);
		values.idProject = this.project.id;
		values.begin = new Date(values.begin.year, values.begin.month, values.begin.day);
		values.end = new Date(values.begin.getTime() + values.duration * 1000 * 60 * 60 * 24);
		values['usSprint'] = this.usSelection;
		console.log(values);
		this.http.patch(sprintUrl + '/' + this.project.id + '/' + this.sprint.id, values).subscribe((value: any) => {
			if (value.error) {
				console.log(value);
			} else {
				console.log(value);
				this.activeModal.close('Form validated');
			}
		}, error => console.log(error));
	}
}
