import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 10px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ]

  heroe : Heroe = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_image: '',
    publisher: Publisher.DCComics
  }

  constructor(
    private activatedRoute : ActivatedRoute,
    private heroeService   : HeroesService, 
    private router         : Router,
    private _snackBar      : MatSnackBar,
    private _dialog        : MatDialog
  ) { }

  ngOnInit(): void {

    //console.log(this.router.url.includes('editar'))
    if(!this.router.url.includes('editar')){
      return;
    }
    
    this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroeService.getHeroebyId(id))
        )
        .subscribe(
          heroe => this.heroe = heroe
        ) 
  }

  agregar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      this.heroeService.editarHeroe(this.heroe)
          .subscribe(
            heroe =>  {
              this._snackBar.open('Heroe modificado correctamente', 'Ok!',{
                duration: 2500
              })
              this.router.navigate(['/heroes/editar', heroe])
            }
          )
    }else{
      
      this.heroeService.agregarHeroe(this.heroe)
          .subscribe(
            heroe =>  {
              this._snackBar.open('Heroe creado correctamente', 'Ok!',{
                duration: 2500})
              this.router.navigate(['/heroes/editar', heroe])

            }
          )

    }

  }

  eliminar(){

  const dialog =  this._dialog.open(ConfirmarComponent,{
      width: '350px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if ( result ){

          this.heroeService.eliminarHeroe(this.heroe.id!)
              .subscribe(
               params => this.router.navigate(['/heroes'])
              )
        }
      }
    )

  }

}
