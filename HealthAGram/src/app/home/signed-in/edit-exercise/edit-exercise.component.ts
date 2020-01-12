import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss'],
})
export class EditExerciseComponent implements OnInit {
  @Input() id: string;
  @Input() weight: number;
  @Input() reps: number;
  @Input() index: number;
  editingForm: FormGroup;

  constructor(private modalController: ModalController, private afs: AngularFirestore, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.editingForm = this.fb.group({
      weight: [this.weight, Validators.required],
      reps: [this.reps, Validators.required],
    })
  }

  modalDismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).ref.update('exercises', firebase.firestore.FieldValue.arrayRemove({id: this.id, weight: this.weight, reps: this.reps})).then(() => {
      this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).ref.update('exercises', firebase.firestore.FieldValue.arrayUnion({id: this.id, weight: this.editingForm.value.weight, reps: this.editingForm.value.reps}))
    });
  }

}
