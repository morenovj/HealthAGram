import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonSlides } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  fireList;
  constructor(public authService: AuthService, private domSanitizer: DomSanitizer, public afs: AngularFirestore) { 
    this.fireList = this.authService.user.pipe(switchMap(user => {
      return this.afs.collection(
        `ejercicios`, ref => ref.where('idU', '==', this.currentIndex)
      ).valueChanges();
    }));
  }

  currentIndex = 0; // Variable para almacenar el indice del slide actual
  slideChanged(e: any) { // Metodo para obtener el indice del slide al cambio
    this.slides.getActiveIndex().then((index: number) => {
        console.log(index); // DEBUG BORRAR
        this.currentIndex = index;
    });
  }
  trustedVideoUrl: SafeResourceUrl;
  // Lista de videos con la ejecucion de cada ejercicio.
  videoList = [{vid_link:"https://www.youtube.com/embed/X_0XICtTQEo"},{vid_link:"https://www.youtube.com/embed/-4qRntuXBSc"},
  {vid_link:"https://www.youtube.com/embed/2yjwXTZQDDI"}];

  ionViewWillEnter(): void {
    for(let currentIndex of this.videoList){
      this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(currentIndex.vid_link);
    }
  }  




  ngOnInit() {
  }

}
