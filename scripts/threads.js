var query = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH" },
    "limit": 30,
  },
  "r": {
    "f": "[ .[0] | { txid: .tx.h, timestamp: .blk.t?, content: .out[0]?.s3 }]"

  }
}
// fetch from genesis
var b64 = btoa(JSON.stringify(query));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
// parse it
fetch(url, header).then(function(r) {
  return r.json()
}).then(function(r) {
  r.c.forEach(function(output) {
    var threadid = output.txid;
    var content = output.content;
    console.log(`txid is ${threadid} `);
    console.log(`message is ${content}`);
    var thread = document.createElement("div");
    thread.id = (`${threadid}`);
    thread.innerHTML = output.content;
  document.body.appendChild(thread)
  })
})

