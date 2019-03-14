/* global expect */
import { mount } from '@vue/test-utils';
import EditableText from './EditableText.vue';

describe('EditableText', () => {
  const wrapper = mount(EditableText, {
    propsData: {
      value: 'testvalue',
      enabled: false,
    },
  });

  beforeEach(() => {
    document.createRange = () => {
      return {
        selectNodeContents() {}
      };
    };
    window.getSelection = () => {
      return {
        removeAllRanges() {},
        addRange() {}
      };
    };
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('EditableText');
  });

  it('renders value', () => {
    expect(wrapper.html()).toContain('testvalue');
  });

  it('adds contenteditable and tabindex attr when enabled', () => {
    expect(wrapper.attributes('tabindex')).toBe(undefined);
    expect(wrapper.attributes('contenteditable')).toBe(undefined);
    wrapper.setProps({
      enabled: true,
    });
    expect(wrapper.attributes('tabindex')).toBe('1');
    expect(wrapper.attributes('contenteditable')).toBe('true');
  });

  it('emits change on enter key', () => {
    wrapper.trigger('keypress.enter');
    expect(wrapper.emitted('change').length).toBe(1);
  });

  it('emits change on focusout', () => {
    wrapper.trigger('focusout');
    expect(wrapper.emitted('change').length).toBe(2);
  });

  it('removes contenteditable and tabindex attr when disabled', () => {
    wrapper.setProps({
      enabled: false,
    });
    expect(wrapper.attributes('tabindex')).toBe(undefined);
    expect(wrapper.attributes('contenteditable')).toBe(undefined);
  });


});
