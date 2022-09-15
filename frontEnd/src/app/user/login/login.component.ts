import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.login = this.formBuilder.group({
      nick: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  logeo() {
    console.log(this.login);
  }

}
