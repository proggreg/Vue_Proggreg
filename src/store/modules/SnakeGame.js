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
            .get("/api/users");

        console.log(response);
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
    restartGame(state) {
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