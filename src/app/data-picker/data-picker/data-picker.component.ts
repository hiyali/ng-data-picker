import {
  OnInit, AfterViewInit, OnDestroy, Inject, Component,
  Input, Output, EventEmitter, ElementRef, ViewChild, ViewChildren
} from '@angular/core'

import { PickerDataModel } from './data-picker.models'
export { PickerDataModel }

@Component({
  selector: 'ng-data-picker',
  // templateUrl: './data-picker.component.html',
  template: `
    <div class="ng-data-picker flex-box">

      <!-- picker-group-layer -->
      <div #pickerGroupLayer *ngFor="let group of data; let gIndex = index"
        class="picker-group" [ngClass]="getGroupClass(gIndex)">

        <div class="picker-list">
          <div *ngIf="group.divider else ngIfElse"
            class="picker-item divider" [ngClass]="getItemClass(gIndex, iIndex, true)">
            {{ group.text }}
          </div>

          <div #ngIfElse *ngFor="let item of group.list; let iIndex = index"
            class="picker-item" [ngClass]="getItemClass(gIndex, iIndex)" [ngStyle]="getItemStyle(gIndex, iIndex)">
            {{ item.value || item }}
          </div>
        </div>

      </div>

      <div #pickerHandleLayer class="picker-handle-layer flex-box dir-column">
        <div data-type="top" class="picker-top weight-1"></div>
        <div data-type="middle" class="picker-middle"></div>
        <div data-type="bottom" class="picker-bottom weight-1"></div>
      </div>

    </div>
  `,
  // styleUrls: ['./data-picker.component.scss']
  styles: [`
    .ng-data-picker {
      font-size: 1rem;
      height: 10em;
      position: relative;
      background-color: white;
      overflow: hidden;
    }
    .ng-data-picker.black {
      color: white;
    }
    .ng-data-picker .picker-group {
    }
    .ng-data-picker .picker-list {
      height: 6.25em;
      position: relative;
      top: 4em; // half of picker height - half of item height
    }
    .ng-data-picker .picker-item {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      text-align: center;
      will-change: transform;
      contain: strict;
      height: 2em;
      line-height: 2;
      font-size: 1em;
    }
    .ng-data-picker .selected-item {
    }

    /* picker handle layer */
    .ng-data-picker .picker-handle-layer {
      position: absolute;
      width: 100%;
      height: calc(100% + 2px);
      left: 0;
      right: 0;
      top: -1px;
      bottom: -1px;
    }
    .ng-data-picker .picker-handle-layer .picker-top {
      border-bottom: 0.55px solid rgba(74, 73, 89, 0.5);
      background: linear-gradient(to bottom, white 2%, rgba(255, 255, 255, 0.1) 100%);
      transform: translate3d(0, 0, 5.625em);
    }
    .ng-data-picker .picker-handle-layer .picker-middle {
      height: 2em;
    }
    .ng-data-picker .picker-handle-layer .picker-bottom {
      border-top: 0.55px solid rgba(74, 73, 89, 0.5);
      background: linear-gradient(to top, white 2%, rgba(255, 255, 255, 0.1) 100%);
      transform: translate3d(0, 0, 5.625em);
    }

    /* flex system */
    .flex-box {
        display: flex;
    }
    .flex-box.dir-column {
      flex-direction: column;
    }
    .flex-box.dir-row {
      flex-direction: row;
    }

    /* flex system - for items */
    .flex-box .weight-1 {
      flex: 1;
    }
    .flex-box .weight-2 {
      flex: 2;
    }
    .flex-box .weight-3 {
      flex: 3;
    }
    .flex-box .weight-4 {
      flex: 4;
    }
    .flex-box .weight-5 {
      flex: 5;
    }
    .flex-box .weight-6 {
      flex: 6;
    }
    .flex-box .weight-7 {
      flex: 7;
    }
    .flex-box .weight-8 {
      flex: 8;
    }
    .flex-box .weight-9 {
      flex: 9;
    }
    .flex-box .weight-10 {
      flex: 10;
    }
    .flex-box .weight-11 {
      flex: 11;
    }
    .flex-box .weight-12 {
      flex: 12;
    }
  `]
})
export class DataPickerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('pickerGroupLayer') pickerGroupLayer
  @ViewChild('pickerHandleLayer') pickerHandleLayer

  @Input() data: PickerDataModel[] = []
  @Output() change: EventEmitter<any> = new EventEmitter<any>()

  currentIndexList: number[]
  lastCurrentIndexList: number[]
  groupsRectList: any[]
  touchOrMouse = {
    isTouchable: 'ontouchstart' in window,
    isMouseDown: false
  }
  draggingInfo = {
    isDragging: false,
    groupIndex: null,
    startPageY: null
  }
  itemPerDegree = 23
  safeDoTimeoutId: any = null

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    // console.log('picker dom', elementRef.nativeElement)
  }

  ngOnInit() {
    this.currentIndexList = this.getInitialCurrentIndexList()
    this.lastCurrentIndexList = [].concat(this.currentIndexList)

    this.groupsRectList = new Array(this.data.length)

    this.eventsRegister()
    window.addEventListener('resize', this.safeGetRectsBindEvents.bind(this))
  }

  ngAfterViewInit() {
    this.getGroupsRectList()
  }

  ngOnDestroy () {
    window.removeEventListener('resize', this.safeGetRectsBindEvents.bind(this))
  }

  setGroupData (gIndex, groupData) {
    if (!this.currentIndexList) {
      this.currentIndexList = this.getInitialCurrentIndexList()
    }
    this.data[gIndex] = groupData
    const iCI = groupData.currentIndex
    let movedIndex = 0
    if (typeof iCI === 'number' && iCI >= 0 && groupData.list && groupData.list.length && iCI <= groupData.list.length - 1) {
      movedIndex = Math.round(iCI)
    }
    this.currentIndexList[gIndex] = movedIndex
    this.lastCurrentIndexList = [].concat(this.currentIndexList)
  }

  getInitialCurrentIndexList () {
    return this.data.map((item, index) => {
      const iCI = item.currentIndex
      if (typeof iCI === 'number' && iCI >= 0 && item.list && item.list.length && iCI <= item.list.length - 1) {
        return Math.round(iCI)
      }
      return 0
    })
  }

  safeGetRectsBindEvents () {
    if (this.safeDoTimeoutId) {
      clearTimeout(this.safeDoTimeoutId)
    }
    this.safeDoTimeoutId = setTimeout(() => {
      this.getGroupsRectList()
    }, 200)
  }

  getGroupsRectList () {
    if (this.pickerGroupLayer) {
      this.pickerGroupLayer.toArray().forEach((item, index) => {
        this.groupsRectList[index] = item.nativeElement.getBoundingClientRect()
      })
    }
  }

  eventsRegister () {
    const handleEventLayer = this.pickerHandleLayer.nativeElement
    if (handleEventLayer) {
      this.addEventsForElement(handleEventLayer)
    }
  }

  addEventsForElement (el) {
    const _ = this.touchOrMouse.isTouchable
    const eventHandlerList = [
      { name: _ ? 'touchstart' : 'mousedown', handler: this.handleStart },
      { name: _ ? 'touchmove' : 'mousemove', handler: this.handleMove },
      { name: _ ? 'touchend' : 'mouseup', handler: this.handleEnd },
      { name: _ ? 'touchcancel' : 'mouseleave', handler: this.handleCancel }
    ]
    eventHandlerList.forEach((item, index) => {
      el.removeEventListener(item.name, item.handler, false)
      el.addEventListener(item.name, item.handler.bind(this), false)
    })
  }

  triggerMiddleLayerGroupClick (gIndex) {
    const data = this.data
    if (typeof gIndex === 'number' && typeof data[gIndex].onClick === 'function') {
      data[gIndex].onClick(gIndex, this.currentIndexList[gIndex])
    }
  }

  triggerAboveLayerClick (ev, gIndex) {
    const movedIndex = this.currentIndexList[gIndex] + 1
    this.currentIndexList[gIndex] = movedIndex
    this.correctionCurrentIndex(ev, gIndex)
  }

  triggerMiddleLayerClick (ev, gIndex) {
    this.triggerMiddleLayerGroupClick(gIndex)
  }

  triggerBelowLayerClick (ev, gIndex) {
    const movedIndex = this.currentIndexList[gIndex] - 1
    this.currentIndexList[gIndex] = movedIndex
    this.correctionCurrentIndex(ev, gIndex)
  }

  getTouchInfo (ev) {
    return this.touchOrMouse.isTouchable ? ev.changedTouches[0] || ev.touches[0] : ev
  }

  getGroupIndexBelongsEvent (ev) {
    const touchInfo = this.getTouchInfo(ev)
    for (let i = 0; i < this.groupsRectList.length; i++) {
      const item = this.groupsRectList[i]
      if (item.left < touchInfo.pageX && touchInfo.pageX < item.right) {
        return i
      }
    }
    return null
  }

  handleEventClick (ev) {
    const gIndex = this.getGroupIndexBelongsEvent(ev)
    switch (ev.target.dataset.type) {
      case 'top':
        this.triggerAboveLayerClick(ev, gIndex)
        break
      case 'middle':
        this.triggerMiddleLayerClick(ev, gIndex)
        break
      case 'bottom':
        this.triggerBelowLayerClick(ev, gIndex)
        break
      default:
    }
  }

  handleStart (ev) {
    if (ev.cancelable) {
      ev.preventDefault()
      ev.stopPropagation()
    }
    const touchInfo = this.getTouchInfo(ev)
    this.draggingInfo.startPageY = touchInfo.pageY
    if (!this.touchOrMouse.isTouchable) {
      this.touchOrMouse.isMouseDown = true
    }
  }

  handleMove (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (this.touchOrMouse.isTouchable || this.touchOrMouse.isMouseDown) {
      this.draggingInfo.isDragging = true
      this.setCurrentIndexOnMove(ev)
    }
  }

  handleEnd (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (!this.draggingInfo.isDragging) {
      this.handleEventClick(ev)
    }
    this.draggingInfo.isDragging = false
    this.touchOrMouse.isMouseDown = false
    this.correctionAfterDragging(ev)
  }

  handleCancel (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (this.touchOrMouse.isTouchable || this.touchOrMouse.isMouseDown) {
      this.correctionAfterDragging(ev)
      this.touchOrMouse.isMouseDown = false
      this.draggingInfo.isDragging = false
    }
  }

  setCurrentIndexOnMove (ev) {
    const touchInfo = this.getTouchInfo(ev)
    if (this.draggingInfo.groupIndex === null) {
      this.draggingInfo.groupIndex = this.getGroupIndexBelongsEvent(ev)
    }
    const gIndex = this.draggingInfo.groupIndex
    if (typeof gIndex === 'number' && (this.data[gIndex].divider || !this.data[gIndex].list)) {
      return
    }
    const moveCount = (this.draggingInfo.startPageY - touchInfo.pageY) / 32
    const movedIndex = this.currentIndexList[gIndex] + moveCount
    this.currentIndexList[gIndex] = movedIndex
    this.draggingInfo.startPageY = touchInfo.pageY
  }

  correctionAfterDragging (ev) {
    const gIndex = this.draggingInfo.groupIndex
    this.correctionCurrentIndex(ev, gIndex)
    this.draggingInfo.groupIndex = null
    this.draggingInfo.startPageY = null
  }

  correctionCurrentIndex (ev, gIndex) {
    setTimeout(() => {
      if (typeof gIndex === 'number' && this.data[gIndex].divider !== true && this.data[gIndex].list.length > 0) {
        const unsafeGroupIndex = this.currentIndexList[gIndex]
        let movedIndex = unsafeGroupIndex
        if (unsafeGroupIndex > this.data[gIndex].list.length - 1) {
          movedIndex = this.data[gIndex].list.length - 1
        } else if (unsafeGroupIndex < 0) {
          movedIndex = 0
        }
        movedIndex = Math.round(movedIndex)
        this.currentIndexList[gIndex] = movedIndex
        if (movedIndex !== this.lastCurrentIndexList[gIndex]) {
          this.change.emit({ gIndex, iIndex: movedIndex })
        }
        this.lastCurrentIndexList = [].concat(this.currentIndexList)
      }
    }, 100)
  }

  isCurrentItem (gIndex, iIndex) {
    return this.currentIndexList[gIndex] === iIndex
  }

  getCurrentIndexList () {
    return this.currentIndexList
  }

  getGroupClass (gIndex) {
    const group = this.data[gIndex]
    const defaultWeightClass = 'weight-' + (group.weight || 1)
    const groupClass = [defaultWeightClass]
    if (group.className) {
      groupClass.push(group.className)
    }
    return groupClass
  }

  getItemClass (gIndex, iIndex, isDivider = false) {
    const group = this.data[gIndex]
    const itemClass = []
    if (!isDivider && this.isCurrentItem(gIndex, iIndex)) {
      itemClass.push('smooth-item-selected')
    }
    if (group.textAlign) {
      itemClass.push('text-' + group.textAlign)
    }
    return itemClass
  }

  getItemStyle (gIndex, iIndex) {
    const gapCount = this.currentIndexList[gIndex] - iIndex
    if (Math.abs(gapCount) < (90 / this.itemPerDegree)) {
      const rotateStyle = {
        transform: 'rotateX(' + gapCount * this.itemPerDegree + 'deg) translate3d(0, 0, 5.625em)',
        opacity: (1 - Math.abs(gapCount) / (90 / this.itemPerDegree)).toString()
      }
      if (!this.draggingInfo.isDragging) {
        rotateStyle['transition'] = 'transform 150ms ease-out'
      }
      return rotateStyle
    }
    if (gapCount > 0) {
      return { transform: 'rotateX(90deg) translate3d(0, 0, 5.625em)' }
    } else {
      return { transform: 'rotateX(-90deg) translate3d(0, 0, 5.625em)' }
    }
  }
}
