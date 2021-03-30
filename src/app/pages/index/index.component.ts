import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  loginForm: any;

  constructor(private _authService: AuthService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  CheckLogin() {
    const user = {username: this.loginForm.value.userName , password: this.loginForm.value.password};
    return this._authService.Login(user).subscribe(res => console.log(res));
  }
}
