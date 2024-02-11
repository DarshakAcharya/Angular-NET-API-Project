import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfileComponent } from './testfile.component';

describe('TestfileComponent', () => {
  let component: TestfileComponent;
  let fixture: ComponentFixture<TestfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestfileComponent]
    });
    fixture = TestBed.createComponent(TestfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
