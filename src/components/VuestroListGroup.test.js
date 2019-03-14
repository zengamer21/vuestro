/* global expect */
import { mount } from '@vue/test-utils';
import VuestroListGroup from './VuestroListGroup.vue';

describe('VuestroListGroup', () => {
  const wrapper = mount(VuestroListGroup, {
    propsData: {
      title: 'testtitle',
      items: [],
    }
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroListGroup');
  });

});
