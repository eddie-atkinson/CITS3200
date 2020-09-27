import { shallowMount, createLocalVue } from '@vue/test-utils'; // Change this when vue init if required
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Build from '@/views/Build.vue'; // page being tested

Vue.use(Vuetify);

/*
REF https://jestjs.io/docs/en/getting-started for jest guide :)
REF https://vue-test-utils.vuejs.org/ for vue-jest-utils docs
*/

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Build View', () => {
  let vuetify;

  // Before each test we should ...
  beforeEach(() => {
    vuetify = new Vuetify(); // instantiate new Vuetify instance
  });

  test('is instantiated', () => {
    const wrapper = shallowMount(Build, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.vm).toBeTruthy(); // Home component correctly instantiates
  });

  it('correctly registers uploaded excel file', async () => {});
});
