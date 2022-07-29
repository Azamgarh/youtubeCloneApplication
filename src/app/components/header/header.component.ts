import { Component,OnInit,ElementRef,ViewChild,AfterViewInit} from '@angular/core';
import { fromEvent, pipe } from 'rxjs';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  toArray,
} from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { Video } from 'src/app/interface/video';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="header__left">
        <a routerLink="/">
          <img src="../../../assets/logo/logo.png" alt=""
        /></a>
      </div>

      <div class="header__search">
        <form>
          <input type="text" #input placeholder="Search" />
          <button><i class="material-icons">search</i></button>
        </form>
      </div>

      <div class="header__icons">
        <!-- <i class="material-icons display-this">search</i> -->
        <!-- <i class="material-icons">videocam</i> -->
        <a routerLink="/admin/upload" class="videoiconup">
          <i class="material-icons">videocam</i></a
        >
        <i class="material-icons">apps</i>
        <i class="material-icons">notifications</i>

        <span *ngIf="!this.resData">
          <a class="signin" (click)="youtubeService.signIn()"
            ><i class="material-icons display-this">account_circle</i>
            <span class="signn">SIGN IN</span></a
          >
        </span>
        <span *ngIf="this.youtubeService.profile$ | async as profile">
          <mat-form-field class="full-width" *ngIf="profile.getEmail()">
            <div class="author">
              <img
                src="{{ profile.getImageUrl() }}"
                alt=""
                title="{{ profile.getName() }}"
              />
            </div>
            <mat-select>
              <mat-option (click)="this.youtubeService.signOut()"
                >Logout</mat-option
              >
            </mat-select>
          </mat-form-field>
        </span>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('input') inputElement: ElementRef;
  constructor(
    private searchService: SearchService,
    private router: Router,
    public youtubeService: YoutubeService
  ) {}
  inputValue: any;
  inputV: any;
  videos: Video[] = [];
  resData: any;
  result: any = [];

  ngOnInit(): void {
    this.youtubeService.profile$.subscribe((res) => {
      this.resData = res;
    });
  }
  ngAfterViewInit() {
    if (this.inputElement) {
      fromEvent(this.inputElement.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          pluck('target', 'value'),
          distinctUntilChanged()
        )
        .subscribe((value) => {
          this.inputValue = this.inputElement.nativeElement.value;
          if (this.inputValue) {
            this.router.navigate(['/search'], {
              queryParams: { query: this.inputValue },
            });
          }
        });
    }
  }
}
