import {mount} from "@vue/test-utils" // Change this when vue init if required
import App from "./../src/App.vue" // page being tested - Change this when vue init

/*
None of the following will work until vue is appropriately installed and configured
REF https://jestjs.io/docs/en/getting-started for jest guide :)
*/

describe("App", () => {
    it("has data", () => {
        expect(typeof App.data).toBe("function");
    });
});

describe("Mounted App", () => {
    const wrapper = mount(App); // wraps our particular html document for element access

    test("is a Vue instance", () =>  {
        expect(wrapper.isVueInstance().tobeTruthy());
    });

    /*
    Snapshot testing, will initialise snapshot upon first run and all following
    If snapshot was intended to be modified, snapshot can be updated with npm test -- -u
    */
    it("renders correctly", () => {                 
        expect(wrapper.element).toMatchSnapshot();  // modify the particular element to match desired test
    })
});