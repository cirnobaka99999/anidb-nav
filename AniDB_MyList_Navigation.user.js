// ==UserScript==
// @name        AniDB MyList Navigation
// @version     1.3.42
// @namespace   http://vk.com/seiya_loveless?#AniDB_MyList_Navigation.user.js
// @description New navigation for AniDB.net
// @include     http://anidb.net/perl-bin/animedb.pl?*show=mylist*
// @exclude     http://anidb.net/perl-bin/animedb.pl?*show=mylist*do=edit.state*
// @exclude     http://anidb.net/perl-bin/animedb.pl?*show=mylist*do=cmp*
// @exclude     http://anidb.net/perl-bin/animedb.pl?*show=mylist*do=mch*
// @grant       none
// @icon        http://static.anidb.net/favicon.ico
// @homepage    https://github.com/seiya-dev/anidb-nav
// @updateURL   https://seiya-dev.github.io/anidb-nav/AniDB_MyList_Navigation.user.js
// @downloadURL https://seiya-dev.github.io/anidb-nav/AniDB_MyList_Navigation.user.js
// ==/UserScript==

// removing old navigation
$('ul.g_list .all').remove();
$('.0-9').remove();
for ( var icc='a'.charCodeAt(0); icc<='z'.charCodeAt(0); icc++ ) { $('ul.g_list .'+String.fromCharCode(icc)).remove(); }
$('ul.g_list .other').remove();
$('form ul.g_list').remove();
$('form table.animelist tr:last.action').remove();

// main url
var list_url ='http://anidb.net/perl-bin/animedb.pl?show=mylist'; // &uid=345411&char=0&page=0

// get url vars
var user_id=parseInt($.getUrlParameter('uid'));
var char_id=$.getUrlParameter('char');
var page_id=parseInt($.getUrlParameter('page'));

// get liststates
var liststate_watching=parseInt($.getUrlParameter('liststate.watching')); // Currently Watching
var liststate_completed=parseInt($.getUrlParameter('liststate.completed')); // Completed
var liststate_stalled=parseInt($.getUrlParameter('liststate.stalled')); // On Hold
var liststate_dropped=parseInt($.getUrlParameter('liststate.dropped')); // Dropped
var liststate_collecting=parseInt($.getUrlParameter('liststate.collecting')); // Plan to Watch
var liststate_unknown=parseInt($.getUrlParameter('liststate.unknown')); // Not Set

// check active vars
if(isNaN(user_id)){var user_url='';}else{var user_url='&uid='+user_id;}
if(typeof char_id==='undefined'){var char_url='';}else{var char_url='&char='+char_id;}
if(isNaN(page_id)){var page_id=0;}
var page_back_id=page_id-1;
var page_next_id=page_id+1;

// check active vars for liststates
if(isNaN(liststate_watching)){liststate_watching=0;}
if(isNaN(liststate_completed)){liststate_completed=0;}
if(isNaN(liststate_stalled)){liststate_stalled=0;}
if(isNaN(liststate_dropped)){liststate_dropped=0;}
if(isNaN(liststate_collecting)){liststate_collecting=0;}
if(isNaN(liststate_unknown)){liststate_unknown=0;}

// urls for liststates
if(liststate_watching===0){var liststate_watching_url='';}else{var liststate_watching_url='&liststate.watching=1';}
if(liststate_completed===0){var liststate_completed_url='';}else{var liststate_completed_url='&liststate.completed=1';}
if(liststate_stalled===0){var liststate_stalled_url='';}else{var liststate_stalled_url='&liststate.stalled=1';}
if(liststate_dropped===0){var liststate_dropped_url='';}else{var liststate_dropped_url='&liststate.dropped=1';}
if(liststate_collecting===0){var liststate_collecting_url='';}else{var liststate_collecting_url='&liststate.collecting=1';}
if(liststate_unknown===0){var liststate_unknown_url='';}else{var liststate_unknown_url='&liststate.unknown=1';}

/* list states navigation */
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'">All Anime</a></span></li>');
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'&liststate.watching=1">Watching</a></span></li>');
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'&liststate.completed=1">Completed</a></span></li>');
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'&liststate.stalled=1">On Hold</a></span></li>');
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'&liststate.dropped=1">Dropped</a></span></li>');
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'&liststate.collecting=1">Plan to Watch</a></span></li>');
$('ul.g_list').append('<li><span><a href="'+list_url+user_url+'&liststate.unknown=1">Not Set</a></span></li>');
var prefix_uri = list_url+user_url+liststate_watching_url+liststate_completed_url+liststate_stalled_url+liststate_dropped_url+liststate_collecting_url+liststate_unknown_url;

/* prev - next */
if($('ul.g_list li.prev').hasClass('selected')){
	$('ul.g_list li.prev').html('<span class="nolink">Prev</span>');
}
else{
	if(page_back_id===0){var page_back_url='';}else{var page_back_url='&page='+page_back_id;}
	$('ul.g_list li.prev').html('<span><a href="'+prefix_uri+char_url+page_back_url+'">Prev</a></span>');
}
if($('ul.g_list li.next').hasClass('selected')){
   $('ul.g_list li.next').html('<span class="nolink">Next</span>');
}
else{
	var page_next_url='&page='+page_next_id;
	$('ul.g_list li.next').html('<span><a href="'+prefix_uri+char_url+page_next_url+'">Next</a></span>');
}

// add navigation mod
$('ul.g_list').after('<ul class="g_list jump charFilter"></ul>');
// all anime
$('ul.charFilter').append('<li><a href="'+prefix_uri+'">All</a></li>');
// num and spec
$('ul.charFilter').append('<li><a href="'+prefix_uri+'&char=0">#</a></li>');
// chars
for( var jcc='a'.charCodeAt(0); jcc<='z'.charCodeAt(0); jcc++ ){
	$('ul.charFilter').append('<li><a href="'+prefix_uri+'&char='+String.fromCharCode(jcc)+'">'+String.fromCharCode(jcc).toUpperCase()+'</a></li>');
}

/* css */
$('.g_list.jump li').css({'margin-right':'5px'});
