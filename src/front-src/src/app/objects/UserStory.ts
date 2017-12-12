export class UserStory {
	public id: number;
	public description: string;
	public difficulty: number;
	public priority: number;
	public state: string;
	public onEdit: boolean;

	constructor(
		id = -1,
		description = '',
		difficulty = 0,
		priority = 0,
		state = 'TODO',
onEdit = false) {
		this.id = id;
		this.description = description;
		this.difficulty = difficulty;
		this.priority = priority;
		this.state = state;
	}

}
