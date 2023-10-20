import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { TemaService } from 'src/app/services/tema.service';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model';
import { FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})

export class CursoDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentElement = new Curso(); 
  
  public curso: FormGroup = new FormGroup({});
  verror = false;
  verrorName = false;
  flag = false;
  fechaux = '';
  message = '';
  constructor(
    private cursoService: CursoService,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
  }

  getElement(id: string): void {
    this.cursoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement = data;
          this.obtenerFecha();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getElementByIdTema(id: number): void{
    this.temaService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement.tema = data;
          this.verror = false;
          console.log(data);
        },
        error: (e) =>{
          console.error(e)
          this.verror = true
        },
          
      });
  }

  getElementByNombreTema(nombre: string): void{
    this.temaService.findByTitle(nombre)
      .subscribe({
        next: (data) => {
          var dataTotal:Tema[];
          dataTotal = (data as unknown) as Tema[];
          if(dataTotal.length == 1)
            this.currentElement.tema = dataTotal[0];
          this.verrorName = false;
          console.log(dataTotal[0]);
        },
        error: (e) =>{
          this.verrorName = true;
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

  /*notExisteIdTema(numero:number): boolean{
    if(this.flag){
      this.getElementByIdTema(numero);
      this.flag = false;  
    }
    return this.verror;
  }

  actualizar(): void{
    this.flag = true;
  }

  existeTema(nombre:string): boolean{
    this.getElementByNombreTema(nombre);
    return this.verrorName;
  }
  */
 
  updateElement(): void {
    this.message = '';
    this.cursoService.update(this.currentElement.id, this.currentElement)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Curso actualizado!';
          //this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }

  obtenerFecha(): void{
    var aux = JSON.stringify(this.currentElement.fechaInicio).slice(1, 11);
    var aux2 = aux.split('-');
    aux = aux2[2] + '-' + aux2[1] + '-' + aux2[0];
    this.fechaux = aux
  }

  actualizarFecha(): void{
    var aux1 = this.fechaux.split('-');
    this.currentElement.fechaInicio = new Date(aux1[1] + '-' + aux1[0] + '-' + aux1[2]);
  }
    
  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }
}
