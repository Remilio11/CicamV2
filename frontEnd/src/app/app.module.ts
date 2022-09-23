import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Rutas
import { AppRoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AermetComponent } from './pages/aermet/aermet.component';
import { AermapComponent } from './pages/aermap/aermap.component';
import { AermodComponent } from './pages/aermod/aermod.component';
//Auth-Uss
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

//Google Maps
import { GoogleMapsModule } from '@angular/google-maps';
//Formulario
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
//carga de Archivos
import { UploadfilesService } from './services/uploadfiles.service';
import { ConfigService } from './pages/config/conifigAermet.service';
import { AermapService } from './services/aermap.service';
import { AermodService } from './services/aermod.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    AermetComponent,
    AermapComponent,
    AermodComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [UploadfilesService, ConfigService, AermapService, AermodService],
  bootstrap: [AppComponent]
})
export class AppModule { }