import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ConfigService} from '../config/conifigAermet.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-aermet',
  templateUrl: './aermet.component.html',
  styleUrls: ['./aermet.component.css']
})
export class AermetComponent {

  file1!: File;

  file2!: File;

  constructor(private configService: ConfigService) { }

  title = 'pruebaangular2';

  loading: boolean = false;

  downloadSFC() {
    this.configService.getSFC().subscribe((data: any) => {
      FileSaver.saveAs(data, `MET2119246_AERMET_2019-2020.SFC`);
  });
  }

  downloadPFL() {
    this.configService.getPFL().subscribe((data: any) => {
      FileSaver.saveAs(data, `MET2119246_AERMET_2019-2020.PFL`);
  });
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
    this.loading = true;
    this.configService.uploadFiles(this.file1, this.file2).subscribe(
      res => {
        console.log(res);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }
  
  showModal() {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      imageUrl: '/assets/img/InfoAermet.jpg',
      imageWidth: 700,
      imageHeight:200,
      confirmButtonColor: '#CC7A43',
      iconColor: '#CC7A43',
    })
  }
}

