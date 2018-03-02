const request = require("request");

const errorsD = {
  500: {
    code: 500,
    msg: "服务器内部错误"
  }
};
const API_PREFIXE = "http://music.163.com/weapi";
class createRequest {
  constructor(uri, req, opts) {
    const url = uri.indexOf("http") === -1 ? API_PREFIXE + uri : uri;
    const cookie = req.get("Cookie") || "";
    const optionsDefault = {
      url,
      headers: {}
    };
    this.options = Object.assign(optionsDefault, opts);
  }
  get(parms) {
    const keys = Object.keys(parms).filter(key => !!parms[key]);
    const data = keys.map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(parms[key])}`
    );
    return new Promise((resolve, reject) => {
      request(this.options.url + "?" + data.join("&"), (error, res, body) => {
        if (error) {
          reject(errorsD[500]);
        } else {
          const bodyData =
            res.headers["content-type"] !== "text/plain" && JSON.parse(body);
          resolve(bodyData);
        }
      });
    });
  }
}

module.exports = createRequest;
