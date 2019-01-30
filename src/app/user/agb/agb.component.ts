import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agb',
  templateUrl: './agb.component.html',
  styleUrls: ['./agb.component.scss']
})
export class AgbComponent implements OnInit {

  constructor() { }

  pdfSrc = 'assets/agb.pdf';

  ngOnInit() {
  }

}
