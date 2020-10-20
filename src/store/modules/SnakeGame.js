import axios from 'axios';

const state = {
    gameState: 'setup',
    playerName: '',
    currentScore: 0,
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
    getScores: state => state.scores,
    getPlayerName: state => state.playerName
}

const actions = {
    async getSnakeScores({
        commit
    }) {
        const response = await axios.get("/api/users");
        let scores = response.data;
        let rank = 1;

        scores[0].index = 1;

        for (let index = 1; index < scores.length; index++) {
            if (scores[index - 1].score === scores[index].score) {
                scores[index].index = scores[index - 1].index;
            } else {
                scores[index].index = rank + 1;
                rank++;
            }
        }
        commit('setScores', scores)
    },
    async endGame({
        commit
    }, score) {
        commit('updateScore', score);
        commit('updateGameState', 'end');
    }
}

const mutations = {
    updateGameState: (state, newGameState) => state.gameState = newGameState,
    setScores: (state, scores) => state.scores.scores = scores,
    updatePlayerName: (state, name) => state.playerName = name,
    updateScore: (state, score) => state.currentScore = score
}


export default {
    state,
    getters,
    actions,
    mutations,
}