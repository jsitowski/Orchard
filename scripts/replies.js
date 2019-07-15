var replyquery = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
    "out.s2": "REPLY" },
    "limit": 30,
  },
  "r": {
    "f": "[ .[0] | { txid: .tx.h, timestamp: .blk.t?, replytxt: .out[0]?.s4, replyingto: .out?.s3}]"

  }
}
var b64 = btoa(JSON.stringify(replyquery));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
//
fetch(url, header).then(function(r) {
  return r.json()
}).then(function(r) {
  r.c.forEach(function(output) {
    var replytx = output.txid;
    var replyid = output.replyingto;
    var content = output.replytxt;
    var reply = document.createElement("p");
    reply.id = (`${replytx}`);
    reply.innerHTML = output.replytxt;
  document.body.appendChild(reply); 
      })
    })