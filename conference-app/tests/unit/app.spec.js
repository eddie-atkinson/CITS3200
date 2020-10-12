import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from '@/App.vue'; // page being tested

Vue.use(Vuetify);

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
    // App.vue correctly mounts
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('switches between light/dark mode', async () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    }); // mount() includes child elements

    const bodyWrapper = wrapper.find('div'); // colour scheme is applied to the first div of the document

    const darkModeButton = wrapper.find('.v-btn');
    expect(darkModeButton.exists()).toBe(true); // we can find our button correctly

    await darkModeButton.trigger('click');
    expect(bodyWrapper.classes()).toContain('theme--dark');
    await darkModeButton.trigger('click');
    expect(bodyWrapper.classes()).toContain('theme--light');
  });

  /*
    Snapshot testing, will initialise snapshot upon first run and all following
    If snapshot was intended to be modified, snapshot can be updated with npm run test:unit -- -u
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
