import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTopicComponent } from './change-topic.component';

describe('ChangeTopicComponent', () => {
  let component: ChangeTopicComponent;
  let fixture: ComponentFixture<ChangeTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
