import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  //LISTADO DE ALUMNOS
  listaAlumnos: Alumno[] = [
    {legajo: 25239, nombre: 'Lautaro', apellido: 'Ramadán', edad: 23, email: 'ramadanlautaro@gmail.com', aprobado: true},
    {legajo: 20011, nombre: 'Jane', apellido: 'Hopper', edad: 20, email: 'eleven11@gmail.com', aprobado: true},
    {legajo: 20022, nombre: 'Max', apellido: 'Mayfield', edad: 19, email: 'max2000@gmail.com', aprobado: false},
    {legajo: 20002, nombre: 'Mike', apellido: 'Wheeler', edad: 18, email: 'mikewheeler@gmail.com', aprobado: true},
    {legajo: 20001, nombre: 'Dustin', apellido: 'Henderson', edad: 18, email: 'dustinhenderson@gmail.com', aprobado: true},
    {legajo: 18111, nombre: 'Steve', apellido: 'Harrington', edad: 23, email: 'steve.movies@gmail.com', aprobado: false},
    {legajo: 17222, nombre: 'Eddie', apellido: 'Munson', edad: 25, email: 'masterofthepuppets@gmail.com', aprobado: false},
    {legajo: 18333, nombre: 'Nancy', apellido: 'Wheeler', edad: 22, email: 'nancy.periodism@gmail.com', aprobado: true},
    {legajo: 18222, nombre: 'Robin', apellido: 'Buckley', edad: 22, email: 'robin.movies@gmail.com', aprobado: false},
    {legajo: 20003, nombre: 'Lucas', apellido: 'Sinclair', edad: 18, email: 'lucassinclair@gmail.com', aprobado: false},
    {legajo: 20004, nombre: 'Will', apellido: 'Byers', edad: 18, email: 'willbyers@gmail.com', aprobado: true},
  ];


  constructor() { }

  
  //OBTENER EL LISTADO DE ALUMNOS COMPLETO
  obtenerAlumnos(): Promise<Alumno[]> {
    return new Promise((resolve, rejects) => {
      resolve(this.listaAlumnos);
      rejects("No se pudieron obtener los alumnos...");
    })
  }

  //FILTRAR LISTADO DE ALUMNOS EN BASE A SU SITUACIÓN
  filtrarAlumnos(aprobados: boolean): Observable<Alumno[]> {
    return of(this.listaAlumnos).pipe(
      map((alumnos) => alumnos.filter((alumno) => alumno.aprobado == aprobados)),
      catchError((mensajeError) => {throw new Error("No se pudieron filtrar los alumnos...")})
    )
  }

  //SELECCIONAR UN ALUMNO ESPECIFICO SEGUN SU LEGAJO
  seleccionarAlumno(legajo: any): Observable<Alumno> {
    return from(this.listaAlumnos).pipe(
      filter((alumno) => alumno.legajo == legajo),
      catchError((mensajeError) => {throw new Error("No se pudo obtener el alumno seleccionado...")})
    )
  }
}
