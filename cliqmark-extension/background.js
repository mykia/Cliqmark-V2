var user;
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  if (request.messageFromWeb.cliqmark_user) {
    console.log(request.messageFromWeb);
    user = request.messageFromWeb.cliqmark_user
  }
});

var addBookmark = function(info, tab){
  console.log('info: ', info, 'tab: ', tab)
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://0.0.0.0:3000/api/addBookmark', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  // todo: need real authentication mechanism, hard-coded user here
  xhr.send(JSON.stringify({ userId: user, url: tab.url }));
  xhr.onloadend = function () {

  };

}



chrome.contextMenus.create({
   title: "CliqMark This Page",
   contexts:["all"],  // ContextType
  });

chrome.contextMenus.onClicked.addListener(addBookmark);
