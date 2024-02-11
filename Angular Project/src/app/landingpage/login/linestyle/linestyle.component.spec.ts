import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinestyleComponent } from './linestyle.component';

describe('LinestyleComponent', () => {
  let component: LinestyleComponent;
  let fixture: ComponentFixture<LinestyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinestyleComponent]
    });
    fixture = TestBed.createComponent(LinestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
