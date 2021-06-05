import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const reduxDevToolsModule = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];