const axios = require("axios");
const url = "/email/send";

const state = {
    contactInfo: {
        name: '',
        email: '',
        subject: '',
        message: ''
    },
    sent: false
}

const getters = {
    getName: state => state.contactInfo.name,
    getEmail: state => state.contactInfo.email,
    getSubject: state => state.contactInfo.subject,
    getMessage: state => state.contactInfo.message
}

const actions = {
    async sendEmail({
        commit,
        state
    }) {
        axios
            .post(url, state.contactInfo)
            .then(async (res) => {
                // Email sent successfully show snackbar
                if (res.status === 200) {
                    commit("updateSent", true);
                }
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 5000);
                })
            }).then(() => commit("updateSent", false))
            .catch((err) => {
                (err.response);
                if (err.response.status === 404) {
                    console.log(err.response.data.error);
                }
            });
    }
}

const mutations = {
    updateName(state, value) {
        state.contactInfo.name = value;
    },
    updateEmail(state, value) {
        state.contactInfo.email = value;
    },
    updateSubject(state, value) {
        state.contactInfo.subject = value;
    },
    updateMessage(state, value) {
        state.contactInfo.message = value;
    },
    updateSent(state, value) {
        state.sent = value;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 10000)
        })
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}