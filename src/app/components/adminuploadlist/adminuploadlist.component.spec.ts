import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuploadlistComponent } from './adminuploadlist.component';

describe('AdminuploadlistComponent', () => {
  let component: AdminuploadlistComponent;
  let fixture: ComponentFixture<AdminuploadlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuploadlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuploadlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
