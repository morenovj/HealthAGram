import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjerciciosPageRoutingModule } from './ejercicios-routing.module';

import { EjerciciosPage } from './ejercicios.page';
import { YoutubePipe } from './youtube.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjerciciosPageRoutingModule
  ],
  declarations: [EjerciciosPage, YoutubePipe]
})
export class EjerciciosPageModule {}
