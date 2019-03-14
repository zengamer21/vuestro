/* global expect */
import { mount } from '@vue/test-utils';
import DropDown from './DropDown.vue';

describe('DropDown', () => {
  const wrapper = mount(DropDown, {
    propsData: {
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('DropDown');
  });

  it('only renders title when not hovered', () => {
    expect(wrapper.findAll('.drop-down')).toHaveLength(1);
    expect(wrapper.find('.drop-down-menu').isVisible()).toBe(false);
  });

  it('emits proper events when hovered', () => {
    wrapper.find('.drop-down-title').trigger('mouseover');
    expect(wrapper.emitted().hover).toBeTruthy();
    wrapper.find('.drop-down').trigger('mouseleave');
    expect(wrapper.emitted().leave).toBeTruthy();
  });

  it('renders drop-down-menu when title is hovered', () => {
    wrapper.find('.drop-down-title').trigger('mouseover');
    expect(wrapper.find('.drop-down-menu').isVisible()).toBe(true);
    wrapper.find('.drop-down').trigger('mouseleave');
  });

  it('adds class for left-justified', () => {
    wrapper.setProps({
      left: true,
    });
    expect(wrapper.find('.drop-down-menu').classes('left')).toBe(true);
  });

});
