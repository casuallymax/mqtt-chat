import {Component, OnDestroy} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatFabButton} from '@angular/material/button';
import {ApiService} from '../../service/api.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-topic',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFabButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './change-topic.component.html',
  styleUrl: './change-topic.component.scss'
})
export class ChangeTopicComponent implements OnDestroy {

  protected changeTopic = new FormGroup({
      topic: new FormControl<string>('', {nonNullable: true})
  });

  private sub!: Subscription;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submitChange() {
    const body = {
      topic: this.changeTopic.controls.topic.value
    }
    this.sub = this.apiService.changeTopic(body).subscribe((response) => {
      this.toastr.success(response.message, 'Changed Topic to ' + body.topic);
    }, (error) => {
      this.toastr.error(error.error.message, 'Error changing Topic!');
    });
  }

}
