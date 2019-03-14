/* global expect */
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import TextField from './TextField.vue';

describe('TextField', () => {
  const wrapper = mount(TextField, {
    propsData: {
      value: '',
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('TextField');
  });

  it('exposes interface usable with v-model', () => {
    // check for value prop
    expect(wrapper.props('value')).toBeDefined();
    // check for input event
    wrapper.find('input').setValue('test value');
    expect(wrapper.emitted('input').length).toBe(1);
  });

  it('emits input when input box gets input', () => {
    expect(wrapper.emitted('input').length).toBe(1);
    wrapper.find('.input-el').trigger('input');
    expect(wrapper.emitted('input').length).toBe(2);
  });

  it('emits raw keyup when input box emits raw keyup', () => {
    wrapper.find('.input-el').trigger('keyup');
    expect(wrapper.emitted('keyup').length).toBe(1);
  });

  it('triggers focus on input box when focus() called', () => {
    let input = wrapper.find('.input-el');
    wrapper.vm.focus();
    return Vue.nextTick().then(function() {
      expect(input.is(':focus')).toBe(true);
    });
  });

});
