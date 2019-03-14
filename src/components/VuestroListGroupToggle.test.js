/* global expect */
import { mount } from '@vue/test-utils';
import ListGroupToggle from './ListGroupToggle.vue';

describe('ListGroupToggle', () => {
  const wrapper = mount(ListGroupToggle, {
    propsData: {
      title: 'testtitle',
      expanded: false,
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('ListGroupToggle');
  });

  it('emits toggle event with negated expanded value when clicked', () => {
    expect(wrapper.props('expanded')).toBe(false);
    wrapper.trigger('click');
    expect(wrapper.emitted('toggle').length).toBe(1);
    expect(wrapper.emitted('toggle')[0]).toEqual([true]);
  });


});
