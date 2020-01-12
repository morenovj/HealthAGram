import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-not-signed-in',
  templateUrl: './not-signed-in.component.html',
  styleUrls: ['./not-signed-in.component.scss'],
})
export class NotSignedInComponent implements OnInit {
  topGyms: Observable<any>

  constructor(public authService: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.topGyms = this.afs.collection('/gyms', ref => ref.orderBy('rating', 'desc').limit(3)).valueChanges()
  }

  signIn() {
    this.authService.signIn();
  }

}
