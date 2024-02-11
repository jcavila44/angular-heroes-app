import { IHero } from './../../interfaces/hero.interface';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styles: ``
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IHero
    ) {

    }


    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

}
