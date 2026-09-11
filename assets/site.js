// Imagine Factory — 언어 전환. 한 페이지 안에 영어/한국어 블록을 둘 다 쌓아두고 앵커로
// 스크롤시키던 예전 방식은 페이지 길이가 2배가 되고 검색엔진에도 신호가 지저분해서(사용자
// 지적, 2026-09-12), 같은 URL에서 한쪽만 보여주는 방식으로 바꿨다. 기본값은 브라우저 언어,
// 한 번 고르면 localStorage에 기억해서 다음 방문에도 유지된다.
(function () {
  "use strict";
  var STORAGE_KEY = "if-lang";

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === "en" || saved === "ko") return saved;
    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : "en";
  }

  function applyLang(lang) {
    var en = document.getElementById("en");
    var ko = document.getElementById("ko");
    if (en) en.hidden = lang !== "en";
    if (ko) ko.hidden = lang !== "ko";
    var links = document.querySelectorAll(".lang-links a[data-lang]");
    for (var i = 0; i < links.length; i++) {
      links[i].classList.toggle("current", links[i].getAttribute("data-lang") === lang);
    }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang());
    var links = document.querySelectorAll(".lang-links a[data-lang]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (event) {
        event.preventDefault();
        applyLang(event.currentTarget.getAttribute("data-lang"));
      });
    }
  });
})();
