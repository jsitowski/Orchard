var replies = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "13jgh5vQC5a43rvawKVourhCY7JiCaDpPH",
    "out.s2": "REPLY"
     },
    "limit": 30,
  },
  "r": {
    "f": "[ .[0] | { replytxid: .tx.h, timestamp: .blk.t?, replyto: .out?.s3, replytxt: .out.s4}]"
  }
}

// parse it
var rb64 = btoa(JSON.stringify(replies));
var rurl = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + rb64;
var rheader = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
//
fetch(rurl, rheader).then(function(r) {
  return r.json()

}).then(function(r) {
  r.c.forEach(function(output) {

    var replyid = output.replytxid;
    var replytxt = output.replytxt;
    var replyto = output.replyto;

    console.log(`replyto is ${replyto} `);
    console.log(`replymsgmessage is ${replytxt}`);
    console.log(`reply tx is ${replyid}`)

    var reply = document.createElement("div");
    reply.id = (`${replyid}`);
    reply.innerHTML =
    "<b>Reply to:</b>" +
    output.replyto +
    output.replytxt 
    document.body.appendChild(reply);
})
})