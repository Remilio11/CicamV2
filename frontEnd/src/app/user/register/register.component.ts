import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistroPersona } from 'src/app/models/register_model';
import { RegistroSistemService } from '../../services/registro-sistem.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registro: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _registroSistemService: RegistroSistemService) { 
    this.registro = this.formBuilder.group({
      nya: ['', Validators.required],
      nick: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registrarse() {
    
    const PERSONA: RegistroPersona = {
      Nombres_Reg: this.registro.get('nya')?.value,
      NomUser_Reg: this.registro.get('nick')?.value,
      Correo_Reg: this.registro.get('correo')?.value,
      Pwd_Reg: this.registro.get('pwd')?.value
    }

    console.log(PERSONA);
    this._registroSistemService.registrarPersona(PERSONA).subscribe(data => {
      this.toastr.success('Usted se ha registrado exitosamente!', 'Registro Completo!');
    this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.registro.reset();
    })
    
  }
}