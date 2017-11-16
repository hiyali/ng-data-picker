import { Component } from '@angular/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent {
  data = [
    {
      list: ['male', 'female', 'secret'],
      currentIndex: 4
    }
  ]

  constructor () {
    /*noop*/
  }

  change ({ gIndex, iIndex }) {
    console.log(iIndex, this.data[gIndex].list[iIndex])
  }
}
