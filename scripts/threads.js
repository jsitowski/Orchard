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
var b64 = btoa(JSON.stringify(threads));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
fetch(url, header).then(function(r) {
  return r.json()
}).then(function(r) {
  r.c.forEach(function(output) {
    var threadid = output.txid;
    var content = output.txt;
    console.log(`message is ${content}`);
    var thread = document.createElement("div");
    thread.id = (`${threadid}`);
    thread.setAttribute('class', 'thread');
    var img = document.createElement('img');
    var url = "https://bico.media/" + output.img
    img.setAttribute("src", `${url}`);
    //
    //

    //
    thread.innerHTML =
    "<br />" +
    "<p id='replybutton'>Reply</p>" +
    "<div id='replysubmit' class='hidden'>" +
    "<div id='rbutton'></div>"  +  
    "<br />" +
    "<img src=" + `${url}` + " class=pic></img>" +
    "<br />" + 
    "<p class=threadtext>" +
    "<br />" +
    "<br />" +
    "<br />" +
    content + "</p>" +
    "<br />" +
    "<div class=reply></div>";
    document.body.appendChild(thread);
    //
    //
    //
    // replies for each post
      var replies = {
        "v": 3,
        "q": {
          "find": {
          "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
          "out.s2": "REPLY",
          "out.s5": threadid
          },
          "limit": 1,
        },
        "r": {
          "f": "[ .[] | { replytxid: .tx.h, replytimestamp: .blk.t?, replytxt: .out[0].s3, replyimg: .out[0].s4, replyto: .out[0].s5 }]"
        }
      }
      var b64 = btoa(JSON.stringify(replies));
      var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
      var header = {
        headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
      };
      fetch(url, header).then(function(r) {
        return r.json()
      }).then(function(r) {
        r.c.forEach(function(output) {
          replyto = output.replyto;
          replytxt = output.replytxt;
          replytxid = output.replytxid;
          var replyimg = document.createElement('img');
          replyimg.setAttribute('class', 'replyimg');
          var replyurl = "https://bico.media/" + output.replyimg
          replyimg.setAttribute("src", `${url}`);
          console.log(replytxt + "//             " + replytxid + "//    " + "is a reply to   " + replyto);
          var reply = document.getElementById(`${replyto}`);
          console.log(replytxt + "REPLY");
          thread.querySelector(".reply").innerHTML = 
          "<br />" +
          replytxid +
          "<br />" +
          "<img src=" + `${replyurl}` + " class=replypic></img>" +
          "<br />" +
          replytxt +
          "<br />" +
          "<textarea id='replyform' placeholder='Type your reply...' class='hidden'>" + "</textarea>"
      })
    })
  })
})
