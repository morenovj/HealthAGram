import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrls: ['./create-gym.component.scss'],
})
export class CreateGymComponent implements OnInit {
  gymCreationForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private modalController: ModalController) { }

  ngOnInit() {
    this.gymCreationForm = this.fb.group({
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      foto: [null, Validators.required],
      rating: [null, Validators.required],
      descripcion: [null, Validators.required]
    })
  }

  modalDismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.afs.collection('gyms').add(this.gymCreationForm.value);
    this.modalDismiss();
  }

}
