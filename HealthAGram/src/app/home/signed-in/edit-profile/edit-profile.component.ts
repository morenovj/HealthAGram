import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() name: string;
  @Input() weight: number;
  @Input() height: number;
  @Input() age: number;
  editingForm: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.editingForm = this.fb.group({
      displayName: [this.name, Validators.required],
      weight: [this.weight, Validators.required],
      height: [this.height, Validators.required],
      age: [this.age, Validators.required],
    })
  }

  modalDismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.authService.updateUser(this.editingForm.value);
    this.modalController.dismiss();
  }

}
