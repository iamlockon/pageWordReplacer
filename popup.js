let mutateBtn = document.getElementById('mutate');
let original = document.getElementById('inp');
let replaced = document.getElementById('rep');
let hint = document.getElementById('hint');

mutateBtn.onclick = function(element) {
  if (!original.value || !replaced.value) {
    console.log(`${original.value} ${replaced.value}`)
    hint.set
    hint.innerText = `Please provide ${original.value ? 'Replace value' : 'Find value'}`
    return;
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: `
      var elements = document.getElementsByTagName('*');
      Object.keys(elements).forEach(k => {
        let e = elements[k]
        e.childNodes.forEach(n => {
          if (n.nodeType === 3) {
            const text = n.nodeValue;
            const newText = text.replace(/${original.value}/g, '${replaced.value}');
            if (text !== newText) {
              console.log("newText:", newText)
              e.replaceChild(document.createTextNode(newText), n);
            }
          }
        })
      })`}
    );
  });
}