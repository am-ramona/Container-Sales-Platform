import axios from "axios";

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    // console.log('axios error : ', error)
    return Promise.reject({
      // status: error.response.status,
      status: error.status,
      code: error.code,
      message: error.description,
    });
  }
);

const fetcher = (url) => axios.get(url).then((res) => res.data);

export {
  fetcher
};
