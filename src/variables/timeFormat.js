import moment from 'moment';
const $ = require('jquery');

$.fn.dataTable.moment = function ( format ) {
    var types = $.fn.dataTableExt.aTypes;

    types.unshift( function ( d ) {
        if ( d === '' || d === null ) {
            return 'moment-'+format;
        }
        return moment( d.replace ? d.replace(/<.*?>/g, '') : d, format, true ).isValid() ?
        'moment-'+format :
            null;
    } );

    function parseFormatToUnix(value, format) {
        return value === '' || value === null ?
            -Infinity :
            parseInt( moment( value.replace ? value.replace(/<.*?>/g, '') : value, format, true ).format( 'x' ), 10 );
    }

    $.fn.dataTableExt.oSort[ 'moment-'+format+'-asc' ] = function ( x, y ) {

        var parsedX = parseFormatToUnix(x, format);
        var parsedY = parseFormatToUnix(y, format);

        return parsedX - parsedY;
    };

    $.fn.dataTableExt.oSort[ 'moment-'+format+'-desc' ] = function ( x, y ) {
        var parsedX = parseFormatToUnix(x, format);
        var parsedY = parseFormatToUnix(y, format);

        return parsedY - parsedX;
    };
};