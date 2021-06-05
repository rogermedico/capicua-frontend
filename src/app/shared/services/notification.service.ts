import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public snackBarDefaultProperties: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone,
  ) { }

  showMessage(msg: string, action: string = '', config: MatSnackBarConfig = {}) {
    this.snackBar.open(msg, action, {
      duration: config.duration ? config.duration : this.snackBarDefaultProperties.duration,
      horizontalPosition: config.horizontalPosition ? config.horizontalPosition : this.snackBarDefaultProperties.horizontalPosition,
      verticalPosition: config.verticalPosition ? config.verticalPosition : this.snackBarDefaultProperties.verticalPosition,
      panelClass: ['message-snack']
    });
  }

  showError(msg: string, action: string = '', config: MatSnackBarConfig = {}): void {
    this.zone.run(() => {
      this.snackBar.open(msg, action, {
        duration: config.duration ? config.duration : this.snackBarDefaultProperties.duration,
        horizontalPosition: config.horizontalPosition ? config.horizontalPosition : this.snackBarDefaultProperties.horizontalPosition,
        verticalPosition: config.verticalPosition ? config.verticalPosition : this.snackBarDefaultProperties.verticalPosition,
        panelClass: ['error-snack']
      });
    });
  }

}
