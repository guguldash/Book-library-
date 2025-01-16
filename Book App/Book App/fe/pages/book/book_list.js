function init_book_list(){
	$('#x-body').load('/fe/pages/book/book_list.htm')
	
	$.get( "/api/author/", function( data )  {
		var sel = $("#fil_author");
		sel.empty();
		sel.append('<option value="">All Authors</option>');
		for (let i = 0; i < data.length; i++){
		  sel.append('<option value="' + data[i]._id + '">' + data[i].name + '</option>');
		}
		
	});
	filter();

	
}

//filter
function filter(){
	qry= {}
	
	sel_author = 'ALL';
	if ($('#fil_author').val() !== undefined && $('#fil_author').val() !== '') 
		sel_author = $('#fil_author').val()
	
	sel_category = 'ALL';
	if ($('#fil_category').val() !== undefined && $('#fil_category').val() !== '') 
		sel_category = $('#fil_category').val()
	qry="?author="+sel_author
	qry+="&category="+sel_category
	
	
	$.get( "/api/book/" + qry, function( data ){
		render_book_table(data);
	});
}

//render part
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
		book_table_html += '<button type="button" class="btn btn-primary float-end mx-2" onclick="del_book(\'' + data[i]._id + '\')"><i class="bi bi-trash"></i></button>';
		book_table_html += '<button type="button" class="btn btn-primary float-end mx-2" onclick="find_book(\'' + data[i]._id + '\')"><i class="bi bi-pencil-square"></i></button>';
		book_table_html += '</td>'
	}

	book_table_html += '</tbody></table>';
	document.getElementById('div_book_table').innerHTML = book_table_html;
}

//add 
function add_book(){
	$.getScript("/fe/pages/book/book_item.js", function() {
		init_book_item('');
	});
}

//find
function find_book(id){
	$.getScript("/fe/pages/book/book_item.js", function() {
		init_book_item(id);
	});
}

//delete
function del_book(id){
	if (confirm('Are you sure you want to delete this book?')){
		$.ajax({
		  method: "DELETE",
		  url: "/api/book/" + id
		})
		  .done(function( msg ) {
			alert("Book Deleted");
			init_book_list();
		  });				
	}
}


init_book_list();





