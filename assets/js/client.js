document.addEventListener( 'DOMContentLoaded', () => {
	$.ajax( {
		url: '/music',
		type: 'GET',
		data: $( '#currentFiles' ).serialize(),
		success: function( data ) {
			if( data ) {
				let jsonData = JSON.parse( data );
				if ( jsonData.files && jsonData.files.length ) {
					let select = document.createElement( 'select' );
					select.required = 'true';
					select.name = 'directory';

					for( let i = 0; i < jsonData.files.length; i++ ) {
						let option = document.createElement( 'option' );
						option.value = jsonData.files[i];
						option.innerText = jsonData.files[i];
						select.append( option );
					}

					document.querySelector( '#wavContainer' ).append( select );
					document.querySelector( '#currentFiles' ).className = '';
					document.querySelector( '#clearDirectory' ).className = '';
				}
			}
		}
	} );

	document.querySelector( '#clearDirectory' ).addEventListener( 'submit', ( e ) => {
		fetch( '/music/delete', {
			method: 'DELETE',
    	} ).then( response => response ).then( ( data ) => { window.location.reload() } );
		e.preventDefault();
	} );
} );