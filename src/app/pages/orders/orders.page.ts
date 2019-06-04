import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage implements OnInit {
  currentPage = 'discover';
  @ViewChild('slides') slides: IonSlides;
  constructor() {}

  ngOnInit() {}

  slideChange() {
    let index: any;
    this.slides.getActiveIndex().then(num => {
      index = num;
      if (index === 0) {
        this.currentPage = 'discover';
      } else if (index === 1) {
        this.currentPage = 'pending';
      } else if (index === 2) {
        this.currentPage = 'today';
      }
    });
  }

  segmentChange(ev) {
    if (ev.detail.value === 'discover') {
      this.slides.slideTo(0);
    } else if (ev.detail.value === 'pending') {
      this.slides.slideTo(1);
    } else if (ev.detail.value === 'today') {
      this.slides.slideTo(2);
    }
  }
}
