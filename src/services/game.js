import Axios from "axios";
const UrlService = require("../config/Configuration").urlService;
export default {
  getCreateGame(data) {    
    return Axios.post(UrlService, data);
  }
};
