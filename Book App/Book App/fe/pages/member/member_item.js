function init_member_item(id) { 
    $('#x-body').load('/fe/pages/member/member_item.htm?1');
    
    // $.get( "/api/member/" + id, function( data ) {
    //     var sel = $("#selmember");
    //     sel.empty();
    //     sel.append('<option value="">all members</option>');
    //     for (let i = 0; i < data.length; i++) {
    //         sel.append('<option value="' + data[i]._id + '">' + data[i].name + '</option>');
    //     }
    // });

    if (id != '') {
        $.get("/api/member/" + id, function(data) {
            render_details(data);
        });
    }
}

// save member
function save_member() {
    // console.log(data);
    var formData = {
       
        "member_name": $('#membername').val(),
        "member_email": $('#memberemail').val(),
        "phone_number": $('#memberphonenumber').val(),
        "Password": $('#memberpassword').val(),
		"pic":$('#mem_pic').val(),
		"lat":$('#loc_lat').val(),
		"lon":$('#loc_lon').val()

    };

    var jsonData = JSON.stringify(formData);
	console.log(jsonData);
    
    $.post({
			url:"/api/member/" + $('#memberid').val(), 
			contentType:'application/json',
			data: jsonData
			})
			.done(function( data ) {
		    show_member_list();
	 });

}

// show member list
function show_member_list() {
    $.getScript('/fe/pages/member/member_list.js');
}

// render details
function render_details(data) {
    $('#memberid').val(data._id);  
    $('#membername').val(data.member_name); 
    $('#memberemail').val(data.member_email); 
    $('#memberphonenumber').val(data.phone_number); 
    $('#memberpassword').val(data.Password);
	$('#mem_pic').val(data.pic)
	$("#photo").attr("src",$('#mem_pic').val())
	$('#loc_lat').val(data.lat)
	$('#loc_lon').val(data.lon)


}


startCam = function() {
	var video = document.getElementById('video');
	var photo = document.getElementById('photo');
	var startCamBtn = document.getElementById('startcam');
	var takePicBtn = document.getElementById('takepic');

	// Request access to the camera
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
		.then(function(mediaStream) {
			stream = mediaStream; // Store the media stream globally
			video.srcObject = stream; // Link the video element to the stream
			video.style.display = 'block'; // Show the video feed
			photo.style.display = 'none'; // Hide the current profile picture
			video.play(); // Start playing the video
			takePicBtn.style.display = 'block'; // Show the 'Take Photo' button
			startCamBtn.style.display = 'none'; // Hide the 'Start Camera' button
		})
		.catch(function(err) {
			console.log("An error occurred: " + err);
		});
};

takePic = function() {
	var canvas = document.getElementById('canvas');
	var video = document.getElementById('video');
	var photo = document.getElementById('photo');
	var takePicBtn = document.getElementById('takepic');
	var picb64 = document.getElementById('mem_pic');


	var context = canvas.getContext('2d');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;


	// Draw the current frame from the video onto the canvas
	context.drawImage(video, 0, 0, canvas.width, canvas.height);


	// Get the image data from the canvas and display it in the photo <img> tag
	var data = canvas.toDataURL('image/jpeg',0.7);
	photo.setAttribute('src', data);
	picb64.value = data;


	photo.style.display = 'block'; // Show the new photo
	video.style.display = 'none'; // Hide the video feed
	takePicBtn.style.display = 'none'; // Hide the 'Take Photo' button


	// Stop the video stream
	if (stream) {
		stream.getTracks().forEach(function(track) {
			track.stop();
		});
		stream = null; // Clear the stream after stopping it
	} else {
		console.error("No stream found to stop.");
	}
};


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  $('#loc_lat').val(position.coords.latitude)
  $('#loc_lon').val(position.coords.longitude)  
}


init_member_item('');

