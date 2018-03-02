const request = require("../util/request");

function cardid(req, res) {
  const data = Object.assign({}, req.query, {
    key: "1b07ca50de48f2dc41554d03968d802f"
  });
  new request("http://apis.juhe.cn/idcard/index", req, { headers: {} })
    .get(data)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(error.code).json(error);
    });
}
module.exports = cardid;
