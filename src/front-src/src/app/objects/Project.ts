export class Project {
	public id: number;
	public name: string;
	public description: string;
	public url: string;
	public begin: Date;
	public end: Date;

	constructor(
		id = -1,
		name = '',
		description = '',
		url = '',
		begin = new Date(),
		end = new Date()) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.url = url;
		this.begin = begin;
		this.end = end;
	}
}
