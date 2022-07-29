import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_KEY = 'AIzaSyCc2hiFJA7-XXJ5_Sx7P8emK07Vrn0RqSU';
  token: any;
  headers: any;
  constructor(private http: HttpClient) {}

  getVideos(query: string) {
    const url = `${this.API_URL}?q=${query}&key=${this.API_KEY}&part=snippet&type=video&maxResults=48`;
    return this.http.get(url).pipe(map((response: any) => response.items));
  }

  getVideoList() {
    const defaultvideo = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet&chart=mostPopular&maxResults=48`;
    return this.http
      .get(defaultvideo)
      .pipe(map((response: any) => response.items));
  }

  getVideoById(id: any) {
    const urlid = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${this.API_KEY}`;
    return this.http.get(urlid).pipe(map((response: any) => response.items));
  }

  getTopVideoList() {
    const defaultvideo = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet&type=video&maxResults=10`;
    return this.http
      .get(defaultvideo)
      .pipe(map((response: any) => response.items));
  }
  getTrendingVideo() {
    const defaultvideo = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet&chart=mostPopular&maxResults=48`;
    return this.http
      .get(defaultvideo)
      .pipe(map((response: any) => response.items));
  }
}
