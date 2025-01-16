function init_report(){
	$('#x-body').load('/fe/pages/report/report_list.htm')
	load();	
}

function load(){
	qry="?status=OUT"
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
			  <th scope="col">Borrowed By</th>
			  <th scope="col">Borrowed Date</th>			  
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
		book_table_html += '<td class="col-2">' + data[i].mem_name + '</td>'
		book_table_html += '<td class="col-2">' + data[i].taken_date + '</td>'
	}

	book_table_html += '</tbody></table>';
	document.getElementById('div_book_table').innerHTML = book_table_html;
}

init_report();
