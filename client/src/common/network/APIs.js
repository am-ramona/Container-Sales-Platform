import axios from "axios"
// import Global from './../Observables/global'
// import mainConfig from '../mainConfig.js'

// let baseUrl = mainConfig.serverUrl
let baseUrl = 'http://localhost:3002/'

const DEFAULT_TIMEOUT = 30000; //time out is used when the connection is slow it waits for 4seconds before showing slow connection mainly its useful in the mena because the connection is slow.
class APIs {
  // getUserToken() {
  //     if(mainConfig.isMainLoginEnabled) {
  //         return localStorage.getItem("token") || localStorage.getItem("mainLoginToken")
  //     }
  //     else {
  //          return localStorage.getItem("token") || localStorage.getItem("defaultToken")
  //     }
  // }

  headers() {
    let token = this.getUserToken();
    let header = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*"
    };

    if(token){ // mainlogin registered & unregistered, without main login if user logged in
        header.Authorization = `Bearer ${token}`
    } // else if production + unregistered

    return header;
  }
  put(url, data = {}) {
    const headers = {
      headers: this.headers(),
      body: data
    };
    return axios
      .put(url, data, headers)
      .then(resp => resp.data)
      .catch(this.exceptionCatcher);
  }
  delete(url, data = {}) {
    const headers = {
      method: "delete",
      headers: this.headers(),
      timeout: DEFAULT_TIMEOUT,
      body: data
    };
    return axios
      .delete(url, headers)
      .then(resp => resp.data)
      .catch(this.exceptionCatcher);
  }
  post(url, data = {}, exceptionHandler = null) {
    const headers = {
      headers: this.headers(),
      body: data,
      timeout: DEFAULT_TIMEOUT,
    };
    return axios
      .post(url, data, headers)
      .then(resp => {
        if (resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch(this.exceptionCatcher);
  }
  get(url, params) {
    return axios
      .get(url, {
        headers: this.headers(),
        timeout: DEFAULT_TIMEOUT,
        params
      })
      .then(response => {
        return response.data;
      })
      .catch(this.exceptionCatcher);
  }
  exceptionCatcher(e) {

    if(e && e.response && e.response.data === 'Unauthorized'){
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        localStorage.removeItem("mainLoginToken")
      window.location.href = window.location.origin + '/'
      return
    }

    if (!e.response) {
      return { status: 500, error: "Check your connection" };
    }
    if (e.response) {
      return e.response.data;
    }
  }
  /*************************** Authentication ****************************/

  log_in_editor({ email, password }) {
    let url = `${baseUrl}api/editor/login-editor`;
    let body = {
      email,
      password
    };
    return this.post(url, body);
  }
  /*************************************************************************************/
  /*************************** user ****************************/

  add_like() {
    let url = `${baseUrl}story/likes`,
      body = {}
    return this.post(url, body);
  }

  // addFcmToken(token) {
  //   let url = `${baseUrl}api/user/addFcmToken?userId=${Global.userData._id}`,
  //     body = {
  //       token,
  //       type:'web'
  //     }
  //   return this.post(url, body);
  // }
  contentAgreement(email,name){
    let url=`${baseUrl}api/publisher/contentAgreement?email=${email}&name=${name}`
    return this.get(url);
  }
  checkAgreement(email){
    let url=`${baseUrl}api/publisher/checkAgreement?email=${email}`
    return this.get(url);
  }
  getCountries(){
    let url=`${baseUrl}api/countries`
      return this.get(url);
  }
  getTopTopics(){
    let url=`${baseUrl}api/getTopTopics`
      return this.get(url);
  }
  getCities(countryCode){
    let url=`${baseUrl}api/cities?countryCode=${countryCode}`
      return this.get(url);
  }
  getStories(userId, limit, offset){
    let url=`${baseUrl}api/feed/stories-by-userid/userId=${userId}&limit=${limit}&offset=${offset}`
      return this.get(url);
  }
  getShortUrl(id,type){
      let url=`${baseUrl}share/shortenUrl?id=${id}&type=${type}`
      return this.post(url);
  }
  getOriginalUrl(link){
    let url=`${baseUrl}share/getUrl?shortUrl=${link}`
      return this.get(url);
  }
   sendFeedback(name,email,subject,message) {
      let url = `${baseUrl}mainFeedback`;
      let body = {
        name,
        email,
        subject,
        message
      }
      return this.post(url, body);
  }

  storiesByUser(userId, limit, offset){
      let url=`${baseUrl}api/feed/storiesByUser?userId=${userId}&limit=${limit}&offset=${offset}`
      return this.get(url);
  }

  getExplore(){
    let url=`${baseUrl}api/explore`
    // let token = localStorage.getItem("token");
    // this.headers.Authorization = `Bearer ${token}`;
    return this.get(url);
  }
  search(word,type,limit,offset){
    let url = `${baseUrl}api/search?word=${word}&type=${type}&limit=${limit}&offset=${offset}`
    return this.get(url);
  }
  suggest(word){
    let url=`${baseUrl}api/suggest?word=${word}`
    // let token = localStorage.getItem("token");
    // this.headers.Authorization = `Bearer ${token}`;
    return this.get(url);
  }



  /*************************************************************************************/

  /*************************** stories ****************************/

  getCoverTopics() {
    let url = `${baseUrl}api/feed/coverTopics`
    return this.get(url);
  }

  getAllTopics(isFeatured, limit) {
    let url = `${baseUrl}api/feed/topics`

    let params = {
      limit : limit
    };
    if(isFeatured){
      params.isFeatured = true
    }

    return this.get(url, params);
  }

  get_stories(topic, limit, offset,isHome) {
    let bool= false;
    if(isHome){
      bool =true;
    }
      let url = `${baseUrl}api/feed/storiesByTopic?topic=${topic}&limit=${limit}&offset=${offset}&isHome=${bool}`
      return this.get(url);
  }

    getSpecialCoverageStories(machineName, limit, offset) {
    let url = `${baseUrl}api/getSpecialCoverageStories?machineName=${machineName}&limit=${limit}&offset=${offset}`

    return this.get(url);
  }
  getTopic(userId, topic) {
    let url = `${baseUrl}api/feed/topic?topic=${topic}`
    return this.get(url);
  }
  getStoriesByLine(lineId, limit, offset) {
    let url = `${baseUrl}api/feed/storiesByLine?lineId=${lineId}&limit=${limit}&offset=${offset}`
    return this.get(url);
  }

  // getLineContributors(lineId,limit,offset){
  //   let url=`${baseUrl}api/user/lineContributors?userId=${Global.userData._id}&lineId=${lineId}&offset=${offset}&limit=${limit}`
  //   return this.get(url)
  // }
  getLine(lineName,username){
    let url=`${baseUrl}api/user/line?username=${username}&navName=${lineName}`
    return this.get(url)
  }

  /**************************************Update user with image example*******************************/
  update_user({
    code,
    role,
    file,
    id
  }) {
    let url = `${baseUrl}user/${id}`,
      body = new FormData();
    body.append('code', code);
    if (file.search('http') === -1) {
      body.append('file', {
        uri: this.getPathfromURI(file),
        name: this.getNamefromURI(file),
        type: this.getType(file)
      });
    }

    return this.put(url, body);
  }

  getType(uri) {
    uri = uri.split('.');
    uri = uri[uri.length - 1].toLowerCase();
    if (
      uri === 'jpg' ||
      uri === 'jpeg' ||
      uri === 'png' ||
      uri === 'gif' ||
      uri === 'bmp'
    ) {
      return 'image/jpeg';
    } else {
      return 'video/mp4';
    }
  }

  getPathfromURI(uri) {
    return uri;
  }

  getNamefromURI(uri) {
    let arr = uri.split('/');
    return arr[arr.length - 1];
  }
/*************************************************************************************/

  validateToken(token){
    let url = `${baseUrl}api/auth/validateToken/${token}`
    return this.get(url);
  }

  //TODO: Refactoring
  getMoreTopics() {
    let output = {
      success : true,
      data : {
        topics : [
          {name:'politics',machineName:'politics'},
          {name:'beauty',machineName:'beauty'},
          {name:'technology',machineName:'technology'},
          {name:'health',machineName:'health'},
          {name:'food',machineName:'food'},
          {name:'entertainment',machineName:'entertainment'},
          {name:'science',machineName:'science'},
          {name:'music',machineName:'music'},
          {name:'tourism',machineName:'tourism'},
          {name:'fashion',machineName:'fashion'}
        ],
        isExploreEnabled : true
      }
    };

    return new Promise((resolve, reject) => {
    resolve(output);
  });
  }
  getUserTopics() {
    let url=`${baseUrl}api/user/userTopics`
    return this.get(url);
  }

  getRandomStories() {
    let output = {
      success : true,
      data : []
    };

    return new Promise((resolve, reject) => {
    resolve(output);
  });
  }
  /***************************  ****************************/

}

export default new APIs();
