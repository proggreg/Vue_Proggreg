import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import ContactForm from '@/components/TheContactForm.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ContactForm.vue", () => {
    it('checks validation on incorrect email format', () => {
        let state
        let store

        state = {
            contactInfo: {
                name: '',
                email: 'something',
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
        const wrapper = shallowMount(ContactForm, {
            store,
            localVue,
        });
        wrapper.vm.validateForm();
        expect(wrapper.vm.emailError).toBe("Incorrect email format");
    })

    it('checks validation on correct email format', () => {
        let state
        let store

        state = {
            contactInfo: {
                name: '',
                email: 'example@example.com',
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
        const wrapper = shallowMount(ContactForm, {
            store,
            localVue,
        });
        wrapper.vm.validateForm();
        expect(wrapper.vm.emailError).toBe("");
    })
})