

$(function() {
  // guaranteed stars
  // right side
  appendStar(Math.floor(Math.random() * 10) + 400, Math.floor(Math.random() * 10) + 10, false);
  appendStar(Math.floor(Math.random() * 10) + 280, Math.floor(Math.random() * 5) + 15, false);
  appendStar(Math.floor(Math.random() * 10) + 440, Math.floor(Math.random() * 10) + 100, false);
  appendStar(Math.floor(Math.random() * 10) + 460, Math.floor(Math.random() * 10) + 300, false);
  // left side
  appendStar(0 - (Math.floor(Math.random() * 10) + 400), Math.floor(Math.random() * 10) + 10, false);
  appendStar(0 - (Math.floor(Math.random() * 10) + 280), Math.floor(Math.random() * 5) + 15, false);
  appendStar(0 - (Math.floor(Math.random() * 10) + 440), Math.floor(Math.random() * 10) + 100, false);
  appendStar(0 - (Math.floor(Math.random() * 10) + 460), Math.floor(Math.random() * 10) + 275, false);

  // random stars
  var star_count = Math.floor(Math.random() * 10) + 15;
  for (i = 0; i < star_count; i++) {
    var x = Math.floor(Math.random() * 300) + 450 + (i * 10);
    var y = Math.floor(Math.random() * 375) + 5 + (i * 10);
    var big = false;
    if (i < 2) {
      big = true;
    }
    if (i % 2 == 0) {
      x = 0 - x - 20;
    }
    appendStar(x, y, big);
  }
  calculate();
});

function appendStar(x, y, big) {
  var star = 6;
  if (!big) {
    star = Math.floor(Math.random() * 5) + 1;
  }
  var delay = Math.floor(Math.random() * 6) + 1;
  $("#stars").append("<img src='/assets/images/star" + star + ".png' style='margin-left: " + x + "px; margin-top: " + y + "px; animation-delay: -" + delay + "s' />");
}
function swap() {
	function getRandomInt(max) {
	  return Math.floor(Math.random() * max);
	}
	let d = getRandomInt()
	var onImg = "/assets/images/character-of-the-week.png";
	var offImg = "/assets/images/character-of-the-week-dw.png";
	var specilImg = "/assets/images/character-of-the-week-shhh.png";
	if (d == 42) {
		$('.aotw').src = $('.aotw').src == specilImg ? specilImg : specilImg;
	}
	else {
		$('.aotw').src = $('.aotw').src == offImg ? onImg : offImg;
	}
}
function calculate() {
  let friday_at_9am_jst = null;
	if (friday_at_9am_jst) {
		var chance = 0;
		$('#chance').html(`${chance}% but thats cause its out in...`);
		startCountdown();
	}
	else {
		var chance = 100 / (365 - (Math.floor((new Date() - new Date('2025-01-01')) / (1000 * 60 * 60 * 24))));
		$('#chance').html(`${Math.round((chance + Number.EPSILON) * 100) / 100}% or`);
		$('#accurate-chance').html(`${chance}% for the nerds`);
	}
}

function startCountdown() {
  if (friday_at_9am_jst) {
    var test_stamp = 1631664000000;
    var launch = countdown(friday_at_9am_jst,
      function(ts) {
        doCountdown(ts);
      }
    );
  }
}
function doCountdown(ts) {
  if (ts.end > ts.start) {
    $('#countdown').html("NOW!<br><small>(refresh!)</small>");
  } else {
    if (ts.days > 0) {
      var total_hours = (ts.days * 24) + ts.hours;
      $('#countdown').html(pad(total_hours, 2) + ":" + pad(ts.minutes, 2) + ":" + pad(ts.seconds, 2));
    } else if (ts.hours > 0) {
      if (ts.hours < 12) {
        $('#countdown').addClass("shaky");
      }
      $('#countdown').html(pad(ts.hours, 2) + ":" + pad(ts.minutes, 2) + ":" + pad(ts.seconds, 2));
    } else if (ts.minutes > 0) {
      $('#countdown').addClass("shakier");
      $('#countdown').html(pad(ts.minutes) + ":" + pad(ts.seconds, 2));
    } else {
      $('#countdown').addClass("shakiest");
      $('#countdown').html(":" + pad(ts.seconds, 2));
    }
  }
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}