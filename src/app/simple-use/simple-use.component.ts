import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-use',
  templateUrl: './simple-use.component.html',
  styleUrls: ['./simple-use.component.css']
})
export class SimpleUseComponent implements OnInit {
  data = [
    {
      list: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      currentIndex: 4
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  change ({ gIndex, iIndex }) {
    console.log(gIndex, iIndex)
  }
}
