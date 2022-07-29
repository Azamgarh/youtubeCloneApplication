import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { Video } from 'src/app/interface/video';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

  isLoader=false;
  videos: Video[] = [];

  constructor(private router:Router, private searchService:SearchService) { }

  ngOnInit(): void {
    this. getTrendingVideoList();
  }
  getTrendingVideoList(){
    this.isLoader =true;
    this.searchService.getTrendingVideo().subscribe((items: any) => {
        this.videos = items.map((item:any) => {
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
        // console.log(this.videos);
        // this.inputTouched = true;
        this.isLoader =false;
      });
        
      }

}
