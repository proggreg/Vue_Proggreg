const axios = require("axios");
// const url = "/get-file/CV";


const state = {
    sent: false
}

const actions = {
    async getCV() {
        console.log("Get CV");
        var link = await axios
            .get("/get-file/CV")
            .then((res) => {

                console.log(res);
                link = document.createElement("a");
                link.download = "GregFieldCV.pdf";
                link.href = "data:application/octet-stream;base64," + res.data;
                return link;
            })
            .catch((err) => {
                console.log(err);
                this.errorMessage = "Sorry the file couldn't be found.";
            });
        return link;
    }
}


export default {
    state,
    actions,
}