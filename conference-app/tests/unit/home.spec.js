import { shallowMount, createLocalVue } from '@vue/test-utils'; // Change this when vue init if required
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '../../src/views/Home.vue'; // page being tested - Change this when vue init

Vue.use(Vuetify);

/*
None of the following will work until vue is appropriately installed and configured
REF https://jestjs.io/docs/en/getting-started for jest guide :)
*/

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Home View', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify(); // instantiate new Vuetify instance before each test
  });

  test('is instantiated', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
    });
    expect(wrapper.vm).toBeTruthy(); // Home component correctly instantiates
  });

  it('has correct title', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
    });

    expect(wrapper.attributes('title')).toEqual('Conference Converter - Home'); // attributes() returns DOM node attribute object, if given key - value is provided
  });

  /*
    Snapshot testing, will initialise snapshot upon first run and all following
    If snapshot was intended to be modified, snapshot can be updated with npm test -- -u
    */
  it('matches last snapshot', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
