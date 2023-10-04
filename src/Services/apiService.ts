import axios from "axios";
import { config } from "../Config";

async function getTransfers(){
    const response = await axios.post(
        `${config.pathBase}}/Tansfers/List`
      );
      return response.data;
}

export {
    getTransfers
}