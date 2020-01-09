import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gym } from 'src/app/models/gym';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss'],
})
export class SignedInComponent implements OnInit {
  gymList: Observable<any>;
  userGym: Observable<any>;

  constructor(public authService: AuthService, private afs: AngularFirestore, private modalController: ModalController, private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.gymList = this.afs.collection<Gym>('/gyms').snapshotChanges();
    this.userGym = this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).valueChanges().pipe(switchMap(user => {
      if(user.gym !== "") {
        return this.afs.doc(`gyms/${user.gym}`).valueChanges();
      }

      return of(null);
    }))
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

  addGymMembership(gymId) {
    this.afs.doc(`users/${this.authService.afAuth.auth.currentUser.uid}`).update({gym: gymId});
  }



}
