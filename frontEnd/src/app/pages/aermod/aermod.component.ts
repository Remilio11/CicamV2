import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISource } from 'src/app/interfaces/ICreateAermap';
import { IAermodSource } from 'src/app/interfaces/ICreateAermod';
import { AermodService } from 'src/app/services/aermod.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-aermod',
  templateUrl: './aermod.component.html',
  styleUrls: ['./aermod.component.css']
})
export class AermodComponent implements OnInit {

  file1: File | undefined;
  file2: File | undefined;
  file3: File | undefined;

  fuentes: ISource[] = [];

  stacks: IAermodSource[] = [];

  aermod: FormGroup;

  selectedSource: ISource | undefined;

  loading = false

  constructor(private formBuilder: FormBuilder, private aermodService: AermodService) {
    this.aermod = this.formBuilder.group({
      AVERTIME: ['', Validators.required],
      POLLUTID: ['', Validators.required],
      RECTABLE: ['', Validators.required],
      MAXTABLE: ['', Validators.required],
      MAXIFILE: ['', Validators.required],
      TE: ['', Validators.required],
      AF: ['', Validators.required],
      TG: ['', Validators.required],
      VG: ['', Validators.required],
      DF: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const fuentesInStorage = localStorage.getItem('fuentes')
    if(fuentesInStorage != null) {
      this.fuentes = JSON.parse(fuentesInStorage)
    }
  }

  showModal(){
    Swal.fire(
      'Información',
      'Detallar la información',
      'info'
    )
  }

  generar(){
    if(this.file1 === undefined || this.file2 === undefined || this.file3 === undefined){
      Swal.fire(
        'Error',
        'Debes escoger los 3 archivos',
        'error'
      )
      return
    }
    if(this.stacks.length <= 0){
      Swal.fire(
        'Error',
        'Debes agregar al menos 1 fuente',
        'error'
      )
      return
    }
    this.loading = true;
    const {AVERTIME, POLLUTID, RECTABLE, MAXTABLE, MAXIFILE} = this.aermod.getRawValue();
    this.aermodService.sendAermodData({AVERTIME, POLLUTID, RECTABLE, MAXTABLE, MAXIFILE, stacks: this.stacks}, this.file1, this.file2, this.file3).subscribe((data: any) => {
      this.loading = false
      Swal.fire(
        'Exito',
        'Se generó el archivo Aermod',
        'success'
      )
  }, (error: any) => {
    this.loading = false;
    Swal.fire(
      'Error',
      error.error.message,
      'error'
    )
});
  }

  addStackSource(){
    const {TE, AF, TG, VG, DF} = this.aermod.getRawValue();
    if(this.selectedSource){
      this.stacks.push(
        {
          source: this.selectedSource,
          stack: {
            TE, AF, TG, VG, DF
          }
        }
      )
    }
    this.aermod.controls['TE'].setValue("")
    this.aermod.controls['AF'].setValue("")
    this.aermod.controls['TG'].setValue("")
    this.aermod.controls['VG'].setValue("")
    this.aermod.controls['DF'].setValue("")
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file1 = <File>file;

    }
  }
  
  onFileSelected2(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file2 = <File>file;

    }
  }

  onFileSelected3(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.file3 = <File>file;

    }
  }

  setSource(event: Event){
    const element = event?.currentTarget as HTMLInputElement;
    this.selectedSource = {
      hlvlMar: element.value.split("-")[2],
      latitud: element.value.split("-")[0],
      longitud: element.value.split("-")[1],
    }
  }

  deleteStackItem(stackItem: IAermodSource){
    this.stacks = this.stacks.filter(stack => stack != stackItem)
  }

  downloadRNK() {
    this.aermodService.getRNK().subscribe((data: any) => {
      FileSaver.saveAs(data, `RANK1.RNK`);
  });
  }

  downloadOUT() {
    this.aermodService.getOUT().subscribe((data: any) => {
      FileSaver.saveAs(data, `aermod.out`);
  });
  }

  downloadPLT() {
    this.aermodService.getPLT().subscribe((data: any) => {
      FileSaver.saveAs(data, `AERMOD_1.PLT`);
  });
  }

  downloadSUM() {
    this.aermodService.getSUM().subscribe((data: any) => {
      FileSaver.saveAs(data, `AERTEST.SUM`);
  });
  }

}
