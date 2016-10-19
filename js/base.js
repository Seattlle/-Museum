$(function() {
	//放大缩小
	var m = 3000;
	$("#m").data("m", m);
	$("#operate").on("tap", "li", function() {
		var m = $("#m").data("m");
		var old_rax = parseFloat($("#map svg").attr("data-old-rax")) || 0,
			rax = parseFloat($("#map svg").attr("data-rax")) || 0;
		var ww = $("#map svg").data("translate_x") || 0,
			hh = $("#map svg").data("translate_y") || 0;
		var dd = (0.5 - old_rax) / 6;
		if ($(this).hasClass("add")) {
			if (m == "1") {
				return false;
			}
			rax += dd;
			m = m == 500 ? 1 : m - 500;
			if (rax > 0.5) {
				rax = 0.5;
			}
		} else {
			rax -= dd;
			m = (m == 1 ? 0 : m) + 500;
			if (rax < old_rax) {
				rax = old_rax;
				m = 3000;
				ww = $("#map svg").data("translate_old_x");
				hh = $("#map svg").data("translate_old_y");
				$("#map svg").css({
					"-webkit-transform-origin": "center center",
					"transform-origin": "center center"
				});
			}
		}
		$("#map svg").css({
			"-webkit-transform": 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') ',
			'transform': 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') '
		}).attr({
			"data-translate_x": ww,
			"data-translate_y": hh,
			"data-rax": rax
		});
		R.safari();
		$("#m").html(m + "m").data("m", m);
	});

	//点击搜索栏跳转
	$("#search").on("tap", function() {
		var href = location.pathname.split('/');
		window.location.href = "search.html?page=" + href[2];
	});

	//下一步
	var next_i = -1;
	$("#next").on("tap", "a", function() {
		$("#server").hide();
		if ($(this).hasClass("active")) {
			return false;
		}
		if ($(this).hasClass("next")) {
			next_i++;
		} else {
			next_i--;
		}
		if (next_i >= starts.length) {
			return false;
		}
		showPoint(starts[next_i]["point"]);
		if (next_i == 0) {
			$(".up").addClass("active");
			$(".next").removeClass("active");
		} else if (next_i == (starts.length - 1)) {
			$(".next").addClass("active");
			$(".up").removeClass("active");
		} else {
			$(".next").removeClass("active");
			$(".up").removeClass("active");
		}
	});

	//关闭介绍弹窗
	$("#produce").on("tap", ".close", function() {
		$("#produce").hide();
	});

	//显示大图
	$("#desc_img,.s_img").on("tap", function() {
		$("#shade>.img").css("background-image", "url(" + $(this).data("jpg") + ")");
		$("#shade").show();
	});

	//关闭显示大图
	$("#shade").on("tap", ".close", function() {
		$("#shade").hide();
	});

	//跳转页面
	$("#areaMenu").on("tap", "li", function() {
		var i = $(this).data("index");
		switch (i) {
			case 1:
				window.location.href = "gqt.html"
				break;
			case 2:
				window.location.href = "ztg.html"
				break;
			case 3:
				window.location.href = "yzt.html"
				break;
			default:
				break;
		}
	});

	//推荐路线
	$("body").on("tap", '#tuijian', function() {
		var rotate = 0,
			rotate1 = $("#map").data("rotate"),
			translate_x = $("#map").data("translate_old_x") ? $("#map").data("translate_old_x") : 0,
			translate_y = $("#map").data("translate_old_y") ? $("#map").data("translate_old_y") : 0;
		var rax = parseFloat($("#map svg").attr("data-old-rax")) || 0;
		var ww = $("#map svg").data("translate_old_x") || 0,
			hh = $("#map svg").data("translate_old_y") || 0;
		$("#map svg").css({
			"-webkit-transform-origin": "center center",
			"transform-origin": "center center",
			"-webkit-transform": 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') ',
			'transform': 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') '
		}).attr({
			"data-translate_x": ww,
			"data-translate_y": hh,
			"data-rax": rax
		});
		$("#map").css({
			'-webkit-transform': 'translate(' + translate_x + 'px,' + translate_y + 'px) ' + 'rotate(' + rotate + 'deg)',
			'transform': 'translate(' + translate_x + 'px,' + translate_y + 'px) ' + 'rotate(' + rotate + 'deg)'
		}).data("translate_x", translate_x).data("translate_y", translate_y).data("rotate", rotate);

		_line.show();
		for (var i = 0; i < line_point.length; i++) {
			line_point[i]["point"].show();
		}
		if (rotate1 == "-90") {
			for (var state in shape) {
				shape[state]['text'].transform("r0deg");
			}
		}

		m = 3000;
		$("#m").html(m + "m").data("m", m);
		$(this).hide();
		$("#tuijian").hide();
		$(".menu2").show();
	});

	//	//服务菜单
	$(".menu2>.server").on("click", function() {
		$("#produce").css("z-index", "2").hide();
		$("#server>li").removeClass("active");
		if ($("#server").css("display") == "none") {
			$("#server").show();
			$("#footer").css("z-index", "4");
		} else {
			$("#server").hide();
			$("#footer").css("z-index", "2");
		}
	});
});
//初始化图片
function resize(w, h) {
	var weight = $(window).width(),
		height = $(window).height() - 60;
	var raxX = weight / w,
		raxY = height / h;
	var rax = 1,
		ww = -(w - weight) / 2,
		hh = -(h - height) / 2;
	if (raxX <= raxY) {
		rax = raxX;
	} else {
		rax = raxY;
	}
	$("#map").css("height", height);
	$("body").css("height", $(window).height());
	$("#map svg").css({
		"-webkit-transform": 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') ',
		'transform': 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') '
	}).attr({
		"data-translate_x": ww,
		"data-translate_y": hh,
		"data-translate_old_x": ww,
		"data-translate_old_y": hh,
		"data-rax": rax,
		"data-old-rax": rax
	});
}
var shak_c, shak_cc;

function showPoint(e) {
	if (e.target) {
		var touchs = e.target.attributes,
			x = touchs[0]["value"],
			y = touchs[1]["value"];
	} else {
		var x = e.attrs["x"],
			y = e.attrs["y"];
	}
	var anim = Raphael.animation({
		50: {
			r: 35,
			"fill-opacity": 0.5
		},
		100: {
			r: 50,
			"fill-opacity": 1
		}
	}, 2000);
	var xx = parseFloat(x) + 45,
		yy = parseFloat(y) + 45;
	var circle_point = {
			"fill": "#f8561f"
		},
		point_css = {
			"fill": "#fe4300",
			"stroke-width": "10",
			"stroke": "#ffffff"
		};
	if (shak_c) {
		shak_c.remove(), shak_cc.remove();
	}
	shak_c = R.circle(xx, yy, 50).attr(circle_point).animate(anim.repeat("Infinity"));
	shak_cc = R.circle(xx, yy, 25).attr(point_css);
	var circle_starts = starts;
	for (var i = 0; i < circle_starts.length; i++) {
		if (x == circle_starts[i]["x"]) {
			if (circle_starts[i]["desc"]) {
				$("#name").html(circle_starts[i]["name"]);
				$("#desc").html(circle_starts[i]["desc"]);
				$("#desc_img").attr({
					"src": "img/ww/" + circle_starts[i]["pic"] + ".png",
					"data-jpg": "img/ww/" + circle_starts[i]["pic"] + ".jpg"
				});
				$("#produce>.p").show();
				$("#produce>.t").hide();
				$("#produce").css("z-index", "5").show();
			} else if (circle_starts[i]["islast"]) {
				$("#name").html(circle_starts[i]["name"]);
				$("#produce>.p").hide();
				$("#produce>.t").show();
				$("#produce").css("z-index", "5").show();
			} else {
				$("#produce").css("z-index", "3").hide();
			}
			break;
		}
	}
	var weight = $(window).width(),
		height = $(window).height() - 60;
	var old_rax = parseFloat($("#map svg").attr("data-old-rax")) || 0,
		rax = (0.5 - old_rax) / 6 * 4;
	var ww = weight / 2 - x,
		hh = height / 2 - y;
	m = 1000;
	$("#m").html(m + "m").data("m", m);
	$("#map svg").css({
		"-webkit-transform-origin": x + "px " + y + "px",
		"transform-origin": x + " " + y,
		"-webkit-transform": 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') ',
		'transform': 'translate(' + ww + 'px,' + hh + 'px) ' + 'scale(' + rax + ',' + rax + ') '
	}).attr({
		"data-translate_x": ww,
		"data-translate_y": hh,
		"data-rax": rax
	});

	var rotate = 0,
		translate_x = $("#map").data("translate_x") ? $("#map").data("translate_x") : 0,
		translate_y = $("#map").data("translate_y") ? $("#map").data("translate_y") : 0;
	$("#map").css({
		'-webkit-transform': 'translate(' + translate_x + 'px,' + translate_y + 'px) ' + 'rotate(' + rotate + 'deg)',
		'transform': 'translate(' + translate_x + 'px,' + translate_y + 'px) ' + 'rotate(' + rotate + 'deg)'
	}).data("translate_x", translate_x).data("translate_y", translate_y).data("rotate", rotate);
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}
var xx = 0,
	yy = 0,
	ox = 0,
	oy = 0;

function move(dx, dy, x, y) {
	xx = dx, yy = dy;
	var rotate = $("#map").data("rotate") ? $("#map").data("rotate") : 0;
	$("#map").css({
		'-webkit-transform': 'translate(' + (dx + ox) + 'px,' + (dy + oy) + 'px) ' + 'rotate(' + rotate + 'deg)',
		'transform': 'translate(' + (dx + ox) + 'px,' + (dy + oy) + 'px) ' + 'rotate(' + rotate + 'deg)'
	}).data("translate_x", dx + ox).data("translate_y", dy + oy).data("rotate", rotate);
	//R.safari();
}

function start(x, y) {}

function end() {
	ox += xx;
	oy += yy;
}