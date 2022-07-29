/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import BasicProfile = gapi.auth2.BasicProfile;
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class YoutubeService {
  private auth: GoogleAuth = null;
  private user$ = new BehaviorSubject<GoogleUser>(null!);
  public isSignedIn$ = new BehaviorSubject<any>(false);
  public isAuthInit$ = new BehaviorSubject<any>(false);
  public profile$: BehaviorSubject<BasicProfile>;
  private accessToken: string | null = null;

  constructor(private httpClient: HttpClient, private zone: NgZone) {
    gapi.load('auth2', () => {
      this.zone.run(() => {
        this.initAuth();
      });
    });
    this.profile$ = this.user$.pipe(
      map((user) =>
        user && user.getBasicProfile() ? user.getBasicProfile() : null
      )
    ) as BehaviorSubject<BasicProfile>;
    this.user$.subscribe((user) => {
      if (user) {
        this.accessToken = user.getAuthResponse().access_token;
        localStorage.setItem('token', this.accessToken);
      }
    });
  }
  initAuth() {
    const params = {
      clientId:
        '247104778966-attan4n4ug2ateuo5ja18vmfs6lm0grm.apps.googleusercontent.com',
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
      ],
      scope: [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.upload',
      ].join(' '),
    };
    const auth = gapi.auth2.init(params);
    auth
      .then(() =>
        this.zone.run(() => {
          this.auth = auth;
          this.isAuthInit$.next(true);
        })
      )
      .catch((error: any) => {
        console.log(error, 'auth failed');
      });

    auth.isSignedIn.listen((value) =>
      this.zone.run(() => {
        this.isSignedIn$.next(value);
        if (!value) {
          this.user$.next(null!);
        }
      })
    );
    auth.currentUser.listen((user) =>
      this.zone.run(() => {
        this.user$.next(user);
      })
    );
    if (auth.isSignedIn.get() === true) {
      auth.signIn();
    }
    this.zone.run(() => {
      this.user$.next(auth.currentUser.get());
    });
  }

  public signIn() {
    this.auth.signIn({ prompt: 'select_account' });
  }

  uploadVideo(
    video: any,
    input: {
      title: string;
      description: string;
      privacyStatus: string;
      tags?: string[];
    }
  ) {
    if (!this.accessToken) {
      throw new Error('authentication is required');
    }
    const data = {
      snippet: {
        title: input.title,
        description: input.description,
        tags: input.tags,
        categoryId: 22,
      },
      status: {
        privacyStatus: input.privacyStatus,
        embeddable: true,
      },
    };
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Max-Age', '86400')
      .set('Access-Control-Allow-Credentials', 'true')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/json; charset=UTF-8')
      .set('X-Upload-Content-Length', video.size + '')
      .set('X-Upload-Content-Type', 'video/*');

    const url =
      'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails';
    return this.httpClient
      .post(url, data, { headers, observe: 'response', responseType: 'text' })
      .pipe(
        switchMap((newData) => {
          const newRequest = new HttpRequest(
            'PUT',
            newData.headers.get('location'),
            video,
            { reportProgress: true }
          );
          return this.httpClient.request(newRequest);
        })
      );
  }

  getVideoFromChannel() {
    let API_KEY = 'AIzaSyAE62DCM9HOMk9zllt6Bu5YfvZ49R5CnuU';
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/json;');
    const videoo = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&forMine=true&order=date&type=video&key=${API_KEY}`;
    return this.httpClient
      .get(videoo, { headers })
      .pipe(map((response: any) => response.items));
  }

  deleteVideoFromChannel(videoID: any) {
    let API_KEY = 'AIzaSyAE62DCM9HOMk9zllt6Bu5YfvZ49R5CnuU';
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/json;');
    const videoo = `https://youtube.googleapis.com/youtube/v3/videos?id=${videoID}&key=${API_KEY}`;
    return this.httpClient
      .delete(videoo, { headers })
      .pipe(map((response: any) => response));
  }

  public signOut() {
    this.auth.signOut();
  }
}
