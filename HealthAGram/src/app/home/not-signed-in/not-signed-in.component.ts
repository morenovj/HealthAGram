import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-signed-in',
  templateUrl: './not-signed-in.component.html',
  styleUrls: ['./not-signed-in.component.scss'],
})
export class NotSignedInComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {}

  signIn() {
    this.authService.signIn();
  }

}
