import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-payed',
  templateUrl: './payed.component.html',
  styleUrls: ['./payed.component.scss']
})
export class PayedComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
