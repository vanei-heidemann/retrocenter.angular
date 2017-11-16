import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafilesComponent } from './datafiles.component';

describe('DatafilesComponent', () => {
  let component: DatafilesComponent;
  let fixture: ComponentFixture<DatafilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
