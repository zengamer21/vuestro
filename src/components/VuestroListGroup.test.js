/* global expect */
import { mount } from '@vue/test-utils';
import VuestroListGroup from './VuestroListGroup.vue';
import VuestroListGroupToggle from './VuestroListGroupToggle.vue';

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

  it('expands when toggled', () => {
    expect(wrapper.vm.expanded).toBe(false);
    wrapper.find(VuestroListGroupToggle).vm.toggle();
    expect(wrapper.vm.expanded).toBe(true);
  });

});
