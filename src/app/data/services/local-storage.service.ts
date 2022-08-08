import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorage {

    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getItem(key: string): string {
        return localStorage.getItem(key) || "";
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    jwt:string='';
    Email:string='';
    
    getClaims(){
    this.jwt = this.getItem('accessToken');
    console.log(this.jwt);
    let jwtData: any = this.getItem('accessToken')?.split('.')[1];
    return jwtData;
    }
}