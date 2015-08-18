define(function(require,exports, module) {
	function setfav(tit, url) {
		var title = tit || document.title,
			url = url || document.location.href;
		try {
			window.sidebar ? window.sidebar.addPanel(title, url, "") : window.external.AddFavorite(url, title)
		} catch(e) {
			alert("您的浏览器不支持该功能,请使用Ctrl+D收藏本页")
		}
	}
	module.exports = setfav;
});
