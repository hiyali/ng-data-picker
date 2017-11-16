import { Component, ViewChild } from '@angular/core';
import { DataPickerComponent } from 'ng-data-picker';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @ViewChild('dataPicker') dataPicker: DataPickerComponent

  data: Array<any> = [
    {
      currentIndex: 0,
      weight: 3,
      list: [
        'Plan A - free', 'Plan B - $50', 'Plan C - $100'
      ],
      onClick: this.clickOnPlan.bind(this),
      textAlign: 'center',
      className: 'row-group'
    },
    {
      divider: true,
      weight: 1,
      text: 'product',
      textAlign: 'center',
      className: 'divider'
    },
    {
      currentIndex: 2,
      weight: 3,
      list: [
        '1 * A item', '2 * A items', '3 * A items', '4 * A items', '5 * A items'
      ],
      onClick: this.clickOnProduct.bind(this),
      textAlign: 'center',
      className: 'item-group'
    }
  ]

  constructor () {
    /*noop*/
  }

  dataChange ({ gIndex, iIndex }) {
    console.log('list', gIndex, iIndex)
    if (gIndex === 0) {
      let currentIndex = 0
      let list = []
      switch (iIndex) {
        case 2:
          list = ['C item 1', 'C item 2', 'C item 3', 'C item 4', 'C item 5', 'C item 6', 'C item 7', 'C item 8', 'C item 9']
          currentIndex = 4
          break
        case 1:
          list = ['1 * B item', '2 * B items', '3 * B items', '4 * B items', '5 * B items', '6 * B items', '7 * B items']
          currentIndex = 3
          break
        default:
          list = ['1 * A item', '2 * A items', '3 * A items', '4 * A items', '5 * A items']
          currentIndex = 2
      }
      this.dataPicker.setGroupData(2, { ...this.data[2], ...{ currentIndex, list }})
    }
  }

  clickOnPlan (gIndex, iIndex) {
    console.log(gIndex, iIndex)
    alert('Clicked plan: ' + this.data[gIndex].list[iIndex])
  }

  clickOnProduct (gIndex, iIndex) {
    alert('Clicked product: ' + this.data[gIndex].list[iIndex])
  }

  confirm () {
    const ciList = this.dataPicker.getCurrentIndexList()
    const planDetail = this.data[0].list[ciList[0]]
    const productDetail = this.data[2].list[ciList[2]]

    alert(
      'Confirmed index list: ' + ciList + '.\n' +
      'Confirmed plan: ' + planDetail + '.\n' +
      'Confirmed product: ' + productDetail
    )
  }
}
