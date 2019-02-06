import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/user/contact/contact.service';

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.scss']
})
export class ContactManagementComponent implements OnInit {

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

}
