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
    }
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroPanelCollapsible');
  });

  it('renders in a Panel', () => {
    expect(wrapper.classes('panel')).toBe(true);
  });

});
