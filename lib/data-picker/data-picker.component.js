"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataPickerComponent = (function () {
    function DataPickerComponent(elementRef) {
        this.data = [];
        this.change = new core_1.EventEmitter();
        this.touchOrMouse = {
            isTouchable: 'ontouchstart' in window,
            isMouseDown: false
        };
        this.draggingInfo = {
            isDragging: false,
            groupIndex: null,
            startPageY: null
        };
        this.itemPerDegree = 23;
        // console.log('picker dom', elementRef.nativeElement)
    }
    DataPickerComponent.prototype.ngOnInit = function () {
        this.currentIndexList = this.getInitialCurrentIndexList();
        this.lastCurrentIndexList = [].concat(this.currentIndexList);
        this.groupsRectList = new Array(this.data.length);
        this.eventsRegister();
    };
    DataPickerComponent.prototype.ngAfterViewInit = function () {
        this.getGroupsRectList();
    };
    DataPickerComponent.prototype.setGroupData = function (gIndex, groupData) {
        if (!this.currentIndexList) {
            this.currentIndexList = this.getInitialCurrentIndexList();
        }
        this.data[gIndex] = groupData;
        var iCI = groupData.currentIndex;
        var movedIndex = 0;
        if (typeof iCI === 'number' && iCI >= 0 && groupData.list && groupData.list.length && iCI <= groupData.list.length - 1) {
            movedIndex = Math.round(iCI);
        }
        this.currentIndexList[gIndex] = movedIndex;
        this.lastCurrentIndexList = [].concat(this.currentIndexList);
    };
    DataPickerComponent.prototype.getInitialCurrentIndexList = function () {
        return this.data.map(function (item, index) {
            var iCI = item.currentIndex;
            if (typeof iCI === 'number' && iCI >= 0 && item.list && item.list.length && iCI <= item.list.length - 1) {
                return Math.round(iCI);
            }
            return 0;
        });
    };
    DataPickerComponent.prototype.getGroupsRectList = function () {
        var _this = this;
        if (this.pickerGroupLayer) {
            this.pickerGroupLayer.toArray().forEach(function (item, index) {
                _this.groupsRectList[index] = item.nativeElement.getBoundingClientRect();
            });
        }
    };
    DataPickerComponent.prototype.eventsRegister = function () {
        var handleEventLayer = this.pickerHandleLayer.nativeElement;
        if (handleEventLayer) {
            this.addEventsForElement(handleEventLayer);
        }
    };
    DataPickerComponent.prototype.addEventsForElement = function (el) {
        var _this = this;
        var _ = this.touchOrMouse.isTouchable;
        var eventHandlerList = [
            { name: _ ? 'touchstart' : 'mousedown', handler: this.handleStart },
            { name: _ ? 'touchmove' : 'mousemove', handler: this.handleMove },
            { name: _ ? 'touchend' : 'mouseup', handler: this.handleEnd },
            { name: _ ? 'touchcancel' : 'mouseleave', handler: this.handleCancel }
        ];
        eventHandlerList.forEach(function (item, index) {
            el.removeEventListener(item.name, item.handler, false);
            el.addEventListener(item.name, item.handler.bind(_this), false);
        });
    };
    DataPickerComponent.prototype.triggerMiddleLayerGroupClick = function (gIndex) {
        var data = this.data;
        if (typeof gIndex === 'number' && typeof data[gIndex].onClick === 'function') {
            data[gIndex].onClick(gIndex, this.currentIndexList[gIndex]);
        }
    };
    DataPickerComponent.prototype.triggerAboveLayerClick = function (ev, gIndex) {
        var movedIndex = this.currentIndexList[gIndex] + 1;
        this.currentIndexList[gIndex] = movedIndex;
        this.correctionCurrentIndex(ev, gIndex);
    };
    DataPickerComponent.prototype.triggerMiddleLayerClick = function (ev, gIndex) {
        this.triggerMiddleLayerGroupClick(gIndex);
    };
    DataPickerComponent.prototype.triggerBelowLayerClick = function (ev, gIndex) {
        var movedIndex = this.currentIndexList[gIndex] - 1;
        this.currentIndexList[gIndex] = movedIndex;
        this.correctionCurrentIndex(ev, gIndex);
    };
    DataPickerComponent.prototype.getTouchInfo = function (ev) {
        return this.touchOrMouse.isTouchable ? ev.changedTouches[0] || ev.touches[0] : ev;
    };
    DataPickerComponent.prototype.getGroupIndexBelongsEvent = function (ev) {
        var touchInfo = this.getTouchInfo(ev);
        for (var i = 0; i < this.groupsRectList.length; i++) {
            var item = this.groupsRectList[i];
            if (item.left < touchInfo.pageX && touchInfo.pageX < item.right) {
                return i;
            }
        }
        return null;
    };
    DataPickerComponent.prototype.handleEventClick = function (ev) {
        var gIndex = this.getGroupIndexBelongsEvent(ev);
        switch (ev.target.dataset.type) {
            case 'top':
                this.triggerAboveLayerClick(ev, gIndex);
                break;
            case 'middle':
                this.triggerMiddleLayerClick(ev, gIndex);
                break;
            case 'bottom':
                this.triggerBelowLayerClick(ev, gIndex);
                break;
            default:
        }
    };
    DataPickerComponent.prototype.handleStart = function (ev) {
        if (ev.cancelable) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        var touchInfo = this.getTouchInfo(ev);
        this.draggingInfo.startPageY = touchInfo.pageY;
        if (!this.touchOrMouse.isTouchable) {
            this.touchOrMouse.isMouseDown = true;
        }
    };
    DataPickerComponent.prototype.handleMove = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (this.touchOrMouse.isTouchable || this.touchOrMouse.isMouseDown) {
            this.draggingInfo.isDragging = true;
            this.setCurrentIndexOnMove(ev);
        }
    };
    DataPickerComponent.prototype.handleEnd = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!this.draggingInfo.isDragging) {
            this.handleEventClick(ev);
        }
        this.draggingInfo.isDragging = false;
        this.touchOrMouse.isMouseDown = false;
        this.correctionAfterDragging(ev);
    };
    DataPickerComponent.prototype.handleCancel = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (this.touchOrMouse.isTouchable || this.touchOrMouse.isMouseDown) {
            this.correctionAfterDragging(ev);
            this.touchOrMouse.isMouseDown = false;
            this.draggingInfo.isDragging = false;
        }
    };
    DataPickerComponent.prototype.setCurrentIndexOnMove = function (ev) {
        var touchInfo = this.getTouchInfo(ev);
        if (this.draggingInfo.groupIndex === null) {
            this.draggingInfo.groupIndex = this.getGroupIndexBelongsEvent(ev);
        }
        var gIndex = this.draggingInfo.groupIndex;
        if (typeof gIndex === 'number' && (this.data[gIndex].divider || !this.data[gIndex].list)) {
            return;
        }
        var moveCount = (this.draggingInfo.startPageY - touchInfo.pageY) / 32;
        var movedIndex = this.currentIndexList[gIndex] + moveCount;
        this.currentIndexList[gIndex] = movedIndex;
        this.draggingInfo.startPageY = touchInfo.pageY;
    };
    DataPickerComponent.prototype.correctionAfterDragging = function (ev) {
        var gIndex = this.draggingInfo.groupIndex;
        this.correctionCurrentIndex(ev, gIndex);
        this.draggingInfo.groupIndex = null;
        this.draggingInfo.startPageY = null;
    };
    DataPickerComponent.prototype.correctionCurrentIndex = function (ev, gIndex) {
        var _this = this;
        setTimeout(function () {
            if (typeof gIndex === 'number' && _this.data[gIndex].divider !== true && _this.data[gIndex].list.length > 0) {
                var unsafeGroupIndex = _this.currentIndexList[gIndex];
                var movedIndex = unsafeGroupIndex;
                if (unsafeGroupIndex > _this.data[gIndex].list.length - 1) {
                    movedIndex = _this.data[gIndex].list.length - 1;
                }
                else if (unsafeGroupIndex < 0) {
                    movedIndex = 0;
                }
                movedIndex = Math.round(movedIndex);
                _this.currentIndexList[gIndex] = movedIndex;
                if (movedIndex !== _this.lastCurrentIndexList[gIndex]) {
                    _this.change.emit({ gIndex: gIndex, iIndex: movedIndex });
                }
                _this.lastCurrentIndexList = [].concat(_this.currentIndexList);
            }
        }, 100);
    };
    DataPickerComponent.prototype.isCurrentItem = function (gIndex, iIndex) {
        return this.currentIndexList[gIndex] === iIndex;
    };
    DataPickerComponent.prototype.getCurrentIndexList = function () {
        return this.currentIndexList;
    };
    DataPickerComponent.prototype.getGroupClass = function (gIndex) {
        var group = this.data[gIndex];
        var defaultWeightClass = 'weight-' + (group.weight || 1);
        var groupClass = [defaultWeightClass];
        if (group.className) {
            groupClass.push(group.className);
        }
        return groupClass;
    };
    DataPickerComponent.prototype.getItemClass = function (gIndex, iIndex, isDivider) {
        if (isDivider === void 0) { isDivider = false; }
        var group = this.data[gIndex];
        var itemClass = [];
        if (!isDivider && this.isCurrentItem(gIndex, iIndex)) {
            itemClass.push('smooth-item-selected');
        }
        if (group.textAlign) {
            itemClass.push('text-' + group.textAlign);
        }
        return itemClass;
    };
    DataPickerComponent.prototype.getItemStyle = function (gIndex, iIndex) {
        var gapCount = this.currentIndexList[gIndex] - iIndex;
        if (Math.abs(gapCount) < (90 / this.itemPerDegree)) {
            var rotateStyle = {
                transform: 'rotateX(' + gapCount * this.itemPerDegree + 'deg) translate3d(0, 0, 5.625rem)',
                opacity: (1 - Math.abs(gapCount) / (90 / this.itemPerDegree)).toString()
            };
            if (!this.draggingInfo.isDragging) {
                rotateStyle['transition'] = 'transform 150ms ease-out';
            }
            return rotateStyle;
        }
        if (gapCount > 0) {
            return { transform: 'rotateX(90deg) translate3d(0, 0, 5.625rem)' };
        }
        else {
            return { transform: 'rotateX(-90deg) translate3d(0, 0, 5.625rem)' };
        }
    };
    return DataPickerComponent;
}());
__decorate([
    core_1.ViewChildren('pickerGroupLayer'),
    __metadata("design:type", Object)
], DataPickerComponent.prototype, "pickerGroupLayer", void 0);
__decorate([
    core_1.ViewChild('pickerHandleLayer'),
    __metadata("design:type", Object)
], DataPickerComponent.prototype, "pickerHandleLayer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataPickerComponent.prototype, "data", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataPickerComponent.prototype, "change", void 0);
DataPickerComponent = __decorate([
    core_1.Component({
        selector: 'ng-data-picker',
        templateUrl: './data-picker.component.html',
        // template: `
        //   <div class="ng-data-picker flex-box">
        //     <!-- picker-group-layer -->
        //     <div #pickerGroupLayer *ngFor="let group of data; let gIndex = index"
        //       class="picker-group" [ngClass]="getGroupClass(gIndex)">
        //       <div class="picker-list">
        //         <div *ngIf="group.divider else ngIfElse"
        //           class="picker-item divider" [ngClass]="getItemClass(gIndex, iIndex, true)">
        //           {{ group.text }}
        //         </div>
        //         <div #ngIfElse *ngFor="let item of group.list; let iIndex = index"
        //           class="picker-item" [ngClass]="getItemClass(gIndex, iIndex)" [ngStyle]="getItemStyle(gIndex, iIndex)">
        //           {{ item.value || item }}
        //         </div>
        //       </div>
        //     </div>
        //     <div #pickerHandleLayer class="picker-handle-layer flex-box dir-column">
        //       <div data-type="top" class="picker-top weight-1"></div>
        //       <div data-type="middle" class="picker-middle"></div>
        //       <div data-type="bottom" class="picker-bottom weight-1"></div>
        //     </div>
        //   </div>
        // `,
        styleUrls: ['./data-picker.component.scss']
        // styles: [`
        //   .ng-data-picker {
        //     height: 10rem;
        //     position: relative;
        //     background-color: transparent;
        //     overflow: hidden;
        //   }
        //   .ng-data-picker.black {
        //     color: white;
        //   }
        //   .ng-data-picker .picker-group {
        //   }
        //   .ng-data-picker .picker-list {
        //     height: 6.25rem;
        //     position: relative;
        //     top: 4rem; // half of picker height - half of item height
        //   }
        //   .ng-data-picker .picker-item {
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     overflow: hidden;
        //     width: 100%;
        //     text-overflow: ellipsis;
        //     white-space: nowrap;
        //     display: block;
        //     text-align: center;
        //     will-change: transform;
        //     contain: strict;
        //     height: 2rem;
        //     line-height: 2;
        //     font-size: 1rem;
        //   }
        //   .ng-data-picker .selected-item {
        //   }
        //   /* picker handle layer */
        //   .ng-data-picker .picker-handle-layer {
        //     position: absolute;
        //     width: 100%;
        //     height: calc(100% + 2px);
        //     left: 0;
        //     right: 0;
        //     top: -1px;
        //     bottom: -1px;
        //   }
        //   .ng-data-picker .picker-handle-layer .picker-top {
        //     border-bottom: 0.55px solid rgba(74, 73, 89, 0.5);
        //     background: linear-gradient(to bottom, white 2%, rgba(255, 255, 255, 0.1) 100%);
        //     transform: translate3d(0, 0, 5.625rem);
        //   }
        //   .ng-data-picker .picker-handle-layer .picker-middle {
        //     height: 2rem;
        //   }
        //   .ng-data-picker .picker-handle-layer .picker-bottom {
        //     border-top: 0.55px solid rgba(74, 73, 89, 0.5);
        //     background: linear-gradient(to top, white 2%, rgba(255, 255, 255, 0.1) 100%);
        //     transform: translate3d(0, 0, 5.625rem);
        //   }
        //   /* flex system */
        //   .ng-data-picker .flex-box {
        //       display: flex;
        //   }
        //   .ng-data-picker .flex-box.dir-column {
        //     flex-direction: column;
        //   }
        //   .ng-data-picker .flex-box.dir-row {
        //     flex-direction: row;
        //   }
        //   /* flex system - for items */
        //   .ng-data-picker .flex-box .weight-1 {
        //     flex: 1;
        //   }
        //   .ng-data-picker .flex-box .weight-2 {
        //     flex: 2;
        //   }
        //   .ng-data-picker .flex-box .weight-3 {
        //     flex: 3;
        //   }
        //   .ng-data-picker .flex-box .weight-4 {
        //     flex: 4;
        //   }
        //   .ng-data-picker .flex-box .weight-5 {
        //     flex: 5;
        //   }
        //   .ng-data-picker .flex-box .weight-6 {
        //     flex: 6;
        //   }
        //   .ng-data-picker .flex-box .weight-7 {
        //     flex: 7;
        //   }
        //   .ng-data-picker .flex-box .weight-8 {
        //     flex: 8;
        //   }
        //   .ng-data-picker .flex-box .weight-9 {
        //     flex: 9;
        //   }
        //   .ng-data-picker .flex-box .weight-10 {
        //     flex: 10;
        //   }
        //   .ng-data-picker .flex-box .weight-11 {
        //     flex: 11;
        //   }
        //   .ng-data-picker .flex-box .weight-12 {
        //     flex: 12;
        //   }
        // `]
    }),
    __param(0, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DataPickerComponent);
exports.DataPickerComponent = DataPickerComponent;
//# sourceMappingURL=data-picker.component.js.map