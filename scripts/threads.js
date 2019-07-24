// fetch from genesis
var threads = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
    "out.s2": "THREAD"
     },
    "limit": 5,
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

  // thread element
    thread.innerHTML =
    "<br />" +
    "<a id='replybutton'>Reply</a>" +    
    "<br />" +
    "<br />" +
    "<img src=" + `${url}` + " class=pic></img>" +
    "<br />" +    "<br />" +
    "<p class=threadtext>" +
    "<br />" +
    "<br />" +
    "<br />" +
    output.txt + "</p>" +
    "<br />" +
    "<p class=replytext></p>";
    document.body.appendChild(thread);
    var replies = {
      "v": 3,
      "q": {
        "find": {
        "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
        "out.s2": "REPLY",
        "out.s5": threadid
         },
        "limit": 30,
      },
      "r": {
        "f": "[ .[] | { replytxid: .tx.h, replytimestamp: .blk.t?, replytxt: .out[0]?.s3, replyimg: .out[0].s4, replyto: .out[0].s5 }]"
      }
    }

    
    // parse it
    var b64 = btoa(JSON.stringify(replies));
    var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
    var header = {
      headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
    };
    //
    fetch(url, header).then(function(r) {
      return r.json()
    }).then(function(r) {
      r.c.forEach(function(output) {
        replyto = output.replyto;
        replytxt = output.replytxt;
        replytxid = output.replytxid;
        console.log(replytxt + "//" + replytxid + "//" + "is a reply to" + replyto);
        var reply = document.getElementById(`${replyto}`)
        reply.id = (`${replytxid}`);
        console.log(replytxt + "REPLY");
        reply.querySelector(".replytext").innerHTML = 
        "<br />" +
        "<br />" +
        "<br />" +
        "<br />" +
        replytxid +
        "<br />" +
        "<br />" +
        replytxt;
})
})
})
})
