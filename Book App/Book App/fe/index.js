let session_info = []


function load_books(){
	$.getScript('/fe/pages/book/book_list.js')
}
		
function load_authors(){
	$.getScript('/fe/pages/author/author_list.js')
}
function load_members(){
	$.getScript('/fe/pages/member/member_list.js')
}


function load_login(){
	$.getScript('/fe/login.js')
	$('#admin_menu_id').hide();
	$('#user_menu_id').hide();
}


function load_borrow(){
	$.getScript('/fe/txns/borrow.js')
}

function load_return(){
	$.getScript('/fe/txns/return.js')
}

function load_report(){
	$.getScript('/fe/pages/report/report_list.js')
}	

function load_mobile(){
	pg = '/me/index.html'
	p=window.open(pg,'Thinkar Mobile','popup=yes');
	p.focus();
	p.resizeTo(400,650);
	p.moveTo(500,40);		
	
}


load_login();

