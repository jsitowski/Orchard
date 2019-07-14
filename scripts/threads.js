var query = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "1PLKxzCP7MNVKT7bW5JzAig1VTwMxQKJrR" },
    "limit": 30,
  },
  "r": {
    "f": "[ .[] | { txid: .tx.h, timestamp: .blk.t?, content: .out[0]?.s2 }]"

  }
}
var b64 = btoa(JSON.stringify(query));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
fetch(url, header).then(function(r) {
  return r.json()
}).then(function(r) {
  r.c.forEach(function(output) {
    var threadid = output.txid;
    var post = document.createElement("post");
    post.innerHTML =
    " <i>Post ID:</i>  " +
     output.timestamp +
      "<br />" +
       "<br />" +
       "<i>" +
        output.content +
          "</i>" +
          "</div>" +
         "<br />" +
          "<br />";
    document.body.appendChild(post);
  })
})
