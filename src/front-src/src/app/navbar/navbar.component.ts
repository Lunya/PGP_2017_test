import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

	constructor(private auth: AuthService) {
	}

	ngOnInit() {

	}

	userName() {
		return localStorage.getItem('user.name');
	}

}
