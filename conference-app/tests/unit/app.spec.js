import { shallowMount, createLocalVue } from '@vue/test-utils'; // Change this when vue init if required
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

describe('App', () => {
  it('has data', () => {
    expect(typeof App.data).toBe('function');
  });
});

describe('Mounted App', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('is instantiated', () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('has correct title', () => {
    const wrapper = shallowMount(App, {
      propsData: {
        title: 'conference-app',
      },
      localVue,
      vuetify,
    }); // wraps our particular html document for element access

    expect(wrapper.attributes('title')).toEqual('conference-app');
  });

  it('matches last snapshot', () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  /*
    Snapshot testing, will initialise snapshot upon first run and all following
    If snapshot was intended to be modified, snapshot can be updated with npm test -- -u
  */
/*
  it("renders correctly", () => {
      expect(wrapper.element).toMatchSnapshot();  // modify to match test
  });
*/
});
