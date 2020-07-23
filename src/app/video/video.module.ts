import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { StepperComponent } from './components/stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { VideoComponent } from './video.component';
import {MatCardModule} from '@angular/material/card';
import { SafePipe } from '../helpers/safe.pipe';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';




@NgModule({
  declarations: [
    StepperComponent,
    VideoComponent,
    SafePipe,
    VideoDetailComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule

  ]
})
export class VideoModule { }
