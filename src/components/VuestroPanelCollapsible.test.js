/* global expect, jest */
import { mount } from '@vue/test-utils';
import VuestroPanelCollapsible from './VuestroPanelCollapsible.vue';

describe('VuestroPanelCollapsible', () => {
  const $router = {
    push: jest.fn()
  };

  const wrapper = mount(VuestroPanelCollapsible, {
    mocks: {
      $router,
    },
    slots: {
      default: ['magicalDefaultSlotValue'],
      title: 'testTitle',
      toolbar: '<div class="test-toolbar"></div>'
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroPanelCollapsible');
  });

  it('renders in a Panel', () => {
    expect(wrapper.classes('panel')).toBe(true);
  });

  it('toggles collapse when caret clicked', () => {
    let oldVal = wrapper.vm.collapsed;
    wrapper.find('.caret').trigger('click');
    expect(wrapper.vm.collapsed).not.toBe(oldVal);
  });

  it('renders title slot', () => {
    expect(wrapper.find('.sub-title').text()).toBe('testTitle');
  });

  it('renders toolbar slot', () => {
    expect(wrapper.contains('.test-toolbar')).toBe(true);
  });

  it('renders default slot', () => {
    wrapper.vm.collapsed = false; // force display
    expect(wrapper.html()).toEqual(expect.stringContaining('magicalDefaultSlotValue'));
  });

});
