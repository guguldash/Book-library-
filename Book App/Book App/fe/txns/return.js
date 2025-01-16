function init_return(){
	$('#x-body').load('/fe/txns/return.htm')
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
		  <thead  class="table-dark">
			<tr>
			  <th scope="col">Title</th>
			  <th scope="col">Author</th>
			  <th scope="col">Category</th>
			  <th scope="col">Publish date</th>
			  <th scope="col">Borrowed Date</th>
			  
			  <th scope="col" class="text-center">Action</th>
			</tr>
		  </thead>
		  <tbody>
		`;

	for (let i = 0; i < data.length; i++){
		console.log(data[i]);
		book_table_html += '<tr>'
		book_table_html += '<td class="col-2">' + data[i].book_title + '</td>'
		book_table_html += '<td class="col-2">' + data[i].author + '</td>'
		book_table_html += '<td class="col-2">' + data[i].category + '</td>'
		book_table_html += '<td class="col-2">' + data[i].publish_date + '</td>'
		book_table_html += '<td class="col-2">' + data[i].taken_date + '</td>'
		book_table_html += '<td class="col-2">'
		book_table_html += '<button type="button" class="btn btn-primary float-end mx-2" onclick="return_book(\'' + data[i]._id + '\')">RETURN</button>';
		book_table_html += '</td>'
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
			init_return();
	 });


	}
}


init_return();
