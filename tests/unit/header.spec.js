import {
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import Header from '@/components/TheHeader.vue'

const localVue = createLocalVue();

describe("no title given", () => {
    it("renders props.msg when passed", () => {

        const wrapper = shallowMount(Header, {});
        expect(wrapper.text()).toBe("");
    });
});

describe("correct title given", () => {
    it("renders props.msg when passed", () => {
        const title = "Prog:greg";
        const wrapper = shallowMount(Header, {
            propsData: {
                title
            }
        });
        expect(wrapper.text()).toMatch(title);
    });
});

describe("title is rendered", () => {
    it("renders title", () => {
        const wrapper = shallowMount(Header, {
            localVue,
        });
        expect(wrapper.find('h1').exists()).toBe(true);
    });
});

describe("title is rendered", () => {
    it("renders title", () => {
        const title = "Prog:greg";
        const wrapper = shallowMount(Header, {
            localVue,
            propsData: {
                title
            }
        });
        expect(wrapper.find('h1').text()).toMatch("Prog:greg");
    });
});