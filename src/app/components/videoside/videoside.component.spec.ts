import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosideComponent } from './videoside.component';

describe('VideosideComponent', () => {
  let component: VideosideComponent;
  let fixture: ComponentFixture<VideosideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
