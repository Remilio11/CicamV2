import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aermod',
  templateUrl: './aermod.component.html',
  styleUrls: ['./aermod.component.css']
})
export class AermodComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    Swal.fire(
      'Información',
      'Detallar la información',
      'info'
    )
  }

}
