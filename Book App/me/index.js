
let session_info = []

function load_login(){
	$.getScript('/me/login.js')
	$('#user_menu_id').hide();
}

function load_borrow(){
	$.getScript('/me/txns/borrow.js')
}


function load_return(){
	$.getScript('/me/txns/return.js')
}

load_login();
