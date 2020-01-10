import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonSlides } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  fireList;
  constructor(public authService: AuthService, public afs: AngularFirestore) { 
    this.fireList = this.afs.collection('ejercicios').valueChanges();
  }

  currentIndex = 0; // Variable para almacenar el indice del slide actual
  slideChanged(e: any) { // Metodo para obtener el indice del slide al cambio
    this.slides.getActiveIndex().then((index: number) => {
        this.currentIndex = index;
    });
  }
 
  ngOnInit() {
  }

}
