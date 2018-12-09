import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { RoleguardService } from '../auth/services/roleguard.service';
import { ShoppingCartService } from '../products/shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private roleguardService: RoleguardService,
    private shoppingCartService: ShoppingCartService) { }

  logout() {
    return this.authService.signOut();
  }

  ngOnInit() {
  }

}
