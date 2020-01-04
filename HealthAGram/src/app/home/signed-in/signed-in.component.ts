import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gym } from 'src/app/models/gym';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss'],
})
export class SignedInComponent implements OnInit {
  gymList: Observable<Gym[]>;

  constructor(public authService: AuthService, private afs: AngularFirestore, private modalController: ModalController) { }

  ngOnInit() {
    this.gymList = this.afs.collection<Gym>('/gyms').valueChanges();
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



}
