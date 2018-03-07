import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import config from '../src/config'
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })
// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount

config.customParamMessages = {
  url_flash: [
    'info',
    'Custom Parameter Flash Message'
  ]
}