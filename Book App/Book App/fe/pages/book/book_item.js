function init_book_item(id){
	$('#x-body').load('/fe/pages/book/book_item.htm?1')
	$.get( "/api/author/", function( data ) {
		var sel = $("#selauthor");
		sel.empty();
		sel.append('<option value="">Select an Author</option>');
		for (let i = 0; i < data.length; i++){
		  sel.append('<option value="' + data[i]._id + '">' + data[i].name + '</option>');
		}
	});

	if (id != ''){
		$.get( "/api/book/" + id, function( data )  {
			//console.log(data);
			render_details(data);
		});
	}
	
}

//set category
function setcategory(ctrl){
	$('#txtcategory').val($(ctrl).prop('value'))
	$('#txtcategoryname').val($(ctrl).prop('options')[$(ctrl).prop('selectedIndex')].innerHTML)
}

//set author
function setauthor(ctrl){
	$('#txtauthor').val($(ctrl).prop('value'))
	$('#txtauthorname').val($(ctrl).prop('options')[$(ctrl).prop('selectedIndex')].innerHTML)
}

//save book
function save_book(){
	formData = {
		"book_title" : $('#booktitle').val(),
		"publish_date" : $('#publishdate').val(),
		"price" : $('#bookprice').val(),
		"desc" : $('#bookdesc').val(),	
		"category_id" : $('#txtcategory').val(),
		"category" : $('#txtcategoryname').val(),
		"author_id" : $('#txtauthor').val(),
		"author" : $('#txtauthorname').val()
	}

	var jsonData = JSON.stringify(formData);

	$.post({
			url:"/api/book/" + $('#bookid').val(), 
			contentType:'application/json',
			data: jsonData
			})			
	    .done(function( data ) {
		show_book_list();
	 });

}

//show book ListFormat
function show_book_list(){
	$.getScript('/fe/pages/book/book_list.js')
}

//render details
function render_details(data){
	$('#bookid').val(data._id)
	$('#booktitle').val(data.name)
	$('#booktitle').val(data.book_title)
	$('#publishdate').val(data.publish_date)
	$('#bookprice').val(data.price)
	$('#bookdesc').val(data.desc)	

	$('#selcategory').val(data.category_id)
	$('#txtcategory').val(data.category_id)
	$('#txtcategoryname').val(data.category)

	$('#selauthor').val(data.author_id)	
	$('#txtauthor').val(data.author_id)
	$('#txtauthorname').val(data.author)

}



