
var runCode = document.querySelector("#run");
runCode.addEventListener('click', () => {

  var htmlCode = document.getElementById("htmlCode").value;
  var cssCode = "<\style>" + document.getElementById("cssCode").value + "</style>";
  var jsCode = "<script>" + document.getElementById("jsCode").value + "<\/script>";
  var frame = document.getElementById("editor-window").contentWindow.document;
  frame.open();
  frame.write(cssCode + htmlCode + jsCode);
  frame.close();
});
var animateCode = document.querySelector("#minimize");
animateCode.addEventListener('click', () => {
  var elementAnim = document.getElementById("editor-output");
  var animSmallHtml = document.getElementById("htmlCode");
  var animSmallCss = document.getElementById("cssCode");
  var animSmallJs = document.getElementById("jsCode");
  elementAnim.classList.add("animation-big");
  animSmallHtml.classList.add("animation-small");
  animSmallCss.classList.add("animation-small");
  animSmallJs.classList.add("animation-small");
});
var save = document.getElementById("save");

save.addEventListener("click", function () {
  var modal = document.getElementById("editor-modal");
  modal.style.display = 'block';
});
var cancel = document.getElementById("cancel");
cancel.addEventListener("click", function () {
  var modal = document.getElementById("editor-modal");
  modal.style.display = 'none';
});

var saveAll = document.getElementById("saveAll");

saveAll.addEventListener("click", function () {
  var htmlCode = document.getElementById("htmlCode").value;
  var cssCode = document.getElementById("cssCode").value;
  var jsCode = document.getElementById("jsCode").value;
  var codeName = document.getElementById("codename").value;
  var testObject = { 'htmlCode': htmlCode, 'cssCode': cssCode, 'jsCode': jsCode };
  localStorage.setItem(codeName, JSON.stringify(testObject));
  var modal = document.getElementById("editor-modal");
  modal.style.display = 'none';
}, false);

var keys = Object.keys(localStorage);
for (var key of keys) {
  document.getElementById("history-opt").append(new Option(key));
}
var elements = document.querySelectorAll("#history-opt option");

elements.forEach(function (element) {
  element.addEventListener('click', function () {
    key = element.value;
    var test = JSON.parse(localStorage.getItem(key));
    console.log(test);
    htmlCode.value = test.htmlCode;
    cssCode.value = test.cssCode;
    jsCode.value = test.jsCode;
  });
});



