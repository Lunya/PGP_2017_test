import { Component, OnDestroy, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../objects/Project';


const usersUrl = 'http://localhost:3000/api/users';
const userUrl = 'http://localhost:3000/api/user';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit, OnDestroy {
	private userSearchForm: FormGroup;
	private filteredList = [];
	private userSelected = { name: '' };

	@Input('project')
	public project: Project;

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private el: ElementRef,
		public activeModal: NgbActiveModal
	) {
		this.userSearchForm = this.fb.group({
			name: [null, [Validators.required]],
		});

		this.userSearchForm.valueChanges.subscribe(data => {
			if (data !== '') {
				this.http.post(usersUrl, data).subscribe((value: any) => {
					if (value.error) {
						console.log(value.error);
					} else {
						this.filteredList = value;
					}
				}, error => console.log(error));
			}
		});
	}

	ngOnInit() {
		console.log('AddUserComponent initialized');
	}

	ngOnSubmit() {
		const selectElement = this.el.nativeElement.querySelector('.list-group .active');
		console.log(selectElement);
		if (selectElement !== null) selectElement.click();
	}

	sendMe(index) {
		this.userSelected = this.filteredList[index];
		this.el.nativeElement.querySelector('#name').value = this.filteredList[index].name + '     ' + this.filteredList[index].email;
		this.el.nativeElement.querySelector('#name').setAttribute('disabled', 'true');
		this.el.nativeElement.querySelector('#addUserButton').removeAttribute('disabled');
		this.filteredList = [];
	}

	onChange() {
		this.filteredList.push(this.userSelected);
		this.el.nativeElement.querySelector('#name').value = this.userSelected.name;
		this.el.nativeElement.querySelector('#name').removeAttribute('disabled');
		this.el.nativeElement.querySelector('#addUserButton').setAttribute('disabled', 'true');
		this.userSelected = { name: '' };
	}

	ngOnDestroy() {
		console.log('AddUserComponent destroyed');
	}

	addUser() {
		this.http.post(userUrl + '/' + this.project.id, this.userSelected).subscribe((value: any) => {
			if (value.error) {
				console.log(value.reason);
			} else {
				console.log(value);
				this.activeModal.close('Form validated');
			}
		}, error => console.log(error));
	}

	onUp(event: KeyboardEvent) {
		if (this.el.nativeElement.querySelector('.list-group .list-group-item') !== null) {
			let list = this.el.nativeElement.querySelector('.list-group .active');
			if (list == null) {
				list = this.el.nativeElement.querySelector('.list-group .list-group-item:last-child');
				list.classList.add('active');
			} else {
				list.classList.remove('active');
				if (list.previousSibling.classList !== undefined) list.previousSibling.classList.add('active');
			}
		}
	}


	onDown(event: KeyboardEvent) {
		if (this.el.nativeElement.querySelector('.list-group .list-group-item') !== null) {
			let list = this.el.nativeElement.querySelector('.list-group .active');
			if (list == null) {
				list = this.el.nativeElement.querySelector('.list-group .list-group-item');
				list.classList.add('active');
			}
			else {
				list.classList.remove('active');
				if (list.nextSibling.classList !== undefined) list.nextSibling.classList.add('active');
			}
		}
	}

}
