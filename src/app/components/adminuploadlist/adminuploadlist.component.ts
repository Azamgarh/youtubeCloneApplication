import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';
import { YoutubeService } from 'src/app/services/youtube-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-adminuploadlist',
  templateUrl: './adminuploadlist.component.html',
  styleUrls: ['./adminuploadlist.component.css'],
})
export class AdminuploadlistComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private youtubeService: YoutubeService,
    private router: Router
  ) {}
  isLoader = false;
  videos: any;
  dataSource: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getVideoFromChannel();
  }
  displayedColumns = ['name', 'video', 'channel', 'delete'];

  getVideoFromChannel() {
    this.isLoader = true;
    this.youtubeService.getVideoFromChannel().subscribe(
      (items: any) => {
        this.videos = items.map((item: any) => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url,
          };
        });
        this.dataSource = new MatTableDataSource(this.videos);

        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoader = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title:
            'Video does not loading. Brower blocked request Please use this commend. ',
          text: 'Please press "window+r" after paste this text " chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security " automatic open new Browser',
        });
        this.router.navigate(['/admin/upload']);
      }
    );
  }
  deleteVideo(videoID: any) {
    this.youtubeService
      .deleteVideoFromChannel(videoID)
      .subscribe((res: any) => {
        // console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Video Deleted Successfully',
        });
        this.router.navigate(['/admin/upload']);
      });
  }
}
