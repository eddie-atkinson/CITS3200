import { shallowMount, mount, createLocalVue } from '@vue/test-utils'; // Change this when vue init if required
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from '../../src/App.vue'; // page being tested - Change this when vue init

Vue.use(Vuetify);

/*
None of the following will work until vue is appropriately installed and configured
REF https://jestjs.io/docs/en/getting-started for jest guide :)
*/

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('App', () => {
  it('has data', () => {
    expect(typeof App.data).toBe('function');
  });
});

describe('Mounted App', () => {
  let vuetify;

  // Before each test we should ...
  beforeEach(() => {
    vuetify = new Vuetify(); // Instantiate a new Vue instance
  });

  test('is instantiated', () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  // UNSURE HOW TO GET THIS TO WORK FOR NOW

  /*
  it('has correct title', () => {
    const titleWrapper = wrapper.find('title');
    expect(titleWrapper.text()).toEqual('Conference Converter - Home');
  });
  */

  it('switches between light/dark mode', async () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    }); // includes child elements

    const bodyWrapper = wrapper.find('div');

    const darkModeButton = wrapper.find('.v-btn');
    expect(darkModeButton.exists()).toBe(true); // we can find our button correctly

    await darkModeButton.trigger('click');

    expect(bodyWrapper.classes()).toContain('theme--dark');

    await darkModeButton.trigger('click');
    expect(bodyWrapper.classes()).toContain('theme--light');
  });

  /*
    Snapshot testing, will initialise snapshot upon first run and all following
    If snapshot was intended to be modified, snapshot can be updated with npm test -- -u
  */

  it('matches last snapshot', () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
