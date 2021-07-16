import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnServiceComponent } from './un-service.component';

describe('UnServiceComponent', () => {
  let component: UnServiceComponent;
  let fixture: ComponentFixture<UnServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
