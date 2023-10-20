import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model';
import { CursoService } from 'src/app/services/curso.service';
import { TemaService } from 'src/app/services/tema.service';


@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css'],
})
export class CursoAddComponent implements OnInit {
  curso: Curso = <Curso>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1, //campo obligatorio
    tema: {
      nombre:'',      
      id: 1 //campo obligatorio
    }
  };
  submitted = false;
  fechaux = '';
  constructor(private cursoService: CursoService ,private temaService: TemaService,) { }
  ngOnInit(): void {
    
  }
  obtenerFecha(): void{
    var aux = JSON.stringify(this.curso.fechaInicio).slice(1, 11);
    var aux2 = aux.split('-');
    aux = aux2[2] + '-' + aux2[1] + '-' + aux2[0];
    this.fechaux = aux
  }

  actualizarFecha(): void{
    var aux1 = this.fechaux.split('-');
    this.curso.fechaInicio = new Date(aux1[1] + '-' + aux1[0] + '-' + aux1[2]);
  }

  saveCurso(): void {
	const data = {
		"id": this.curso.id,
    "nombre": this.curso.nombre,
    "fechaInicio": this.curso.fechaInicio,
    "idDocente": this.curso.idDocente ,
    "tema": this.curso.tema
	};	
    this.cursoService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) =>
        {
        	console.error(e);
		} 
      });
  }
  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
    	nombre: '',
    	fechaInicio: new Date(),
    	idDocente: 1, //campo obligatorio
    	tema: {
            id: 1, //campo obligatorio
            nombre:'',
            duracion:2,
        }
    };
  }

  getElementByNombreTema(nombre: string): void{
    this.temaService.findByTitle(nombre)
      .subscribe({
        next: (data) => {
          var dataTotal:Tema[];
          dataTotal = (data as unknown) as Tema[];
          if(dataTotal.length == 1)
            this.curso.tema = dataTotal[0];
          console.log(dataTotal[0]);
        },
        error: (e) =>{
          console.error(e)
        }, 
      });
  }

  getElementByIdTema(id: number): void{
    this.temaService.get(id)
      .subscribe({
        next: (data) => {
          this.curso.tema = data;
          console.log(data);
        },
        error: (e) =>{
          console.error(e)
        },
          
      });
  }

  vacioNumero(numero:number): boolean{
    return numero.toString() == '';
  }

  vacioNombre(nombre:string): boolean{
      return nombre == '';
  }

}

