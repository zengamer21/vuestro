/* global expect */
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VuestroTextField from './VuestroTextField.vue';

describe('VuestroTextField', () => {
  const wrapper = mount(VuestroTextField, {
    propsData: {
      value: '',
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroTextField');
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

  it('lowers placeholder text when focus lost', () => {
    expect(wrapper.vm.raisedPlaceholder).toBe(true);
    wrapper.find('.input-el').trigger('focusout');
    expect(wrapper.vm.raisedPlaceholder).toBe(false);
  });

  it('doesnt lower placeholder if focus lost with text in input', () => {
    wrapper.find('.input-el').trigger('focus');
    expect(wrapper.vm.raisedPlaceholder).toBe(true);
    wrapper.setProps({
      value: 'test value 2'
    });
    wrapper.find('.input-el').trigger('focusout');
    expect(wrapper.vm.raisedPlaceholder).toBe(true);
  });

});
