import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { USER_DOCUMENTS } from '@constants/documents.constant';
import { UserDocument } from '@models/document.model';
import { User } from '@models/user.model';
import * as UserActions from '@modules/user/store/user.action';
import * as UserSelectors from '@modules/user/store/user.selector';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { ParserService } from '@services/parser.service';
import { AppState } from '@store/root.state';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  public user: User;
  public documentsDisplayedColumns: string[] = ['name', 'actions'];
  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public editable: boolean = true;

  constructor(
    private store$: Store<AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private parser: ParserService) { }

  ngOnInit(): void {
    this.userStateSubscription = this.userState$.pipe(
      filter(userState => {
        return userState != null;
      }),
      tap(userState => {
        this.user = userState.user;
        // if (this.user) {
        //   this.editable = this.user.userType.rank > userState.user.userType.rank || this.user.userType.id == userState.user.id;
        // }
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.userStateSubscription.unsubscribe();
    // this.courseTypesSubscription.unsubscribe();
  }

  viewDocument(document: UserDocument) {

    switch (document.name) {
      case USER_DOCUMENTS.dni:
        const pdf = "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MTAgMCBSPj4KZW5kb2JqCjEyIDAgb2JqCjw8L05hbWVzIDExIDAgUi9UeXBlL0NhdGFsb2cvVmlld2VyUHJlZmVyZW5jZXM8PC9QcmludFNjYWxpbmcvQXBwRGVmYXVsdD4+L1BhZ2VzIDggMCBSPj4KZW5kb2JqCjEzIDAgb2JqCjw8L0NyZWF0b3IoSmFzcGVyUmVwb3J0cyBcKG1hdHJpY3VsYV9leGVtcGxlXCkpL1Byb2R1Y2VyKGlUZXh0IDIuMS43IGJ5IDFUM1hUKS9Nb2REYXRlKEQ6MjAyMTAyMTAxODE5MTgrMDEnMDAnKS9DcmVhdGlvbkRhdGUoRDoyMDIxMDIxMDE4MTkxOCswMScwMCcpPj4KZW5kb2JqCnhyZWYKMCAxNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDU2NTcgMDAwMDAgbiAKMDAwMDAwNTk4MyAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDE5MDggMDAwMDAgbiAKMDAwMDAwNjA3MSAwMDAwMCBuIAowMDAwMDAzMDQ5IDAwMDAwIG4gCjAwMDAwMDM0MzcgMDAwMDAgbiAKMDAwMDAwNjE2NCAwMDAwMCBuIAowMDAwMDA1OTQ4IDAwMDAwIG4gCjAwMDAwMDYyMjcgMDAwMDAgbiAKMDAwMDAwNjI4MiAwMDAwMCBuIAowMDAwMDA2MzE2IDAwMDAwIG4gCjAwMDAwMDY0MjEgMDAwMDAgbiAKdHJhaWxlcgo8PC9Sb290IDEyIDAgUi9JRCBbPDFkNWE3YmQyNTIxYmYwMTkyYWU1ZTI1OWI3M2JhMGIyPjw4MWZjNDk2NzIzMTdmZjk3OWRlNjY2NTk1MjllNzQzMT5dL0luZm8gMTMgMCBSL1NpemUgMTQ+PgpzdGFydHhyZWYKNjU4OQolJUVPRgo=";
        const sanitizedPdf = (`data:application/pdf;base64,${pdf}`);

        const byteArray = new Uint8Array(atob(pdf).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        window.open(url, '_blank');
        // const dni = this.user.documents.find(document => document.name == USER_DOCUMENTS.dni);
        // if(typeof dni.file != 'boolean'){
        //   this.sanitizer.bypassSecurityTrustResourceUrl(url);
        //   window.open(dni.file,)
        // }
        // else{
        //   this.store$.dispatch(UserActions.UserDniGet());
        // }

        break;
      case USER_DOCUMENTS.sexOffenseCertificate:

        break;
    }
    // const dialogRef = this.dialog.open(EducationDialogComponent, {
    //   data: {
    //     name: education.name,
    //     finishDate: education.finishDate,
    //     finished: education.finished,
    //   },
    //   // width: '400px'
    // });

    // dialogRef.afterClosed().pipe(
    //   take(1),
    //   tap((result) => {
    //     if (result) {
    //       const editedEducation: Education = {
    //         id: education.id,
    //         name: result.name,
    //         finishDate: result.finishDate,
    //         finished: result.finished ? true : false
    //       };
    //       console.log(education)
    //       this.store$.dispatch(UserActions.UserEducationUpdate({ education: editedEducation }));
    //     }
    //   })
    // ).subscribe();
  }

  updateDocument(document: UserDocument) {
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: {
    //     question: 'Are you sure you want to delete the following education:',
    //     element: education.name
    //   },
    //   width: '400px'
    // });

    // dialogRef.afterClosed().pipe(
    //   take(1),
    //   tap((result: boolean) => {
    //     if (result) {
    //       this.store$.dispatch(UserActions.UserEducationDelete({ educationId: education.id }));
    //     }
    //   })
    // ).subscribe();
  }
}
