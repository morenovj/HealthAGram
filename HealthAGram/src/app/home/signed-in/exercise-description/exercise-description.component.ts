import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-exercise-description',
  templateUrl: './exercise-description.component.html',
  styleUrls: ['./exercise-description.component.scss'],
})
export class ExerciseDescriptionComponent implements OnInit {
  @Input() exerciseId: string;
  actividad: Observable<any>

  constructor(private modalController: ModalController, private afs: AngularFirestore) { }

  ngOnInit() {
    this.actividad = this.afs.doc(`ejercicios/${this.exerciseId}`).valueChanges();
  }

  modalDismiss() {
    this.modalController.dismiss();
  }
}
