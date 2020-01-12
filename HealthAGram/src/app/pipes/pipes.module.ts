import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePipe } from './youtube.pipe';



@NgModule({
  declarations: [YoutubePipe],
  imports: [
    CommonModule
  ],
  exports: [
    YoutubePipe
  ]
})
export class PipesModule { }
