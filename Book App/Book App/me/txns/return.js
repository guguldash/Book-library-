function init_return(){
	$('#x-body').load('/me/txns/return.htm')
	filter();	
}

function filter(){
	qry="?status=OUT"
	qry+="&user="+session_info["user_id"]
	qry+="&author=ALL"
	qry+="&category=ALL"
	
	$.get( "/api/book/" + qry, function( data ) {
		//console.log(data);
		render_book_table(data);
	});
}

function render_book_table(data){
	book_table_html = `
		<table class="table table-striped" id="tbl_ch">
		  <tbody>
		`;

	for (let i = 0; i < data.length; i++){
		console.log(data[i]);
		book_table_html += '<tr><td>'
		book_table_html += data[i].book_title + ' by '
		book_table_html += data[i].author + ' ['
		book_table_html += data[i].category + '] '
		book_table_html += '<button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick="return_book(\'' + data[i]._id + '\')">RETURN</button>';
		book_table_html += '</td></tr>'
	}

	book_table_html += '</tbody></table>';
	document.getElementById('div_book_table').innerHTML = book_table_html;
}

function return_book(id){
	if (confirm('Are you sure you want to return this book?')){
		formData = {
			"status" : '',
			"mem_id" : '',
			"mem_name" : '',
			"taken_date" : ''
		}

		var jsonData = JSON.stringify(formData);

		$.post({
			url:"/api/book/" + id,
			contentType:'application/json',
			data: jsonData
			})			
			 .done(function( data ) {
				load_borrow();
		});  
	}
}


init_return();


