import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showpassword = false;
  error = false;

  f = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  )
  constructor(private db: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.db.login(this.userName.trim().toLowerCase()).on('value',
      res => {
        if (res.val()) {
          let user : any = {key : Object.keys(res.val()) , data : Object.values(res.val())};
          if (this.password == user.data[0].password) {
            delete user.data[0].password;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/'])
          }
          else
            this.error = true;
        }
        else
          this.error = true;
      }
    )

  }

  get userName() {
    return this.f.get('userName').value;
  }
  get password() {
    return this.f.get('password').value;
  }
}
