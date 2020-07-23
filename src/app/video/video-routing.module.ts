import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { VideoComponent } from './video.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';


const routes: Routes = [
  {
    path: 'new',
    component: StepperComponent
  },
  {
    path: 'list',
    component: VideoComponent
  },
  {
    path: ':id',
    component: VideoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
