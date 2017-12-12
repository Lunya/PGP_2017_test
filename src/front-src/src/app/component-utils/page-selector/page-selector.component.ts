import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'page-selector',
	templateUrl: './page-selector.component.html',
	styleUrls: ['./page-selector.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageSelectorComponent implements OnInit {
	private links: {route: string, number: number}[];

	constructor() { }

	ngOnInit() {
		this.links = [
			{ route: 'page', number: 0 },
			{ route: 'page', number: 1 },
			{ route: 'page', number: 2 },
			{ route: 'page', number: 3 }
		];
	}
}
