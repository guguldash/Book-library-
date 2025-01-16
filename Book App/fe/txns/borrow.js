function init_borrow(){
	$('#x-body').load('/fe/txns/borrow.htm')
	$.get( "/api/author/", function( data ) {
		var sel = $("#fil_author");
		sel.empty();
		sel.append('<option value="">All Authors</option>');
		for (let i = 0; i < data.length; i++){
		  sel.append('<option value="' + data[i]._id + '">' + data[i].name + '</option>');
		}
		filter();
	});
	
}

function filter(){
	sel_author = 'ALL';
	if ($('#fil_author').val() !== undefined && $('#fil_author').val() !== '') 
		sel_author = $('#fil_author').val()
	
	sel_category = 'ALL';
	if ($('#fil_category').val() !== undefined && $('#fil_category').val() !== '') 
		sel_category = $('#fil_category').val()
	
	qry="?author="+sel_author
	qry+="&category="+sel_category
	qry+="&status=NOUT"

	
	$.get( "/api/book/" + qry, function( data ) {
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
			  <th scope="col">Price</th>
			  
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
		book_table_html += '<td class="col-2">' + data[i].price + '</td>'
		book_table_html += '<td class="col-2">'
		book_table_html += '<button type="button" class="btn btn-primary float-end mx-2" onclick="borrow_book(\'' + data[i]._id + '\')">BORROW</button>';
		book_table_html += '</td>'
	}

	book_table_html += '</tbody></table>';
	document.getElementById('div_book_table').innerHTML = book_table_html;
}

function borrow_book(id){
	if (confirm('Are you sure you want to borrow this book?')){
		let date = new Date();
		formData = {
			"status" : 'OUT',
			"mem_id" : session_info["user_id"],
			"mem_name" : session_info["user_name"],
			"taken_date" : date.toDateString()
		}

		var jsonData = JSON.stringify(formData);

		// $.post("/api/book/" + id, jsonData)
		 // .done(function( data ) {
			// init_borrow();
		 // });  
		 $.post({
			url:"/api/book/" + id, 
			contentType:'application/json',
			data: jsonData
			})			
	    .done(function( data ) {
			init_borrow();
	 });


	}
	
}


init_borrow();
