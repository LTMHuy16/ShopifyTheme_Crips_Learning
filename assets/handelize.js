const handelize = (function() {
    const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç'{}´-+¿?.,;:[]*¨¡!=()&%$#/\"_",
        to = " ",
        mapping = {};
    for(var i = 0, j = from.length; i < j; i++ )
        //mapping[ from.charAt( i ) ] = to.charAt( i );
        mapping[ from.charAt( i ) ] = to;

        return function( str ) {
            var ret = [];
            for( var i = 0, j = str.length; i < j; i++ ) {
                var c = str.charAt( i );
                if( mapping.hasOwnProperty( str.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }
        //return ret.join( '' );
        return ret.join( '' ).trim().replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
    };
})();