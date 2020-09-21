import {
    shallowMount
} from "@vue/test-utils";
import Header from '@/components/Header.vue'

describe("no title given", () => {
    it("renders props.msg when passed", () => {
        const title = "new message";
        const wrapper = shallowMount(Header, {});
        expect(wrapper.text()).toMatch(title);
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