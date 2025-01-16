function init_author_list(){
	$('#x-body').load('/fe/pages/author/author_list.htm')
	$.get( "/api/author/", function( data ) {
		render_author_table(data);
	});
}


function render_author_table(data){
	author_table_html = `
		<table class="table table-striped" id="tbl_ch">
		  <thead  class="table-dark">
			<tr>
			  <th scope="col">Author</th>			  
			  <th scope="col" class="text-center">Action</th>
			</tr>
		  </thead>
		  <tbody>
		`;

	for (let i = 0; i < data.length; i++){
		console.log(data[i]);
		author_table_html += '<tr>'
		author_table_html += '<td class="col-2">' + data[i].name + '</td>'
		author_table_html += '<td class="col-2">'
		author_table_html += '<button type="button" class="btn btn-danger float-end mx-2" onclick="del_author(\'' + data[i]._id + '\')"><i class="bi bi-trash"></i></button>';
		author_table_html += '<button type="button" class="btn btn-primary float-end mx-2" onclick="find_author(\'' + data[i]._id + '\')"><i class="bi bi-pencil-square"></i></button>'

		author_table_html += '</td>'
	}

	author_table_html += '</tbody></table>';
	document.getElementById('div_author_table').innerHTML= author_table_html;
}

function add_author(){
	$.getScript("/fe/pages/author/author_item.js", function() {
		init_author_item('');
	});
}

function find_author(id){
	//alert('Finding author ' + id);	
	$.getScript("/fe/pages/author/author_item.js", function() {
		init_author_item(id);
	});
}


// function del_author(id){
	// if (confirm('Are you sure you want to delete this author?')){
		// alert("Author Deleted");
		// init_author_list();
	// }
// }

function del_author(id){
	if (confirm('Are you sure you want to delete this author?')){
		$.ajax({
		  method: "DELETE",
		  url: "/api/author/" + id
		})
		  .done(function( msg ) {
			alert("Author Deleted");
			init_author_list();
		  });				
	}
}



init_author_list();
