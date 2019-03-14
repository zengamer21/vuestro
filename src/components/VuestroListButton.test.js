/* global expect, jest */
import { mount } from '@vue/test-utils';
import VuestroListButton from './VuestroListButton.vue';

describe('VuestroListButton', () => {
  const $router = {
    push: jest.fn()
  };

  const wrapper = mount(VuestroListButton, {
    mocks: {
      $router,
    }
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroListButton');
  });

  it('emits click event when clicked', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted('click').length).toBe(1);
  });

  it('adds alt class when alt param is set', () => {
    wrapper.setProps({
      alt: true,
    });
    expect(wrapper.classes('alt')).toBe(true);
  });

  it('causes vue-router push if to param is set', () => {
    wrapper.setProps({
      to: '/some/path',
    });
    wrapper.trigger('click');
    expect($router.push).toHaveBeenCalled();
  });

});
