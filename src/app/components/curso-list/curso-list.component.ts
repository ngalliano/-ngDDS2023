import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos?: Curso[];
  currentElement = new Curso();
  currentIndex = -1;
  title = '';

  constructor(private cursoService: CursoService) { }
  ngOnInit(): void {
    this.retrieveCursos();
  }
  
  retrieveCursos(): void {
    this.cursoService.getAll()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log(this.cursos);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = new Curso();
    this.currentIndex = -1;
  }
  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  removeAllElements(): void {
    this.cursoService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchTitle(): void {
    this.currentElement = <Curso>{};
    this.currentIndex = -1;
    this.cursoService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          var dataTotal: Curso[];
          dataTotal = (data as unknown) as Curso[];
          if(dataTotal.length == 1)
            this.currentElement = dataTotal[0];
          console.log(dataTotal[0]);
        },
        error: (e) => console.error(e)
      });
  }
}
