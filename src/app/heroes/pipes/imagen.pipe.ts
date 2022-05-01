import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false//esto es para que cambie o se active el pipe con cada cambio de deteccion de 
  //angular por defecto está en true
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if(!heroe.id && !heroe.alt_image){
      return 'assets/no-image.png'
    }else if(heroe.alt_image){
      return heroe.alt_image
    }else
    return `assets/heroes/${ heroe.id }.jpg`;
  }

}
// assets/heroes/{{heroe.id}}.jpg