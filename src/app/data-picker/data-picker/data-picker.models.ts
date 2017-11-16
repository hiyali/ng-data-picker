export interface PickerDataModel {
  textAlign?: 'start' | 'center' | 'end' | 'justify' | 'left' | 'right' | 'nowrap' | 'wrap'
  weight?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  className?: string

  onClick?: Function
  currentIndex?: number
  list?:	Array<string>

  divider?: boolean
  text?: string
}

/*
export const initialPickerData: PickerDataModel =  {
  textAlign: 'center',
  weight: 1,
  className: '',

  onClick: (gIndex: number, iIndex: number): void => {},
  currentIndex: 0,
  list: [],

  divider: false,
  text: ''
}
// */
