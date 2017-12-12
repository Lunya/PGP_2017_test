export class Task {
	id: number;
	id_sprint: number;
	description: string;
	developer: string;
	state: string;
	onEdit: boolean;

	constructor(
		id = 0,
		id_sprint = 0,
		description = '',
		developer = '',
		state = 'TODO',
		onEdit = false) {
		this.id = id;
		this.id_sprint = id_sprint;
		this.description = description;
		this.developer = developer;
		this.state = state;
		this.onEdit = false;
	}
}
