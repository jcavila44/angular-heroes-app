import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getHeroes$(): Observable<IHero[]> {
        return this.http.get<IHero[]>(`${this.baseUrl}/heroes`);
    }


}
