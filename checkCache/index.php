<?php
	require_once( '../inc/config.php' );

    // http://www.ajaxonomy.com/2012/php/making-a-server-side-image-cache-in-php
    function checkCache( $id, $file ) {
        if( $id == '0' && $file == '' ) {
            return '#';
        }
        
        // https://www.javatpoint.com/how-to-get-current-page-url-in-php
        /* if( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ) {   
            $SITE_URL = "https://";   
        } else {  
            $SITE_URL = "http://";   
        } */

        $SITE_URL = "https://";

        // Append the host(domain name, ip) to the URL.   
        $SITE_URL .= $_SERVER['HTTP_HOST'];     

        $cachefile = dirname( dirname( __FILE__ ) ) . '/imagecache/' . $file;
        $cacheURL = $SITE_URL . '/imagecache/' . $file;
  
        if( file_exists( $cachefile ) && $file != ''  ) {
            return $cacheURL;
        } else {
            $curl = curl_init();
                            
            curl_setopt_array( $curl, [
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => API_URL . '/' . $id
            ] );

            $mediaResult = curl_exec( $curl );
            $mediaResultStatus = curl_getinfo( $curl, CURLINFO_HTTP_CODE );
            
            curl_close( $curl );
            
            if ( $mediaResultStatus == 200 ) {
                $mediaResult = json_decode( $mediaResult );
                $imageURL = $mediaResult->guid->rendered;
                $imageFile = $mediaResult->media_details->sizes->full->file;
                $image = file_get_contents( $imageURL );
                

                if( file_exists( dirname( dirname( __FILE__ ) ) . '/imagecache' ) ) {
                    // Cache the output to a file
                    $fp = fopen( dirname( dirname( __FILE__ ) ) . '/imagecache/' . $imageFile, 'wb' );
                    fwrite( $fp, $image );
                    fclose( $fp );
                }

                return $imageURL;
            }

            return '';
        }

        return '';
    }
?>