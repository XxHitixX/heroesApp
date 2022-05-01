import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  //Variable de entorno para manejar el codigo cuando llegue a produccion y  a desarrollo
  private baseUrl : string = environment.baseUrl;

  constructor(private http : HttpClient) { }
  
  
  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroebyId(id: string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getBuscarheroe(termino : string, cantidad ?: number):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=${cantidad}`)
  }

  agregarHeroe(heroe : Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes/`, heroe)
  }

  editarHeroe(heroe : Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${ heroe.id }`, heroe)
  }

  //La devolucion del Observable puede ser any porque no devuelve
  //nada o unas llaves vacías que es lo que devuelve el postman
  eliminarHeroe(id : string):Observable<{}>{
    return this.http.delete<{}>(`${this.baseUrl}/heroes/${ id }`)
  }
}
