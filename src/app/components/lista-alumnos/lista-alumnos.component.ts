import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaAlumnos: Alumno[] = [];
  alumnoSeleccionado$: Observable<Alumno | null> | null = null;

  dataSource = this.listaAlumnos;
  displayedColumns: string[] = ['legajo', 'nombre-apellido', 'edad', 'email', 'aprobado'];


  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //OBTENER EL LISTADO DE ALUMNOS COMPLETO
  obtenerAlumnos() {
    this.alumnoService.obtenerAlumnos()
    .then((alumnos) => {
      this.dataSource = alumnos;
      this.error = false;
    })
    .catch((mensajeError) => {
      this.mensajeError = mensajeError;
      this.error = true;
    })
  }
  
  //FILTRAR LISTADO DE ALUMNOS EN BASE A SU SITUACIÓN
  filtrarAlumnos(aprobados: boolean) {
    this.subscription.add(
      this.alumnoService.filtrarAlumnos(aprobados).subscribe(
        {
          next: (alumnos) => {
            this.dataSource = alumnos;
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //SELECCIONAR UN ALUMNO ESPECIFICO SEGUN SU LEGAJO
  seleccionarAlumno(legajo: any){
    this.alumnoSeleccionado$ = this.alumnoService.seleccionarAlumno(legajo);
  }
}