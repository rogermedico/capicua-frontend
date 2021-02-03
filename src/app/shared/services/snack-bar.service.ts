import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, action: string = '', config: MatSnackBarConfig = {}) {
    this.snackBar.open(msg, action, {
      duration: config.duration ? config.duration : 3000,
      horizontalPosition: config.horizontalPosition ? config.horizontalPosition : 'center',
      verticalPosition: config.verticalPosition ? config.verticalPosition : 'bottom',
    });
  }

}
