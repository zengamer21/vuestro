/* global expect */
import { mount } from '@vue/test-utils';
import VuestroColumnContainer from './VuestroColumnContainer.vue';

describe('VuestroColumnContainer', () => {
  const wrapper = mount(VuestroColumnContainer, {
    slots: {
      default: 'defaultslotcontent',
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroColumnContainer');
  });

});
