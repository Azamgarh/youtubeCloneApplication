import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { Video } from 'src/app/interface/video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  isLoader = false;
  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.getVideoDataList();
  }
//getting data from API
  getVideoDataList() {
    this.isLoader = true;
    this.searchService.getVideoList().subscribe((items: any) => {
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
      this.isLoader = false;
    });
  }
}
