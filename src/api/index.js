import axios from "axios";

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://api.raisely.com/v3",
    });
  }

  signup = (userDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.post("/signup", userDetails);
        return resolve(response.data);
      } catch (error) {
        return reject(error);
      }
    });
  };
}

export default new API();
