/* global expect */
import { mount } from '@vue/test-utils';
import VuestroDropDown from './VuestroDropDown.vue';

describe('VuestroDropDown', () => {
  const wrapper = mount(VuestroDropDown, {
    propsData: {
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroDropDown');
  });

  it('only renders title when not hovered', () => {
    expect(wrapper.findAll('.vuestro-drop-down')).toHaveLength(1);
    expect(wrapper.find('.vuestro-drop-down-menu').isVisible()).toBe(false);
  });

  it('emits proper events when hovered', () => {
    wrapper.find('.vuestro-drop-down-title').trigger('mouseover');
    expect(wrapper.emitted().hover).toBeTruthy();
    wrapper.find('.vuestro-drop-down').trigger('mouseleave');
    expect(wrapper.emitted().leave).toBeTruthy();
  });

  it('renders drop-down-menu when title is hovered', () => {
    wrapper.find('.vuestro-drop-down-title').trigger('mouseover');
    expect(wrapper.find('.vuestro-drop-down-menu').isVisible()).toBe(true);
    wrapper.find('.vuestro-drop-down').trigger('mouseleave');
  });

  it('adds class for left-justified', () => {
    wrapper.setProps({
      left: true,
    });
    expect(wrapper.find('.vuestro-drop-down-menu').classes('left')).toBe(true);
  });

});
