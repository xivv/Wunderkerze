import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-administration-overview',
  templateUrl: './order-administration-overview.component.html',
  styleUrls: ['./order-administration-overview.component.scss']
})
export class OrderAdministrationOverviewComponent implements OnInit {

  constructor() { }

  statuses = ['Bestellt', 'In Bearbeitung', 'Erwarte Zahlung', 'Zahlung erhalten', 'In Zustellung', 'Zugestellt', 'Ungültig'];

  ngOnInit() {
  }

}
