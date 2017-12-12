import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient } from '@angular/common/http';

import { Project } from '../../objects/Project';

const sprintUrl = 'http://localhost:3000/api/sprint';
const usSprintUrl = 'http://localhost:3000/api/userstories';

@Component({
	selector: 'app-new-sprint',
	templateUrl: './popup-sprint.component.html',
	providers: [NgbDatepickerConfig]
})
export class NewSprintComponent implements OnInit, OnDestroy {
	private sprintForm: FormGroup;
	private formAction: string;
	private dateModel;

	@Input('project')
	public project: Project;

	public usSelection = [];

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private http: HttpClient,
		private datepickerConfig: NgbDatepickerConfig
	) {
		this.sprintForm = this.fb.group({
			begin: [new Date(), [Validators.required/*, CustomValidators.dateISO*/]],
			duration: [1, [Validators.required, CustomValidators.gte(1)]]
		});
		this.formAction = 'New';
	}

	ngOnInit() {
		console.log('AddUserComponent initialized');
		console.log(this.usSelection);
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
		this.http.post(sprintUrl, values).subscribe((value: any) => {
			if (value.error) {
				console.log(value);
			} else {
				console.log(value);
				this.activeModal.close(value);
			}
		}, error => console.log(error));
	}
}
