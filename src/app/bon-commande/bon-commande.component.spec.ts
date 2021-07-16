import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeComponent } from './bon-commande.component';

describe('BonCommandeComponent', () => {
  let component: BonCommandeComponent;
  let fixture: ComponentFixture<BonCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
