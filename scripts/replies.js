var queryreply = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "1PLKxzCP7MNVKT7bW5JzAig1VTwMxQKJrR/reply",
    },
    "limit": 8
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
  // "r.c" stands for confirmed transactions response array
  // Parse the response and render the results on the screen
  r.c.forEach(function(output) {
    var postreply = document.getElementById("reply");
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
    document.body.appendChild(reply);
  })
})