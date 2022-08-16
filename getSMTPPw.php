<?php

class getSMTPPw {
    const PHR_CRYPTE = "censuré";
    const CIPHER = "censuré";
    const KEY = "censuré";
    const IV = "censuré";
    
    public function get() {
        $key = hex2bin(self::KEY);
        $iv = hex2bin(self::IV);
        return openssl_decrypt(self::PHR_CRYPTE, self::CIPHER, $key, 0, $iv);
    }
}

/*** test ***/

/*$serv = new getSMTPPw;

echo $serv->get();*/