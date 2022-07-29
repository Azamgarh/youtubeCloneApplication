import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
// import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertService} from './services/alert-service';
import {UploadFromDiskComponent} from './components/upload-from-disk.component';
import {YoutubeUploadComponent} from './components/youtube-upload.component';
import {YoutubeService} from './services/youtube-service';
import { VideolistComponent } from './components/videolist/videolist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { VideoPlayComponent } from './components/video-play/video-play.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VideosideComponent } from './components/videoside/videoside.component';
import { TrendingComponent } from './components/trending/trending.component';
import { FevoriteService } from './services/fevorite.service';
import { EmbedVideo } from 'ngx-embed-video';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminheaderComponent } from './components/adminheader/adminheader.component';
import { AdminuploadlistComponent } from './components/adminuploadlist/adminuploadlist.component';

const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatProgressBarModule,
  
];





@NgModule({
  declarations: [
    AppComponent,
    UploadFromDiskComponent,
    YoutubeUploadComponent,

    VideolistComponent,
    DashboardComponent,
     SearchbarComponent,
    HomeComponent,
    HeaderComponent,
    VideoPlayComponent,
    SidebarComponent,
    VideosideComponent,
    TrendingComponent,
    AdminheaderComponent,
    AdminuploadlistComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FlexModule,
   
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    materialModules,
  
     EmbedVideo.forRoot(),
  ],
exports:[
  materialModules
],
  providers: [AlertService, YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private fevoriteService:FevoriteService){
    fevoriteService.initFevoriteLocalStorage();
    
  }

}
