import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(public db: AngularFireDatabase) { }

    getCategories(){
        return this.db.list('categories').valueChanges();
    }

    getProducts(){
        return this.db.list('products').valueChanges();
    }

    getProduct(productID){
        return this.db.object(`products/${productID}`).valueChanges();
    }
    
    updateProductQuantiy(productID , product){
        return this.db.database.ref(`products/${productID}`).update(product);
    }

    addToCart(userID,productID,quantity){
        return this.db.database.ref(`cart/'${userID}/${productID}`).update(quantity);
    }
    
    removeItemFromCart(userID,productID){
        return this.db.database.ref(`cart/'${userID}/${productID}`).remove()
    }

    
    getCartItems(userID){
        return this.db.list(`cart/'${userID}`).valueChanges();
    }

}