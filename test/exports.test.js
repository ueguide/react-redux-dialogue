import {
  setFlashAlert,
  removeFlashAlert,
  setMessage,
  unsetMessage,
  unsetFlashAlert,
  FlashAlert,
  ModalMessage,
  RoutedFlashAlert,
  config,
  reducer,
  selectFlashAlert,
  selectMessage
} from '../src/index'

describe('exports', () => {
  it('setFlashAlert', () => {
    expect(setFlashAlert).toBeTruthy()
  })
  it('removeFlashAlert', () => {
    expect(removeFlashAlert).toBeTruthy()
  })
  it('setMessage', () => {
    expect(setMessage).toBeTruthy()
  })
  it('unsetMessage', () => {
    expect(unsetMessage).toBeTruthy()
  })
  it('unsetFlashAlert', () => {
    expect(unsetFlashAlert).toBeTruthy()
  })
  it('FlashAlert', () => {
    expect(FlashAlert).toBeTruthy()
  })
  it('ModalMessage', () => {
    expect(ModalMessage).toBeTruthy()
  })
  it('RoutedFlashAlert', () => {
    expect(RoutedFlashAlert).toBeTruthy()
  })
  it('config', () => {
    expect(config).toBeTruthy()
  })
  it('reducer', () => {
    expect(reducer).toBeTruthy()
  })
  it('selectFlashAlert', () => {
    expect(config).toBeTruthy()
  })
  it('selectMessage', () => {
    expect(config).toBeTruthy()
  })
})