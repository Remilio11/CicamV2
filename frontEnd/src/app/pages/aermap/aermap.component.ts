import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateAermap, ISource } from 'src/app/interfaces/ICreateAermap';
import { AermapService } from 'src/app/services/aermap.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import {ConfigService} from '../config/configAermap.service';

@Component({
  selector: 'app-aermap',
  templateUrl: './aermap.component.html',
  styleUrls: ['./aermap.component.css']
})
export class AermapComponent implements OnInit {

  file1: File | undefined;
  file2: File | undefined;
  
  position = {
    lat  : -0.211715,
    lng : -78.491402    
  }

  fuentes: ISource[] = [];

  loading = false;

  error = "";

  aermap: FormGroup;
  domCuadricula: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private aermapService: AermapService) {
    this.aermap = this.formBuilder.group({
      X: ['', Validators.required],
      Y: ['', Validators.required],
      Zona: ['', Validators.required],
      X_SC: ['', Validators.required],
      Y_SC: ['', Validators.required],
      Zona_SC: ['', Validators.required],
      DatoHorizontal: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      hlvlMar: ['', Validators.required],
      cFiles: ['', Validators.required],
      X_InicioCuad_RC: ['', Validators.required],
      X_NumRep_RC: ['', Validators.required],
      X_SepRep_RC: ['', Validators.required],
      Y_InicioCuad_RC: ['', Validators.required],
      Y_NumRep_RC: ['', Validators.required],
      Y_SepRep_RC: ['', Validators.required],
      X_PE: ['', Validators.required],
      Y_PE: ['', Validators.required],
      X_PRD: ['', Validators.required],
      Y_PRD: ['', Validators.required]
    })

    this.domCuadricula =this.formBuilder.group({
      X: ['', Validators.required],
      Y: ['', Validators.required],
      Zona: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    const fuentesInStorage = localStorage.getItem('fuentes')
    if(fuentesInStorage != null) {
      this.fuentes = JSON.parse(fuentesInStorage)
    }
  }

  /*Funcion del boton Generar */
  generar(){
    if(this.file1 === undefined || this.file2 === undefined){
      this.error = "Debes escoger dos archivos"
      Swal.fire(
        'Error',
        'Debes escoger dos archivos',
        'error'
      )
      return;
    }
    this.error = ""
    const {X, Y, Zona, Y_SC, X_SC, Zona_SC, DatoHorizontal, Y_NumRep_RC, Y_SepRep_RC, Y_InicioCuad_RC, X_SepRep_RC, X_NumRep_RC, X_InicioCuad_RC} = this.aermap.value;
    const data: ICreateAermap = {
      X, Y, Zona, fuentes: this.fuentes, Y_SC, X_SC, Zona_SC, DatoHorizontal, Y_NumRep_RC, Y_SepRep_RC, Y_InicioCuad_RC, X_SepRep_RC, X_NumRep_RC, X_InicioCuad_RC
    }
    if(this.fuentes.length <= 0){
      this.error = "Debes agregar almenos una fuente"
      return;
    }
    this.loading = true
    this.aermapService.sendAermapData(data, this.file1, this.file2).subscribe((data: any) => {
      Swal.fire(
        'Exito',
        'Se generó el archivo Aermap',
        'success'
      )
      FileSaver.saveAs(data, `RECEPT.ROU`);
      this.loading = false
  });
  }

  verificarPuntos(){
    console.log(this.aermap);
  }

  addData(){
    const {longitud, latitud, hlvlMar} = this.aermap.value;
    if(longitud && latitud && hlvlMar){
      this.fuentes.push({
        longitud, latitud, hlvlMar
      })
      localStorage.setItem("fuentes", JSON.stringify(this.fuentes));
    }
  }

  deleteItem(latitudeToDelete: string, longitudeToDelete: string){
    const objectToDelete = this.fuentes.find(fuente => fuente.latitud === latitudeToDelete && fuente.longitud === longitudeToDelete);
    if(objectToDelete){
      const endData = this.fuentes.filter(fuente => fuente !== objectToDelete);
      this.fuentes = endData
    }
  }

  validarCoord(){
    const position = {
      lat  : this.aermap.value.X,
      lng : this.aermap.value.Y    
    }
  }

  downloadROU() {
    // this.configService.getROU().subscribe((data: any) => {
    //   FileSaver.saveAs(data, `RECEPT.ROU`);
    // });
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file1 = <File>file;

        const formData = new FormData();
    formData.append('files', file);

    }
  }
  
  onFileSelected2(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file2 = <File>file;

    }
  }

  upload(){
    // this.loading = true;
    // this.configService.uploadFiles(this.file1, this.file2).subscribe(
    //   res => {
    //     console.log(res);
    //     this.loading = false;
    //   },
    //   err => {
    //     console.log(err);
    //     this.loading = false;
    //   }
    // );
  }

  /**Mensaje Informativo */

  showModal(){
    Swal.fire(
      'Información',
      'Detallar la información',
      'info'
    )
  }
}
