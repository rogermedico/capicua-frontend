import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as UserSelectors from '@modules/user/store/user.selector';
import { UserState } from '@modules/user/store/user.state';
import { Store } from '@ngrx/store';
import { AppState } from '@store/root.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LANGUAGE_LEVELS, LANGUAGE_NAMES } from '@constants/language.constant';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss']
})
export class LanguageDialogComponent implements OnInit {

  public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  public userStateSubscription: Subscription;
  public languageDialogForm: FormGroup;
  public names: LANGUAGE_NAMES[];
  public levels: LANGUAGE_LEVELS[] = Object.values(LANGUAGE_LEVELS);

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LanguageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: LANGUAGE_NAMES;
      level: LANGUAGE_LEVELS;
      finishDate: Date;
      languagesAlreadyAdded: LANGUAGE_NAMES[]
    }
  ) { }

  ngOnInit(): void {

    this.languageDialogForm = this.formBuilder.group({
      name: [
        {
          value: this.data ? this.data.name : null,
          disabled: this.data.name ? true : false
        },
        [
          Validators.required,
        ]
      ],
      level: [
        this.data ? this.data.level : null,
        [
          Validators.required,
        ]
      ],
      finishDate: [
        this.data ? this.data.finishDate : null
      ]
    })

    if (this.data.languagesAlreadyAdded) this.names = Object.values(LANGUAGE_NAMES).filter(languageName => !this.data.languagesAlreadyAdded.includes(languageName));
    else this.names = Object.values(LANGUAGE_NAMES);

  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {

    this.dialogRef.close({
      name: this.name.value,
      level: this.level.value,
      finishDate: this.finishDate.value,
    });
  }

  get name() { return this.languageDialogForm.get('name') }
  get level() { return this.languageDialogForm.get('level') }
  get finishDate() { return this.languageDialogForm.get('finishDate') }


}
