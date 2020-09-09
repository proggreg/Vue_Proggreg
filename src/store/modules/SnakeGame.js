import axios from 'axios';

const state = {
    gameState: 'setup',
    scores: {
        headers: [{
                align: "start",
                text: "Rank",
                value: "index",

            },
            {
                text: "Name",
                value: "username",
                align: "center",
            },
            {
                text: "Score",
                value: "score",
                align: "end",
            },
        ],
        scores: []
    }
}

const getters = {
    getScores: state => state.scores
}

const actions = {
    async getSnakeScores({
        commit
    }) {
        const response = await axios
            .get(process.env.VUE_APP_API_URL + "/api/users")
        for (let index = 0; index < response.data.length; index++) {
            response.data[index].index = index + 1;
        }
        commit('setScores', response.data)
    }
}

const mutations = {
    startGame(state) {
        state.gameState = 'running'
    },
    endGame(state) {
        state.gameState = 'end'
    },
    saveGame(state) {
        state.gameState = 'setup'
    },
    setScores: (state, scores) => (state.scores.scores = scores)
}


export default {
    state,
    getters,
    actions,
    mutations,
}