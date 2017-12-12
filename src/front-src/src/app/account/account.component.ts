import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';
import { User } from '../objects/User';


const url = 'http://localhost:3000/api/user'

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['../signin/signin.component.css']
})
export class AccountComponent implements OnInit {
	private loading = false;
	private mailEdition = false;
	private nameEdition = false;
	private accountForm: FormGroup;
	private currentUser: User;

	constructor(
		private http: HttpClient,
		private router: Router,
		private fb: FormBuilder,
		private auth: AuthService,
		private el: ElementRef,
	) {
		const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
		const newPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
		const confirmPassword = new FormControl(null, [Validators.required, CustomValidators.equalTo(newPassword)]);
		this.accountForm = this.fb.group({
			/*email: [null, [Validators.required, CustomValidators.email]],
			name: [null, [Validators.required, Validators.minLength(2)]],*/
			email: localStorage.getItem('user.email'),
			name: localStorage.getItem('user.name'),
			password: password,
			newPassword: newPassword,
			confirmPassword: confirmPassword
		});
	}

	ngOnInit() {
		this.currentUser = new User(
			parseInt(localStorage.getItem('user.id')),
			localStorage.getItem('user.name'),
			localStorage.getItem('user.email'));

	}

	ngCancel() {
		this.router.navigate(['/home']);
	}

	activeMailEdition() {
		this.mailEdition === false ? this.el.nativeElement.querySelector('#email').removeAttribute('disabled') :
			this.el.nativeElement.querySelector('#email').setAttribute('disabled', 'true');
		this.mailEdition = !this.mailEdition;
	}


	activeNameEdition() {
		this.nameEdition === false ? this.el.nativeElement.querySelector('#name').removeAttribute('disabled') :
			this.el.nativeElement.querySelector('#name').setAttribute('disabled', 'true');
		this.nameEdition = !this.nameEdition;
	}

	ngOnSubmit() {
		this.loading = true;
		this.http.patch(url + '/' + this.currentUser.id, this.accountForm.value).subscribe((result: any) => {
			if (result.error)
				this.loading = false;
			else {
				console.log(result);
				this.router.navigate(['home']);
			}
		}, err => {
			console.log(err);
			this.loading = false;
		});
	}

	deleteAccount() {
		this.auth.logout();
		this.http.delete(url + '/' + this.currentUser.id).subscribe((result: any) => {
			if (result.error)
				this.loading = false;
			else {
				console.log(result);
				this.router.navigate(['home']);
			}
		}, err => {
			console.log(err);
			this.loading = false;
		});
	}
}
