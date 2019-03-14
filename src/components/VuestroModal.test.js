/* global expect */
import { mount } from '@vue/test-utils';
import Modal from './Modal.vue';

describe('Modal', () => {
  const wrapper = mount(Modal, {
    propsData: {
      active: false, // resting state
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('Modal');
  });


  it('renders NOTHING when !active', () => {
    expect(wrapper.isEmpty()).toBe(true);
  });

  it('renders properly when active', () => {
    wrapper.setProps({
      active: true,
    });
    expect(wrapper.findAll('.modal-outer')).toHaveLength(1);
    expect(wrapper.findAll('.modal-inner')).toHaveLength(1);
    expect(wrapper.findAll('.modal-titlebar')).toHaveLength(1);
  });

  it('emits close event when button clicked', () => {
    // set active first
    wrapper.setProps({
      active: true,
    });
    // test close button
    wrapper.find('.close-button').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

});
