import { shallowMount, mount, createLocalVue } from '@vue/test-utils'; // Change this when vue init if required
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
    });

    expect(wrapper.vm).toBeTruthy(); // Home component correctly instantiates
  });

  it('correctly registers uploaded excel file', async () => {
    const wrapper = mount(Build, {
      propsData: {
        file: '3200text.xlsx',
      },
      localVue,
      vuetify,
      router,
    });

    // const helpers = require('@/helpers/parse-excel');
    // const parsexlSpy = jest.spyOn(helpers, 'parseExcel').mockImplementation(() => null);

    // const build = require('@/views/Build');
    const spyLoadFile = jest.spyOn(wrapper.vm, 'loadFile');

    const fileInput = wrapper.find('#input-file-field');
    fileInput.element.value = '3200test.xlsx';
    fileInput.trigger('change');

    expect(spyLoadFile).toHaveBeenCalled();

    /*
        const colourInput = wrapper.find('#colour-input-field');
        colourInput.element.value = 'Blue';
        colourInput.trigger('change');

        wrapper.find('#build-programme-btn').trigger.click()

        wrapper.find('')
        expect(spyLoadFile).toHaveBeenCalled();
        */
  });
});
