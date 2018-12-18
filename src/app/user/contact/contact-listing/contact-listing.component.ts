import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

}
