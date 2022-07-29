import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Video } from 'src/app/interface/video';

import { EmbedVideoService } from 'ngx-embed-video';

import { FevoriteService } from 'src/app/services/fevorite.service';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.scss'],
})
export class VideoPlayComponent implements OnInit {
  isLoader = false;
  resValue: any;
  videoID: any;
  data: any;
  videos: Video[] = [];
  defaultColor: any = 1;
  fVideoId: any;
  dataItem: any;
  resData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private embedService: EmbedVideoService,
    private FevoriteService: FevoriteService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.resValue = params;
      this.videoID = this.resValue.id;
      if (this.videoID) {
        this.getVideoById(this.videoID);
        this.checkValueExistLive(this.videoID);
        this.checkValueExist(this.videoID);
      }
    });
  }
  getVideoById(videoID: any) {
    this.isLoader = true;
    this.searchService.getVideoById(videoID).subscribe((items) => {
      this.videos = items.map((item: any) => {
        return {
          title: item.snippet.title,
          videoId: videoID,
          videoUrl: this.embedService.embed(
            'https://www.youtube.com/watch?v=' + videoID
          ),
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

  isFavorite: any[] = [];
  isFavoritee(elem: any) {
    //  console.log(elem);
    this.fVideoId = elem;

    const fevoriteItem = {
      fVideoId: this.fVideoId,
    };

    this.FevoriteService.setFevoriteItem(fevoriteItem);
  }

  checkValueExist(videoID: any) {
    const value = videoID;
    const fevoriteData = JSON.parse(localStorage.getItem('fevorite') || '{}');
    fevoriteData.items.filter((item: any) => {
      if (item.fVideoId == value) {
        this.defaultColor = 0;
      }
    });
  }

  checkValueExistLive(videoID: any) {
    this.FevoriteService.fevotiteCart$.subscribe((res) => {
      this.resData = res;
      this.dataItem = this.resData;
      if (this.dataItem.items.length) {
        this.defaultColor = 0;
      } else {
        this.defaultColor = 1;
      }
      this.dataItem.items.filter((item: any) => {
        if (item.fVideoId == this.videoID) {
          this.defaultColor = 0;
        } else {
          this.defaultColor = 1;
        }
      });
    });
  }
}
