import { Component, ViewChild, OnInit } from '@angular/core';
import { DataPickerComponent, PickerDataModel } from 'ng-data-picker';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {
  @ViewChild('dataPicker') dataPicker: DataPickerComponent

  hidePicker = true
  nowYear: number

  data: Array<PickerDataModel> = [
    {
      currentIndex: Math.round((this.nowYear - 1991) / 2),
      weight: 3,
      list: [],
      onClick: this.clickOnYear.bind(this),
      textAlign: 'center',
      className: 'row-group'
    },
    {
      currentIndex: 8,
      weight: 3,
      list: [],
      onClick: this.clickOnMonth.bind(this),
      textAlign: 'center',
      className: 'row-group'
    },
    {
      currentIndex: 1, // 1991-9-2 , a birth day?
      weight: 3,
      list: [],
      onClick: this.clickOnDay.bind(this),
      textAlign: 'center',
      className: 'item-group'
    }
  ]

  constructor () {
    // now year
    this.nowYear = (new Date()).getFullYear()

    // First groups - years list: from 1991 ?
    this.pushNumbers(this.data[0].list, this.nowYear, 1991)
    // Second groups - months list
    this.pushNumbers(this.data[1].list)
    // Third groups - days list
    this.pushNumbers(this.data[2].list, 30)
  }

  ngOnInit () {
    console.log()
    setTimeout(() => {
      this.hidePicker = false
    }, 1000)
  }

  toggle () {
    this.hidePicker = !this.hidePicker
    // if you use like hidden props for hide the picker, you must call below function after picker rendered
    // or use *ngIf instead on template for show & hide logic
    if (!this.hidePicker) {
      setTimeout(() => {
        this.dataPicker.getGroupsRectList()
      }, 100)
    }
  }

  pushNumbers (target: Array<number>, to: number = 12, from: number = 1): Array<number> {
    for (let i = from; i <= to; i++) {
      target.push(i)
    }
    return target
  }

  isLeapYear (year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
  }

  dataChange ({ gIndex, iIndex }) {
    console.log('list', gIndex, iIndex)
    const ciList = this.dataPicker.getCurrentIndexList()

    if (gIndex === 0 || gIndex === 1) { // year or month changed
      let currentIndex = 15
      let monthCount = 30

      let month = iIndex + 1 // equal to month
      if (gIndex === 0) { // year changed
        month = this.data[1].list[ciList[1]]
      }
      switch (month) {
        case 2: // special month ha?
          let selectedYear = this.data[0].list[ciList[0]] // month
          if (gIndex === 0) { // year
            selectedYear = this.data[0].list[iIndex]
          }

          let isLeapYear = false
          if (this.isLeapYear(selectedYear)) {
            isLeapYear = true
          }

          monthCount = 28
          currentIndex = 14
          if (isLeapYear) {
            monthCount = 29
            currentIndex = 15
          }
          break
        case 4:
        case 6:
        case 9:
        case 11:
          monthCount = 30
          currentIndex = 15
          break
        default:
          monthCount = 31
          currentIndex = 16
      }

      const list = this.pushNumbers([], monthCount)
      this.dataPicker.setGroupData(2, { ...this.data[2], ...{ currentIndex, list }})
    }
  }

  alertOnClick (message: string, gIndex: number, iIndex: number) {
    alert(message + ' ' + this.data[gIndex].list[iIndex])
  }

  clickOnYear (gIndex, iIndex) {
    this.alertOnClick('Clicked year', gIndex, iIndex)
  }
  clickOnMonth (gIndex, iIndex) {
    this.alertOnClick('Clicked month', gIndex, iIndex)
  }
  clickOnDay (gIndex, iIndex) {
    this.alertOnClick('Clicked day', gIndex, iIndex)
  }

  confirm () {
    const ciList = this.dataPicker.getCurrentIndexList()
    const year = this.data[0].list[ciList[0]]
    const month = this.data[1].list[ciList[1]]
    const day = this.data[2].list[ciList[2]]
    alert(
      year + ' / ' + month + ' / ' + day
    )
  }
}
