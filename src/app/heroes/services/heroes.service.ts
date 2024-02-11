import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
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


    getSuggestions$(query: string): Observable<IHero[]> {
        return this.http.get<IHero[]>(`${this.baseUrl}/heroes?q=${query}`);
    }


    addHero$(hero: IHero): Observable<IHero> {
        return this.http.post<IHero>(`${this.baseUrl}/heroes`, hero);
    }

    updateHero$(hero: IHero): Observable<IHero> {
        if (!hero.id) throw new Error(`Hero id is required`);
        return this.http.patch<IHero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    deleteHeroById$(id: string): Observable<boolean> {
        if (id) throw new Error(`Hero id is required`);
        return this.http.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError((error) => of(false)),
                map((resp) => true)
            );
    }

}
