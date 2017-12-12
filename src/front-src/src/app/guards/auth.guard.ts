import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}
	canActivate(): boolean {
		let user = localStorage.getItem('token');
		if (user)
			return true;
		this.router.navigate(['/home']);
		return false;
	}
}
