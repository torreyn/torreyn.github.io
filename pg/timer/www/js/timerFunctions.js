/***************************************************************************************
/*
/* Buttons:
/*  The green button starts the timer sequence
/* 
/*  The red button stops the timer sequence
/* 
/*  The white button resets the timer sequence - White button removed
/* 
/*  The question mark at the top goes to a help page
/* 
/* Timer sequence:
/*  White bar at bottom take one minute to completely fill, left to right
/*  In 5 minutes, a blue bar disappears (visibility:hidden) and beep1.mp3 plays
/*  In another 2 minutes, an orange bar disappears and beep2.mp3 plays
/*  After all 20 bars have dissappeared, the timer is reset and a third alarm occurs
/* 
/***************************************************************************************

/* $(document).ready(function(){ }); = $(function(){ }); */
$(document).ready(function(){
	window.tenBarHeight = parseInt($(".ten").css("height")); // trick to make variable global
	window.twoBarHeight = parseInt($(".two").css("height"));
	$("#helpPage").hide();
});

var TimerVar;        // function calls countSeconds() every second
var Secs = 0;        // seconds passed
var Mins = 0;        // minutes passed

function beep(beepID) { // takes audio element beepID and plays it "#beep1" or "#beep2"
	$(beepID).get(0).play();
}

function visibleAll() {
	$(".ten").animate({opacity:'100'},0);
	$(".two").animate({opacity:'100'},0);
	for (var i=0;i<5;i++) {
		$($(".ten")[i]).css({"height": window.tenBarHeight, top:0});
		$($(".two")[i]).css({"height": window.twoBarHeight, top:0});
	}
}

function numberCountdown(){
	var countDown = 60-Mins;
	$("#timeUnit").html("&nbsp;&nbsp;&nbsp;" + countDown + "&nbsp;minutes&nbsp;left");
//	console.log("countDown = " + countDown);
}

function countMinutes(){         // called every minute by CountSeconds
//	console.log("minute passed: " + Mins);

	if (Mins<10) {                        // 1st 10 minutes
		countBar(0,".ten");
	} else if (Mins>=10 && Mins<12){      // 1st 2 minutes
		countBar(0,".two");
	} else if (Mins>=12 && Mins<22){      // 2nd 10 minutes
		countBar(1,".ten");
	} else if (Mins>=22 && Mins<24){      // 2nd 2 minutes
		countBar(1,".two");
	} else if (Mins>=24 && Mins<34){      // 3rd 10 minutes
		countBar(2,".ten");
	} else if (Mins>=34 && Mins<36){      // 3rd 2 minutes
		countBar(2,".two");
	} else if (Mins>=36 && Mins<46){      // 4th 10 minutes
		countBar(3,".ten");
	} else if (Mins>=46 && Mins<48){      // 4th 2 minutes
		countBar(3,".two");
	} else if (Mins>=48 && Mins<58){      // 5th 10 minute
		countBar(4,".ten");
	} else if (Mins>=58 && Mins<60){      // 5th 2 minutes
		countBar(4,".two");
	};

	if (Mins == 10) {
		beep("#beep2");
		$($(".ten")[0]).animate({opacity:'0'},1000);};
	if (Mins == 12) {
		beep("#beep1");
		$($(".two")[0]).animate({opacity:'0'},1000);};
	if (Mins == 22) {
		beep("#beep2");
		$($(".ten")[1]).animate({opacity:'0'},1000);};
	if (Mins == 24) {
		beep("#beep1");
		$($(".two")[1]).animate({opacity:'0'},1000);};
	if (Mins == 34) {
		beep("#beep2");
		$($(".ten")[2]).animate({opacity:'0'},1000);};
	if (Mins == 36) {
		beep("#beep1");
		$($(".two")[2]).animate({opacity:'0'},1000);};
	if (Mins == 46) {
		beep("#beep2");
		$($(".ten")[3]).animate({opacity:'0'},1000);};
	if (Mins == 48) {
		beep("#beep1");
		$($(".two")[3]).animate({opacity:'0'},1000);};
	if (Mins == 58) {
		beep("#beep2");
		$($(".ten")[4]).animate({opacity:'0'},1000);};
	if (Mins == 60) {
		beep("#beep1");stop();};
}

function countBar(n,elem){   // the nth element is effected
//	console.log('countBar(' + n + ',' + elem + ') called');
	Mins = Mins + 1;
	var minsMod = Mins%12;
	var bar = $(elem)[n];
	if (elem == ".ten") {
//		console.log("elem = .ten");
		var barHeight  = window.tenBarHeight;
		var barSegment = barHeight/10;
		var minsFact   = minsMod;
	} else  if (elem == ".two") {
//		console.log("elem = .two");
		var barHeight  = window.twoBarHeight;
		var barSegment = barHeight/2;
		var minsFact = (minsMod == 11 ? 1 : 2);
	}
	var barChunk = barSegment*minsFact;
	$(bar).css({"height": barHeight-(barChunk), "top": barChunk});
	numberCountdown();
	return barHeight;
	console.log(barHeight + " - " + barChunk + " = " + (barHeight - barChunk)
//		"Secs = " + Secs + 
//	 " | barSegment = " + barSegment + 
//	 " | bar = " + bar + 
//	 " | tenBarHeight = " + window.tenBarHeight + 
//	 " | bar height = " + $($(elem)[n]).css("height") +
//	 " | barHeight = " + barHeight +
//	 " | barChunk = " + barChunk
//	 " | elem = " + elem +
//	 " | minsFact = " + minsFact +
//	 " | minsMod = " + minsMod +
//	 " | Mins = " + Mins
	);
}

function timerSequenceStart() {
//	console.log("timerSequenceStart() called");
	TimerVar = setInterval(function(){countSeconds()},1000); //**** change to 1000 when finished
}

function countSeconds(){
//	console.log("countSeconds() called");
	Secs = Secs+1;
	var boxWidth = $("#timeBox").css("width");
	var boxSec = parseInt(boxWidth)/60;
	// console.log("Secs = " + Secs + " | Secs mod 60 = " + Secs % 60 + " | boxWidth = " + boxWidth);
	$("#timeUnit").animate({width:boxSec*(Secs%60)},1000, 'linear'); //**** change to 1000 when finished
	if (Secs%60 == 0) {
		countMinutes();
	}
}

function start(){
//	console.log("start() called");
	beep("#beep1");
	$("#stop").addClass("click");	        // stop button look clickable
	$("#start").removeClass("click");		// start button looks non-clickable
	reset();							// make all bars visible
	timerSequenceStart();					// run timer sequence
}

function stop(){
//	console.log("stop() called");
	$("#stop").removeClass("click");		// rest buttons look non-clickable
	$("#start").addClass("click");			// start button looks clickable
	clearInterval(TimerVar);                // stop timer
	reset();
}

function reset(){                           // for optional reset button
//	console.log('reset() called')
	$("#timeUnit").clearQueue();
	$("#timeUnit").stop();
	$("#timeUnit").animate({width:0},0);
	$("#timeUnit").html("&nbsp;&nbsp;&nbsp;" + 60 + "&nbspminutes&nbspleft");
	visibleAll();
	clearInterval(TimerVar);                // stop timer
	Secs = 0;                               // reset second counter to 0
	Mins = 0;								// reset minute counter to 0
}

function helpPage(){
	console.log('helpPage() called')
	$("#helpPage").css({'display':'block'});
	$("#main").hide();
}

function back(){
	console.log('back() called')
	$("#main").css({'display':'block'});
	$("#helpPage").hide();
}

// Applying START and STOP functions to click state of buttons

$(function() { // start button
	$("#start").click(function(){
		start();						// make all bars visible
	});
});

$(function() { // stop button
	$("#stop").click(function() {
		stop();
	});
});

$(function() { // stop button
	$("#help").click(function() {
		helpPage();
	});
});

$(function() { // stop button
	$("#back").click(function() {
		back();
	});
});

