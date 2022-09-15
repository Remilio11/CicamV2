import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AermapComponent } from './pages/aermap/aermap.component';
import { AermetComponent } from './pages/aermet/aermet.component';
import { AermodComponent } from './pages/aermod/aermod.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component : InicioComponent},
  { path: 'login', component : LoginComponent},
  { path: 'registrar', component : RegisterComponent},
  { path: 'inicio', component : InicioComponent},
  { path: 'aermet', component : AermetComponent},
  { path: 'aermap', component : AermapComponent},
  { path: 'aermod', component : AermodComponent},
  { path: '**', pathMatch: 'full', redirectTo : ''},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }