//import axios from "axios";

//const BASE_URL = "http://localhost:0000/api/CreateGame";

export default {
  getCreateGame() {
    //return axios.get(`${BASE_URL}?Columms=${numColumms}&Rows=${numRows}`)
    return Promise.resolve({
      Success: true,
      Message: "New Game ok!!",
      Game: {
        IdGame : '1234565',
        Player1 : 'Token@11111',
        Player2 : 'Token@'+Math.random().toString(36).substr(2),
      }
    });
  }
};
