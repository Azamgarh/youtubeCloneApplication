import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Video } from 'src/app/interface/video';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router:Router
  ) {}
  isLoader = false;
  keywordValue: any;
  resValue: any;
  videos: Video[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resValue = params;
      this.keywordValue = this.resValue.query;
      if (this.keywordValue) {
        this.getSearchData(this.keywordValue);
      }
    });
  }

  getSearchData(keywordValue: any) {
    this.isLoader = true;
    this.searchService.getVideos(keywordValue).subscribe(
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
        //console.log(this.videos);
        // this.inputTouched = true;
        this.isLoader = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title:
            ' This request cannot be completed because you have exceeded your quota. ',
        });
        this.router.navigate(['/']);
      }
    );
  }
}
