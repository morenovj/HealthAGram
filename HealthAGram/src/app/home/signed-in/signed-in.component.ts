import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gym } from 'src/app/models/gym';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { ExerciseFollowListComponent } from './exercise-follow-list/exercise-follow-list.component';
import { take, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import * as firebase from 'firebase/app';
import { ExerciseDescriptionComponent } from './exercise-description/exercise-description.component';
import { CreateGymComponent } from './create-gym/create-gym.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';

@Component({
  selector: 'app-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss'],
})
export class SignedInComponent implements OnInit {
  gymList: Observable<any>;
  userGym: Observable<any>;
  exercisesObservable: Observable<any>;
  exerciseScores: Observable<any>;
  apiKey = environment.firebaseConfig.apiKey;
  gymEncoded;

  constructor(public authService: AuthService, private afs: AngularFirestore, private modalController: ModalController, private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.gymList = this.afs.collection<Gym>('/gyms').snapshotChanges();
    this.userGym = this.authService.user.pipe(switchMap(user => {
      if(user.gym !== "" || user.gym) {
        this.afs.doc<any>(`gyms/${user.gym}`).valueChanges().pipe(take(1)).subscribe(gym => {
          this.gymEncoded = encodeURI(gym.direccion);
        });
        return this.afs.doc(`gyms/${user.gym}`).valueChanges();
      }
      return of(null);
    }));
    this.exercisesObservable = this.authService.user.pipe(switchMap(user => {
      if (user.exercises.length > 0) {
        let subscriptions = user.exercises.map(exercise => {
          return this.afs.doc<any>(`ejercicios/${exercise.id}`).snapshotChanges();
        });
        return combineLatest(subscriptions);
      } else {
        return of(null);
      }
    }))
  }

  removeExerciseFollow(id, weight, reps) {
    this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).ref.update('exercises', firebase.firestore.FieldValue.arrayRemove({id, weight, reps}));
  }

  updateExerciseDetails(id, index, weight, reps) {
    this.modalController.create({
      component: EditExerciseComponent,
      componentProps: {
        id,
        index,
        weight,
        reps
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }

  openEditProfileModal() {
    this.authService.user.pipe(take(1)).subscribe(user => {
      this.modalController.create({
        component: EditProfileComponent,
        componentProps: {
          name: user.displayName,
          weight: user.weight,
          height: user.height,
          age: user.age
        }
      }).then(modalComponent => {
        modalComponent.present();
      })
    })
  }

  openExerciseInfoModal(id: string) {
    this.modalController.create({
      component: ExerciseDescriptionComponent,
      componentProps: {
        exerciseId: id
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }

  createGym() {
    this.modalController.create({
      component: CreateGymComponent
    }).then(modalEl => {
      modalEl.present();
    })
  }

  openExerciseFollowList() {
    this.modalController.create({
      component: ExerciseFollowListComponent
    }).then(modalEl => {
      modalEl.present();
    })
  }

  confirmGym(gymId) {
    this.actionSheetController.create({
      header: '¿Quieres formar parte de este Gym?',
      mode: 'ios',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: () => this.addGymMembership(gymId)
        }
      ]
    }).then(actionSheet => {
      actionSheet.present();
    })
  }

  confirmGymRemoval() {
    this.actionSheetController.create({
      header: '¿Quieres salir de este Gym?',
      mode: 'ios',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: () => this.removeGymMembership()
        }
      ]
    }).then(actionSheet => {
      actionSheet.present();
    })
  }

  addGymMembership(gymId) {
    this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).update({gym: gymId});
  }

  removeGymMembership() {
    this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).update({gym: null});
  }



}
