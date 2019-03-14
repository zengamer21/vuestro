/* global expect */
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import EditBox from './EditBox.vue';

describe('EditBox', () => {
  const wrapper = mount(EditBox, {
    propsData: {
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('EditBox');
  });

  it('only renders history-dropdown when history == true', () => {
    expect(wrapper.find('.history-dropdown').exists()).toBe(false);
    wrapper.setProps({
      history: true,
    });
    expect(wrapper.find('.history-dropdown').exists()).toBe(true);
  });

  it('renders a clear button', () => {
    expect(wrapper.find('.clear-button').exists()).toBe(true);
  });

  it('exposes interface usable with v-model', () => {
    // check for value prop
    expect(wrapper.props('value')).toBeDefined();
    // check for input event
    wrapper.find('input').setValue('test value');
    expect(wrapper.emitted('input').length).toBe(1);
  });

  it('emits {input,change,clear} when clear button is clicked', () => {
    wrapper.find('.clear-button').trigger('click');
    expect(wrapper.emitted('input').length).toBe(2);
    expect(wrapper.emitted('change').length).toBe(1);
    expect(wrapper.emitted('clear').length).toBe(1);
  });

  it('emits input when input box gets input', () => {
    expect(wrapper.emitted('input').length).toBe(2);
    wrapper.find('.input-el').trigger('input');
    expect(wrapper.emitted('input').length).toBe(3);
  });

  it('emits change when enter pressed on input box', () => {
    // test with empty input
    wrapper.find('input').setValue('');
    wrapper.find('.input-el').trigger('keyup.enter');
    expect(wrapper.emitted('change').length).toBe(2);
    // test with input value
    wrapper.find('input').setValue('test value 2');
    wrapper.find('.input-el').trigger('keyup.enter');
    expect(wrapper.emitted('change').length).toBe(3);
  });

  it('emits raw keyup when input box emits raw keyup', () => {
    wrapper.find('.input-el').trigger('keyup');
    expect(wrapper.emitted('keyup').length).toBe(3);
  });

  it('triggers focus on input box when focus() called', () => {
    let input = wrapper.find('.input-el');
    wrapper.vm.focus();
    return Vue.nextTick().then(function() {
      expect(input.is(':focus')).toBe(true);
    });
  });

  it('adds value to history', () => {
    // make sure value from test above was added
    expect(wrapper.vm.historyArray.length).toBe(1);
  });

  it('loads value from history', () => {
    // make sure history is rendered
    expect(wrapper.find('.history-dropdown').exists()).toBe(true);
    // make sure there's a value in there
    expect(wrapper.vm.historyArray.length).toBe(1);
    // load it
    wrapper.find('.list-button').trigger('click');
    // emits 2 events
    expect(wrapper.emitted('change').length).toBe(4);
    expect(wrapper.emitted('input').length).toBe(6);
    // check value of input
    expect(wrapper.emitted('input')[5]).toEqual(['test value 2']);
  });

  it('clears history when clear history clicked', () => {
    wrapper.find('.clear-history').trigger('click');
    expect(wrapper.vm.historyArray.length).toBe(0);
  });

});
