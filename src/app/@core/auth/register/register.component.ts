import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  membership = ['normal', 'platinum', 'gold'];
  userMS = '';
  desUsers: any;
  userUsed = false;
  f = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }
  )
  constructor(private db: AuthService, private router: Router) { }

  ngOnInit(): void {
    let random = Math.random();
    if (random < .30)
      this.userMS = 'normal'
    else if (random < .70)
      this.userMS = 'platinum'
    else
      this.userMS = 'gold'
  }

  submit() {
    let user = this.user.trim().toLowerCase();
    this.desUsers = this.db.login(user).on('value' , 
      res => {
        if (res.val()) {
          this.userUsed = true;
          return
        }
        else{
          let params = {
            ...this.f.value,
            userName : user,
            membership: this.userMS
          }
          this.db.saveUser(params);
          this.db.login(user).on('value' , 
            res=>{
              let userData : any = {key : Object.keys(res.val()) , data : Object.values(res.val())}
              delete userData.data[0].password;
              localStorage.setItem('currentUser',JSON.stringify(userData));
              this.f.reset();
              this.router.navigateByUrl('')
            }
          )
        }
      }
    )
  }

  get user() {
    return this.f.get('userName').value;
  }

}
