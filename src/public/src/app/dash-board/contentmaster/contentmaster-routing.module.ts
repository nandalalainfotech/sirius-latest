import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './audio/audio.component';
import { ContentmasterComponent } from './contentmaster.component';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [{
  path: "",
  component: ContentmasterComponent,
  children: [
    {
      path: "app-photo",
      component: PhotoComponent
    },
    {
      path: "app-video",
      component: VideoComponent
    },
    {
      path: "app-audio",
      component: AudioComponent
    },
  ]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentmasterRoutingModule { }
