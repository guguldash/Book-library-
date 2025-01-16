function init_login(){
	$('#x-body').load('/me/login.htm')
}

function do_login(){
	_data = {'userid': $('#inuserid').val(),'pwd': $('#inpwd').val()};
	jsonData = JSON.stringify(_data);

	$.post("/login/", jsonData)
	 .done(function( resp ) {
		on_login (resp);
	 }).fail(function() {
		alert("Invalid Credentials!" );
	});  

}

function on_login(resp){	
	if (resp.success === false){
		alert(resp.message);
	}
	else {
		session_info["user_id"] = resp.data.userid
		session_info["user_name"] = resp.data.username
		
		if (resp.data.role_id === 'user'){
			$('#user_menu_id').show();
			load_borrow();
		}	
		
	}	
}

init_login();

