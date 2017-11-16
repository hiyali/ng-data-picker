# ng-data-picker  <sup>[![Version Badge](http://versionbadg.es/hiyali/ng-data-picker.svg)](https://npmjs.com/package/ng-data-picker)</sup>
🏄🏾  A Data Picker for Angular 4+

[![npm package](https://img.shields.io/npm/v/ng-data-picker.svg)](https://npmjs.com/package/ng-data-picker)
[![travis build](https://img.shields.io/travis/hiyali/ng-data-picker/master.svg)](https://travis-ci.org/hiyali/ng-data-picker)
[![NPM downloads](http://img.shields.io/npm/dt/ng-data-picker.svg)](https://npmjs.org/package/ng-data-picker)
![gzip size](http://img.badgesize.io/hiyali/ng-data-picker/gh-pages/lib/data-picker/data-picker.component.js.svg?compression=gzip&label=gzip%20size)
[![CircleCI](https://circleci.com/gh/hiyali/ng-data-picker/tree/master.svg?style=shield)](https://circleci.com/gh/hiyali/ng-data-picker/tree/master)

[![NPM Description](https://nodei.co/npm/ng-data-picker.png?downloads=true&stars=true)](https://npmjs.org/package/ng-data-picker)

> Let's more easily select some data on the touch screen device, such as time / city / gender / seat number / product / ...

## 💕 Examples

> See branch gh-pages for all code of extant examples.

## 🤠 Take a look

[A few demo](https://hiyali.github.io/ng-data-picker/docs/)

⚠️ These screen shots are a temporary used from vue version of this picker. will be updated soon.

![Screen shot](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screenshot.png "screenshot")

![Screen record](https://raw.githubusercontent.com/hiyali/vue-smooth-picker/gh-pages/assets/smooth-picker-screen-record.gif "screen record")

## 🌲 Install

```shell
yarn add ng-data-picker
```
or
```shell
npm i -S ng-data-picker
```

## ✌️ Usage

### 👁 Quick look

#### app.module.ts
```typescript
import { DataPickerComponent } from 'ng-data-picker'

@NgModule({
  ...
  declarations: [
    DataPickerComponent
  ]
  ...
})
```

#### app.component.ts
```typescript
@Component({ ... })
export class AppComponent {
  data = [
    {
      list: ['1', '2', '3', '1', '2', '3', '1', '2', '3']
    }
  ]

  change ({ gIndex, iIndex }) {
    console.log(gIndex, iIndex)
  }
}
```

#### app.component.html
```typescript
<ng-data-picker [data]="data" (change)="change($event)"></ng-data-picker>
```

## ⚙️ Props

| name                       | type       |  default      | explain                          |
| :------------------------- | :--------- | :------------ | :------------------------------- |
| `change`                   | `Function` | ({ gIndex, iIndex }) => {} | Callback after which group's current index changed, pass two arguments, group index `gIndex` and item index `iIndex` |
| `data`                     | `Array`    | []            | Picker initial data              |
| `data[i].currentIndex`     | `Number`   | 0             | Current index of this group's list |
| `data[i].weight`           | `Number`   | 1             | Group weights in parent width `1..12` |
| `data[i].list`             | `Array`    | -             | List of the group                |
| `data[i].list[j]`          | `String` or `Object` | -   | Item in the list of group, use `value` key when it is a object item |
| `data[i].onClick`          | `Function` | -             | Click event on the middle layer of this group, pass two arguments that group index `gIndex` and selected index `iIndex` of this group |
| `data[i].textAlign`        | `String`   | -             | `start` `center` `end` `justify` `left` `right` `nowrap` `wrap` |
| `data[i].className`        | `String`   | -             | Your custom class name for this group |
| `data[i].divider`          | `Boolean`  | false         | If it is true, then `onClick` `list` `currentIndex` will not be used |
| `data[i].text`             | `String`   | -             | Just use this text when `divider` is true |

## 🔨 Instance methods

| name                       | type       | explain                          |
| :------------------------- | :--------- | :------------------------------- |
| `setGroupData`             | `Function` (gIndex,gData)=>void | Dynamically set a group data with two arguments `(gIndex, gData)`, group index and group data (see props `data[i]`) |
| `getCurrentIndexList`      | `Function` ()=>[] | Return a `Array` of the groups current index list (has divider current index, and it is default to `0`) |
| `getGroupsRectList`        | `Function` ()=>void | Get some info for gesture, you can call this function when the component displayed if the component is hidden when it's initialization |

## 📝 Development

```shell
npm start # development
npm run build:prod # build for production
npm run prepare # build for third party
```

## 🆘 Any problem?

> Please let me know.
* [Open a new issue for this repo](https://github.com/hiyali/ng-data-picker/issues)
* [Send a Email to: hiyali920@gmail.com](mailto:hiyali920@gmail.com)

## 🌚  Donate

[A github star ⍟](https://github.com/hiyali/ng-data-picker)

## ❗️ License

MIT

