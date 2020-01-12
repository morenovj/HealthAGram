import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjerciciosPageRoutingModule } from './ejercicios-routing.module';

import { EjerciciosPage } from './ejercicios.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    IonicModule,
    EjerciciosPageRoutingModule
  ],
  declarations: [EjerciciosPage],
})
export class EjerciciosPageModule {}
