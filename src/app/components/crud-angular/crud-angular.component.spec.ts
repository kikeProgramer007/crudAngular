import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAngularComponent } from './crud-angular.component';

describe('CrudAngularComponent', () => {
  let component: CrudAngularComponent;
  let fixture: ComponentFixture<CrudAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
