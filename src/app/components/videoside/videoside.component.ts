import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Video } from 'src/app/interface/video';

@Component({
  selector: 'app-videoside',
  templateUrl: './videoside.component.html',
  styleUrls: ['./videoside.component.scss']
})
export class VideosideComponent implements OnInit {
  videos: Video[] = [];
  constructor(private searchService:SearchService, ) { }

  ngOnInit(): void {
    this.getTopVideo();
  }
  getTopVideo(){
    this.searchService.getTopVideoList().subscribe((items: any) => {
      console.log(items);
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
      });
  }


}
