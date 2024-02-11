import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { filter, switchMap } from 'rxjs';

import { IHero, IPublisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { warn } from 'console';


@Component({
    selector: 'app-new-page',
    templateUrl: './new-page.component.html',
    styles: ``
})
export class NewPageComponent implements OnInit {


    public heroForm = new FormGroup({
        id: new FormControl<string>(''),
        superhero: new FormControl<string>('', { nonNullable: true }),
        publisher: new FormControl<IPublisher>(IPublisher.DCComics),
        alter_ego: new FormControl<string>(''),
        first_appearance: new FormControl<string>(''),
        characters: new FormControl<string>(''),
        alt_img: new FormControl<string>(''),
    })


    public publishers = [
        { id: 'DC Comics', desc: 'DC - Comics' },
        { id: 'Marvel Comics', desc: 'MArvel - Comics' }
    ]


    constructor(
        private heroesService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        if (!this.router.url.includes('edit')) return;

        this.activatedRoute.params
            .pipe(
                switchMap(({ id }) => this.heroesService.getHeroById$(id))
            ).subscribe((hero) => {
                if (!hero) return this.router.navigateByUrl('/');
                this.heroForm.reset(hero);
                return;
            })

    }

    get getCurrentHero(): IHero {
        const hero = this.heroForm.value as IHero;
        return hero;
    }


    onSubmit(): void {

        if (this.heroForm.invalid) return;
        if (this.getCurrentHero.id) {
            this.heroesService.updateHero$(this.getCurrentHero)
                .subscribe((hero) => {
                    this.showSnackBar(`${hero.superhero} updated!`);
                });
            return;
        }


        this.heroesService.addHero$(this.getCurrentHero)
            .subscribe((hero) => {
                this.router.navigate(['/heroes/edit', hero.id]);
                this.showSnackBar(`${hero.superhero} created!`);
            });


    }


    onDeleteHero(): void {
        if (!this.getCurrentHero.id) throw new Error('Hero id is required')


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: this.heroForm.value
        });


        dialogRef.afterClosed()
            .pipe(
                filter((result: boolean) => result),
                switchMap(() => this.heroesService.deleteHeroById$(this.getCurrentHero.id)),
                filter((wasDeleted: boolean) => wasDeleted),
            )
            .subscribe(() => {
                this.router.navigate(['/heroes']);
            });

        // this.dialog
        //     .open(ConfirmDialogComponent, {
        //         data: this.heroForm.value
        //     })
        //     .afterClosed()
        //     .subscribe((result) => {
        //         if (!result) return;

        //         this.heroesService.deleteHeroById$(this.getCurrentHero.id)
        //             .subscribe((wasDeleted) => {
        //                 if (wasDeleted) this.router.navigate(['/heroes']);
        //             });
        //     })


    }

    showSnackBar(message: string): void {
        this.snackbar.open(message, 'done', {
            duration: 2500
        })

    }


}
