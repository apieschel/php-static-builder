$(document).ready(function () {
	const http = new XMLHttpRequest();
	const url = '/music';
	http.open( "GET", url );
	http.send();
	http.onreadystatechange = function () {
		if (this.readyState == 4) {
			$.ajax( {
				url: '/music',
				type: 'get',
				data: $( '#currentFiles' ).serialize(),
				success: function (data) {
					let jsonData = JSON.parse( data );
					if ( jsonData.files && jsonData.files.length ) {
						let select = document.createElement("select");
						select.required = "true";
						select.name = "directory";

						for (let i = 0; i < jsonData.files.length; i++) {
							let option = document.createElement("option");
							option.value = jsonData.files[i];
							option.innerText = jsonData.files[i];
							select.append(option);
						}

						document.querySelector("#wavContainer").append(select);
						document.querySelector("#currentFiles").className = "";
						document.querySelector("#clearDirectory").className = "";
					}
				}
			} );
		}
	}

	$('#clearDirectory').submit(function (e) {
		const url = "/music/delete";
		$.ajax({
			type: "DELETE",
			url: url,
			data: $(this).serialize(),
			success: function (data) {
				alert("All files were deleted from your personal directory.");
				location.reload();
			}
		});
		e.preventDefault();
	});
});