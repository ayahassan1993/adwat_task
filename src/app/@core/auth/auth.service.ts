import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public db: AngularFireDatabase, private router:Router) { }

  usersList(){
    return this.db.list('users').valueChanges();
  }
  
  saveUser(data){
    this.db.database.ref('users').push(data);
  }

  login(userName) {
    return this.db.database.ref('users').orderByChild('userName').equalTo(userName);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
