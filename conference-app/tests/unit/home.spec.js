import { shallowMount, createLocalVue } from '@vue/test-utils'; // Change this when vue init if required
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '../../src/views/Home.vue'; // page being tested

Vue.use(Vuetify);

/*
REF https://jestjs.io/docs/en/getting-started for jest guide :)
REF https://vue-test-utils.vuejs.org/ for vue-jest-utils docs
*/

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Home View', () => {
  let vuetify;

  // Before each test we should ...
  beforeEach(() => {
    vuetify = new Vuetify(); // instantiate new Vuetify instance
  });

  test('is instantiated', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
    });

    expect(wrapper.vm).toBeTruthy(); // Home component correctly instantiates
  });

  // CANT GET THIS TO WORK JUST YET :)

  /*
  it('has correct title', () => {
    let wrapper = shallowMount(Home, {
        localVue,
        vuetify,
      }); // Mount our Home.vue for testing
    const titleWrapper = wrapper.find('div');
    expect(titleWrapper.text()).toEqual('Conference Converter - Home');
  });
*/

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
