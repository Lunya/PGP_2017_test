export class Sprint {
	id: number;
	id_project: number;
	begin: Date;
	end: Date;

	constructor(
		id = -1,
		id_project = -1,
		begin = new Date(),
		end = new Date()) {
		this.id = id;
		this.id_project = id_project;
		this.begin = begin;
		this.end = end;
	}
}
