import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material/material.module';

import * as fromComponents from './components';
import { DialogPublishComponent } from './components/dialog-publish/dialog-publish.component';
import { DialogStoreComponent } from './components/dialog-store/dialog-store.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    ...fromComponents.components,
    DialogPublishComponent,
    DialogStoreComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ...fromComponents.components
  ]
})
export class SharedModule { }
