import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { IUser } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
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
        return this._httpClient.get<IUser>(`${this._baseURL}/users/1`)
            .pipe(
                tap((user) => this._user = user),
                tap((user) => localStorage.setItem('token', 'dadsa-dasdasd.dsad.ad.sa')),
            )
    }


    logout(): void {
        localStorage.clear();
        this._user = undefined;
        this._router.navigate(['/auth/login'])
    }

    checkAuthentication$(): Observable<boolean> {
        if (!localStorage.getItem('token')) return of(false);

        const token = localStorage.getItem('token');

        return this._httpClient.get<IUser>(`${this._baseURL}/users/1`)
            .pipe(
                tap((user) => this._user = user),
                map(user => !!user),
                catchError(err => of(false))
            );
    }


}
