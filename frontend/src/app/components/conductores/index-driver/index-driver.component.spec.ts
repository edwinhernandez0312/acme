import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDriverComponent } from './index-driver.component';

describe('IndexDriverComponent', () => {
  let component: IndexDriverComponent;
  let fixture: ComponentFixture<IndexDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
