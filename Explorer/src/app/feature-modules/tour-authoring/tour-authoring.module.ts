import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyPointsComponent } from './key-points/key-points.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyPointFormComponent } from './key-point-form/key-point-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    KeyPointsComponent,
    KeyPointFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    KeyPointsComponent,
    KeyPointFormComponent
  ],
})
export class TourAuthoringModule { }
