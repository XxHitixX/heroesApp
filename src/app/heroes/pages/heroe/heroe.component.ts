import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }

  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe !: Heroe;

  constructor(
    private activatedRoute : ActivatedRoute,
    private heroesService  : HeroesService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroebyId(id)),
        tap(console.log)
      ).subscribe(
        heroe => {
          this.heroe = heroe;
        }
      );
  }

  volver(){
    this.router.navigate(['/heroes/listado'])
  }
}

// .pipe(
//   switchMap( ({ id }) => this.paisService.getPaisporCodigo(id)),//como el resultado de lapeticion es un objeto de una sola variable se usa una desestructuracion
//   tap(console.log)//Sirve para mostrar en pantalla lo que sucede con el observable dentro del pipe
//     //esto es lo mismo que (param => console.log(param))
//  )
// .subscribe( (pais) => {
//     this.pais = pais[0];
//     const {translations} = this.pais; //Desestructuracion del objeto pais
//     const lenguajes = Object.values(translations); //Tomo los valores de la propiedad translations arrojada por la api la cual es un objeto y la asigno a una nueva varable

//     for(let item =0;  item < lenguajes.length; item++){ //recorro todo el arreglo de 1 en 1
//       this.badges.push(lenguajes[item].common);//agrego los valores de la propiedad common en la variable badges que voy a mostrar en la vista
//     }


// })