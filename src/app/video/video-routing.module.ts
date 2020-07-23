import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { VideoComponent } from './video.component';


const routes: Routes = [
  {
    path: 'new',
    component: StepperComponent
  },
  {
    path: 'list',
    component: VideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
