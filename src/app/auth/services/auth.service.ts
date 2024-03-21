import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { IUser } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private _router: Router,
        private _httpClient: HttpClient
    ) { }

    private _baseURL = environments.baseUrl;
    private _user?: IUser;

    get getCurrentUSer(): IUser | undefined {
        if (!this._user) return undefined;

        //  structuredClone:
        //  sirve para realizar un clon de un objeto sin necesidad de pasarlo como refencia,
        //  ya que si lo pasamos por referencia le damos acceso total a pesar de ser privado
        return structuredClone(this._user);
    }

    login(email: string, password: string): Observable<IUser> {
        const id = 1;
        return this._httpClient.get<IUser>(`${this._baseURL}/users/${id}`).pipe(
            tap((user) => this._user = user),
            tap((user) => localStorage.setItem('token', 'dadsa-dasdasd.dsad.ad.sa')),
        )
    }


    logout(): void {
        this._user = undefined;
        localStorage.clear();
        this._router.navigate(['/auth/login'])
    }


}
