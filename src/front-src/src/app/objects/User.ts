export class User {
	public id: number;
	public name: string;
	public email: string;

	constructor(
		id = -1,
		name = '',
		email = '') {
		this.id = id;
		this.name = name;
		this.email = email;
	}
}
