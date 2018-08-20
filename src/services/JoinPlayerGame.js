import Axios from "axios";
export default {
  getJoinGame(url) {    
    return Axios.get(url);
  }
};