import { Tema } from '../models/tema.model';

export class Curso {
	id: number;
	nombre: string;	
	tema = new Tema();
	fechaInicio?: Date;
	idDocente: number;

	constructor(){
		this.id =1;
		this.nombre = '';
		this.idDocente = 1;
	}
}

