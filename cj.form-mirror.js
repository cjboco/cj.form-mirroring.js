/*globals document,jQuery */
var CJ = ( function ( parent, $ ) {
	'use strict';

	var globals = parent.globals || {},
		settings = parent.settings || {},
		modules = parent.modules || {},
		filters = parent.filters || {},
		fn = parent.fn || {};

	var debug = false;

	// check globals
	if ( !globals.formErrs || !globals.formObj || !globals.formAlert ) {
		throw ( 'Missing required globals "formErrs,formObj,formAlert".' );
	}

	if ( !fn.getUrlParams || !$.isFunction( fn.getUrlParams ) ) {
		throw ( 'Missing required function "fn.getUrlParams()". (contacts.js)' );
	}

	if ( !fn.displayCJFormErrors || !$.isFunction( fn.displayCJFormErrors ) ) {
		throw ( 'Missing required function "fn.displayCJFormErrors()".' );
	}

	/* ======================== Start: Editable Content Below ======================== */


	/*
	 * function determines if an element is a form field or not.
	 */
	fn.isFormControl = function ( $elem ) {

		var nn = $elem[ 0 ].nodeName;

		if ( debug ) {
			console.log( 'isFormControl - nodeName', nn );
		}

		if ( ( [ 'INPUT', 'SELECT', 'TEXTAREA' ] ).indexOf( nn.toString() ) > -1 ) {
			return true;
		}

		return false;

	};

	/*
	 * A function that is called to format data.
	 */
	fn.doDataFormating = function ( data, format ) {

		if ( debug ) {
			console.log( 'fn.doDataFormating - Params:', {
				data: data,
				format: format
			} );
		}

		switch ( format ) {

		case 'currency':

			return '$' + parseFloat( data ).toFixed( 2 );

		case 'percentage':

			return parseFloat( data ) * 100 + '%';

		default:

			return data;

		}

	};


	/*
	 * Find all elements that have a data-mirror attribute
	 * and handle mirroring.
	 */
	$( '*[data-mirror]' ).on( 'change', function () {

		var $this = $( this ),
			$mirror = $( $this.attr( 'data-mirror' ) ),
			type = $this.attr( 'data-type' ) || null,
			format = $this.attr( 'data-format' ) || null,
			val = '';

		if ( fn.isFormControl( $this ) ) {

			val = $this.val();

		} else {

			val = $this.html();

		}

		if ( debug ) {
			console.log( '*[data-mirror]', {
				this: $this,
				mirror: $mirror,
				type: type,
				format: format,
				isFormControl: isFormControl( $this ),
				val: val
			} );
		}

		// we should do formating here
		if ( format ) {
			val = fn.doDataFormating( val, format );
		}

		if ( fn.isFormControl( $mirror ) ) {

			$mirror.val( val );

		} else {

			$mirror.text( val );
		}

		if ( debug ) {
			console.log( 'change blur', $mirror, val );
		}

	} );

	if ( debug ) {
		console.log( 'cj.form-mirror.js - loaded' );
	}

	/* ============================ End: Editable Content ============================ */

	// update any parent stuff and return
	parent.globals = globals;
	parent.settings = settings;
	parent.modules = modules;
	parent.filters = filters;
	parent.fn = fn;
	return parent;

}( CJ || {}, jQuery ) );