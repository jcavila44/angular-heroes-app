import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getHeroes$(): Observable<IHero[]> {
        return this.http.get<IHero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById$(id: string): Observable<IHero | undefined> {
        return this.http
            .get<IHero>(`${this.baseUrl}/heroes/${id}`) //Hacemos la petición get de la ulr
            .pipe(catchError(                           //Lo pasamos por el pipe catchError en caso de un error en el consumo
                (error) => of(undefined)                //Devolvemos un of() que es un observable
            ));
    }

}
