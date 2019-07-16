var query = {

  "v": 3,
  "q": {
    "find": {
    "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
    "out.s2": "REPLY"},
    "limit": 30,
  },
  "r": {
    "f": "[ .[] | { txid: .tx.h, timestamp: .blk.t?, txt: .out[0]?.s4, replyto: .out?.s3 }]"

  }
}
var b64 = btoa(JSON.stringify(query));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = { headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" } };
fetch(url, header).then(function(r) {
  return r.json()
}).then(function(r) {
  var result = JSON.stringify(r, null, 2);
  document.querySelector("div").innerHTML = output.txt +
  "<br />" +
  output.replyto;
})