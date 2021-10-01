var output = document.getElementById("editor-output");
var htmlCode = document.getElementById("htmlCode");
var cssCode = document.getElementById("cssCode");
var jsCode = document.getElementById("jsCode");
var editorWindow = document.getElementById("editor-window");

var runCode = document.querySelector("#run");
runCode.addEventListener('click', () => {
  editorRun();
});

var animateCode = document.querySelector("#minimize");
animateCode.addEventListener('click', () => {
  animationClsss();
});

var save = document.getElementById("save");
function openModal() {
  var modal = document.getElementById("editor-modal");
  modal.style.display = 'block';
}

save.addEventListener("click", function () {
  openModal();
});

var cancel = document.getElementById("cancel");
cancel.addEventListener('click', () => {
  var modal = document.getElementById("editor-modal");
  modal.style.display = 'none';
});

var saveAll = document.getElementById("saveAll");
saveAll.addEventListener('click', () => {
  saveAllClass();
  window.location.reload(true);
}, false);

function editorRun() {
  var htmlCode = document.getElementById("htmlCode").value;
  var cssCode = "<\style>" + document.getElementById("cssCode").value + "</style>";
  var jsCode = "<script>" + document.getElementById("jsCode").value + "<\/script>";
  var frame = document.getElementById("editor-window").contentWindow.document;
  frame.open();
  frame.write(cssCode + htmlCode + jsCode);
  frame.close();
}

function animationClsss() {
  var elementAnim = output;
  var animSmallHtml = htmlCode;
  var animSmallCss = cssCode;
  var animSmallJs = jsCode;
  elementAnim.classList.add("animation-big");
  animSmallHtml.classList.add("animation-small");
  animSmallCss.classList.add("animation-small");
  animSmallJs.classList.add("animation-small");
}

function saveAllClass() {
  var htmlCodes = htmlCode.value;
  var cssCodes = cssCode.value;
  var jsCodes = jsCode.value;
  var codeNames = document.getElementById("codename").value;
  var keyObject = { 'htmlCode': htmlCodes, 'cssCode': cssCodes, 'jsCode': jsCodes };
  localStorage.setItem(codeNames, JSON.stringify(keyObject));
  var modal = document.getElementById("editor-modal");
  modal.style.display = 'none';
}

var keys = Object.keys(localStorage);
for (var key of keys) {
  document.getElementById("history").append(new Option(key));
}

var elements = document.getElementById("history");
elements.addEventListener('change', (event) => {
  key = event.target.value;
  var keyEvent = JSON.parse(localStorage.getItem(key));
  htmlCode.value = keyEvent.htmlCode;
  cssCode.value = keyEvent.cssCode;
  jsCode.value = keyEvent.jsCode;
  editorRun();
});

document.addEventListener('keydown', (e) => {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode == 83) {
    e.preventDefault();
    openModal();
  }
}, false);

document.addEventListener('keydown', () => {
  var htmlCodes = htmlCode.value;
  var cssCodes = cssCode.value;
  var jsCodes = jsCode.value;
  var codeName = 'pageRefresing'
  var keyObject = { 'htmlCode': htmlCodes, 'cssCode': cssCodes, 'jsCode': jsCodes };
  localStorage.setItem(codeName, JSON.stringify(keyObject));
});
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  var keyEvent = JSON.parse(localStorage.getItem('pageRefresing'));
  htmlCode.value = keyEvent.htmlCode;
  cssCode.value = keyEvent.cssCode;
  jsCode.value = keyEvent.jsCode;
  editorRun();

}
var optionpageRefresing = document.querySelectorAll("option");
optionpageRefresing.forEach((element) => {
  if (element.value == "pageRefresing") {
    element.style.display = 'none';
  }
});

const elem = document.querySelectorAll('.editor-code textarea');
elem.forEach((element) => {
  document.addEventListener('click', () => {
    if (element === document.activeElement) {
      element.style.setProperty("height", "400px", "important");
    } else {
      element.style.height = '200px';
    }
  });
});

