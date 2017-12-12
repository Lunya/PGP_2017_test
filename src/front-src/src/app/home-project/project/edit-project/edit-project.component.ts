import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../objects/Project';


const url = 'http://localhost:3000/api/project';

@Component({
	selector: 'app-edit-project',
	templateUrl: '../../../popups/popup-project.component.html'
})
export class EditProjectComponent implements OnInit {
	private projectForm: FormGroup;
	private beginDateModel: NgbDateStruct;
	private endDateModel: NgbDateStruct;
	private action: string;

	@Input('project')
	public project: Project;

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.action = 'Edit';
		this.projectForm = this.fb.group({
			name: [this.project.name, [Validators.required]],
			description: [this.project.description, []],
			url: [this.project.url, [CustomValidators.url]],
			begin: [this.project.begin, [Validators.required, /*CustomValidators.dateISO*/]],
			end: [this.project.end, [/*CustomValidators.dateISO*/]]
		});

		let begin = new Date(this.project.begin);
		let end = new Date(this.project.end);
		this.beginDateModel = { year: begin.getFullYear(), month: begin.getMonth() + 1, day: begin.getDate() };
		if (this.project.end)
			this.endDateModel = { year: end.getFullYear(), month: end.getMonth() + 1, day: end.getDate() };
	}

	ngOnSubmit(): void {
		const body = this.projectForm.value;
		body.begin = this.beginDateModel.year.toString() + '-' + this.beginDateModel.month.toString() + '-' + this.beginDateModel.day.toString();
		if (body.end) {
			body.end = this.endDateModel.year.toString() + '-' + this.endDateModel.month.toString() + '-' + this.endDateModel.day.toString();
		} else {
			body.end = null;
		}
		this.http.patch(url + '/' + this.project.id, body).subscribe((res: any) => {
			if (res.error) {
				console.log(res.reason);
			} else {
				this.activeModal.close('Form validated');
			}
		}, error => {
			console.log(error);
		});
	}
}
