import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes : Routes = [
    //Desde aqui rutas hijas creadas despues de crear todos los modulo y rutas de modulos hijos
    {
        path: 'auth',
        //cargar hijo () y desde el path y cuando este en memoria .then entonces carga como promesa el modulo AuthModule
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'heroes',
        loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule)
    },
    //hasta aqui agreagado despues de crado los modulos con rutas
    {
        path: '404',
        component: ErrorPageComponent
    },
    {
        path: '**',
        component: ErrorPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule{

}