import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	private loading = false;
	private signinForm: FormGroup;

	constructor(
		private router: Router,
		private authService: AuthService,
		private fb: FormBuilder
	) {
		const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
		this.signinForm = this.fb.group({
			email: [null, [Validators.required, CustomValidators.email]],
			password: password
		});
	}

	ngOnInit() {
		this.authService.logout();
	}

	login() {
		this.loading = true;
		this.authService.login(this.signinForm.value)
			.subscribe(result => {
				console.log(result);
				if (result) {
					this.router.navigate(['/workspace'])
						.then(value => console.log('redirect: ', value))
						.catch(reason => console.log('redirect: ', reason));
				} else {
					console.log('Error : username or password incorrect');
					this.loading = false;
				}
			}, err => {
				this.loading = false;
				console.log(err);
			});
	}
}
