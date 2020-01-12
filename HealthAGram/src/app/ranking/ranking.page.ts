import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  topGyms: Observable<any>;

  constructor(public authService: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.topGyms = this.afs.collection('/gyms', ref => ref.orderBy('rating', 'desc')).valueChanges();
  }

}
