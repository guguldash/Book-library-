// from author list.js
function init_member_list() {
    $('#x-body').load('/fe/pages/member/member_list.htm');
    // $.get("/api/member/", function(data) {
        // render_member_table(data);
    // });
    filter();
}

function filter() {
    $.get("/api/member/", function(data) {
		console.log('data....',data);
        render_member_table(data);
    });
}

function render_member_table(data) {
    let member_table_html = `
        <table class="table table-striped" id="tbl_ch">
          <thead class="table-dark">
            <tr>
              <th scope="col">Name</th>  
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        member_table_html += '<tr>';
        member_table_html += '<td class="col-2">' + data[i].member_name + '</td>';
        member_table_html += '<td class="col-2">' + data[i].member_email + '</td>';
        member_table_html += '<td class="col-2">' + data[i].phone_number + '</td>';
        member_table_html += '<td class="col-2">';
        member_table_html += '<button type="button" class="btn btn-danger float-end mx-2" onclick="del_member(\'' + data[i]._id + '\')"><i class="bi bi-trash"></i></button>';
        member_table_html += '<button type="button" class="btn btn-warning light float-end mx-2" onclick="find_member(\'' + data[i]._id + '\')"><i class="bi bi-pencil-square"></i></button>';
        member_table_html += '</td>';
        member_table_html += '</tr>';
    }

    member_table_html += '</tbody></table>';
    document.getElementById('div_member_table').innerHTML = member_table_html;
}

function add_member() {
    $.getScript("/fe/pages/member/member_item.js", function() {
        init_member_item('');
    });
}

function find_member(id) {
    //alert('Finding author ' + id);  
    $.getScript("/fe/pages/member/member_item.js", function() {
        init_member_item(id);
    });
}

function del_member(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        $.ajax({
            method: "DELETE",
            url: "/api/member/" + id
        })
        .done(function(msg) {
            alert("Member Deleted");
            init_member_list();
        });
    }
}

init_member_list();

