function init_login(){
	$('#x-body').load('/fe/login.htm')
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

		$('#site_menu_id').hide();
		if (resp.data.role_id === 'admin'){
			$('#admin_menu_id').show();
			load_books();
		} 
		
		if (resp.data.role_id === 'user'){
			$('#user_menu_id').show();
			load_borrow();
		}	
		
	}	
}

init_login();
