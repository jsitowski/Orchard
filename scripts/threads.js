// fetch from genesis
var threads = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
    "out.s2": "THREAD"
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
  r.c.forEach(function(output) {

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
    "<p class=stamp>" + output.timestamp +"</p>" +
    "<img src=" + `${url}` + " class=pic></img>" +
    "<p class=threadtext>" +
    output.txt + "</p>";
    document.body.appendChild(thread);

})
})

