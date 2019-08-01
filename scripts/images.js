// fetch from genesis
var threads = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "1Gd8GkWg1XTFJyjfeF1vuyzdSBM578kmDh"
     },
    "limit": 30,
  },
  "r": {
    "f": "[ .[] | { txid: .tx.h, timestamp: .blk.t?, txt: .out[0]?.s3, img: .out[0].s4 }]"
  }
}

// parse it
var b64 = btoa(JSON.stringify(threads));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
//
fetch(url, header).then(function(r) {
  return r.json()

}).then(function(r) {
  let res = r.u.concat(r.c)
  res.forEach(function(output) {

    var threadid = output.txid;
    var content = output.txt;

    console.log(`txid is ${threadid} `);
    console.log(`message is ${content}`);

    var thread = document.createElement("div");
    thread.id = (`${threadid}`);
    thread.setAttribute('class', 'thread');
   // image
    var img = document.createElement('img');
    var url = "https://bico.media/" + output.img
    img.setAttribute("src", `${url}`);
    console.log(`url is ${url}`);

  //
    thread.innerHTML =
    "<img src=" + `${url}` + " class=pic></img>" +
    "<br />"
    + output.img;
    document.body.appendChild(thread);

})
})

