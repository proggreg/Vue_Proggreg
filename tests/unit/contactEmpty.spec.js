import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import ContactForm from '@/components/TheContactForm';

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TheContactForm.vue", () => {
    let state
    let store

    beforeEach(() => {
        state = {
            contactInfo: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            sent: false
        }

        store = new Vuex.Store({
            modules: {
                Contact: {
                    state
                }
            }
        })
    })

    it('checks validation on name', () => {
        const wrapper = shallowMount(ContactForm, {
            store,
            localVue,
        });

        wrapper.vm.validateForm();
        expect(wrapper.vm.nameError).toBe("Name is required");
    })

    it('checks validation on subject', () => {
        const wrapper = shallowMount(ContactForm, {
            store,
            localVue,
        });

        wrapper.vm.validateForm();
        expect(wrapper.vm.subjectError).toBe("Subject is required");
    })

    it('checks validation on email', () => {
        const wrapper = shallowMount(ContactForm, {
            store,
            localVue,
        });

        wrapper.vm.validateForm();
        expect(wrapper.vm.emailError).toBe("Email is required");
    })


    it('checks validation on message', () => {
        const wrapper = shallowMount(ContactForm, {
            store,
            localVue,
        });

        wrapper.vm.validateForm();
        expect(wrapper.vm.messageError).toBe("Message is required");
    })
})