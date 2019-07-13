var queryreply = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "1PLKxzCP7MNVKT7bW5JzAig1VTwMxQKJrR/reply",
    },
    "limit": 1,
  },
  "r": {
    "f": "[ .[] | { txid: .tx.h, timestamp: .blk.t?, content: .out[0]?.s2, op: .out[0]?.s3 }]"
}
}
var b64 = btoa(JSON.stringify(queryreply));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
fetch(url, header).then(function(r) {
  return r.json()
}).then(function(r) {
  r.c.forEach(function(output) {
    var threadnum = output.txid;
    // do not forget about threadnum...
    var postreply = document.getElementById("reply1");
    postreply.innerHTML =
    "<b>[Transaction ID: </b>" +
    output.txid +
    "<b>   ] </b>" +
    "<br />" +
    "<br />" +
    " <i>[Replying to</i>  " +
     output.op +
     "<i>]   </i>" +
      "<br />" +
       "<br />" +
        output.content +
         "<br />" +
          "<br />";
    document.body.appendChild(reply1);
  })
})