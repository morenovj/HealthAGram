import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-exercise-follow-list',
  templateUrl: './exercise-follow-list.component.html',
  styleUrls: ['./exercise-follow-list.component.scss'],
})
export class ExerciseFollowListComponent implements OnInit {
  exerciseList: Observable<any>;
  userSubscription: Subscription;
  subscribedExerciseIds: Array<String>;

  constructor(private modalController: ModalController, private afs: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.subscribedExerciseIds = user.exercises.map(exercise => {
        return exercise.id;
      })
    });
    this.exerciseList = this.afs.collection('/ejercicios').snapshotChanges();
  }

  followExercise(id) {
    if(!this.subscribedExerciseIds.includes(id)) {
      this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).ref.update('exercises', firebase.firestore.FieldValue.arrayUnion({id, weight: null, reps: null}));
      console.log('exercise followed')
    }
  }

  ionViewWillExit() {
    this.userSubscription.unsubscribe();
  }

  modalDismiss() {
    this.modalController.dismiss();
  }

}
