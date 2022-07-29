import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminuploadlistComponent } from './components/adminuploadlist/adminuploadlist.component';
import { HomeComponent } from './components/home/home.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TrendingComponent } from './components/trending/trending.component';
import { UploadFromDiskComponent } from './components/upload-from-disk.component';
import { VideoPlayComponent } from './components/video-play/video-play.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'video-play', component:VideoPlayComponent},
  {path:'video-play/:id', component:VideoPlayComponent},
  // {path:'search/video-play/:id', component:VideoPlayComponent},
  // {path:'search/:query' , component:SearchbarComponent},
  { path: 'search', component:SearchbarComponent},
  { path: 'search/:id', component:SearchbarComponent},
  {path:'trending', component:TrendingComponent},

  {path:'admin' , children:[
    {path:'upload', component:UploadFromDiskComponent},
    {path:'uploadedlist', component:AdminuploadlistComponent} 
  ]}
  
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
