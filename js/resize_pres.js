function resizePres() {
    var mtxt;
    var mt_nat;
    var fsize;
    var content_ttl_ht;
    var selector;
    var sels;
    
    function cssMainC(grow = false) {
        sels = ['p', 'h1', 'h2'];
        $.each(sels, function(i, val) {
            fsize = $('.mainc-txt-l').find(val).css('font-size');
            fsize = fsize.slice(0, -2);
            fsize = parseFloat(fsize);
            if (!grow) {
                fsize *= 0.95;
            } else {
                fsize *= 1.04;
            }
            fsize = fsize.toString();
            fsize += "px";
            $('.mainc-txt-l').find(val).css('font-size', fsize);
        });
    }
    
    function fixTooSmall(mt, mt_raw) {
        //console.log('fixtoosm');
        content_ttl_ht = 0;
        function getCtHt() {
            content_ttl_ht = 0;
            //console.log(mt.find('p'));
            
            if (mt_raw == ".mainc-txt-l") {
                selector = "p, h1, h2";
                //console.log('fts back');
            } else {
                selector = "p";
                //console.log('fts pas back');
            }
            mt.find(selector).each(function() {
                /*console.log('each');
                console.log($(this).outerHeight(true));*/
                content_ttl_ht += $(this).outerHeight(true);
                //console.log(content_ttl_ht);
            });
        }
        getCtHt();
        /*console.log(content_ttl_ht);
        console.log(mt.height() * 0.9);*/
        if (content_ttl_ht < mt.height() * 0.9) {
            //console.log('too small');
            if (mt_raw == ".mainc-txt-l") {
                cssMainC(true);
            } else {
                fsize = mt.css('font-size');
                fsize = fsize.slice(0, -2);
                fsize = parseFloat(fsize);
                fsize *= 1.04;
                fsize = fsize.toString();
                fsize += "px";
                mt.css('font-size', fsize);
            }
            getCtHt();
            if (content_ttl_ht < mt.height() * 0.9) {
                fixTooSmall(mt, mt_raw);
            }
            //console.log(mt_raw);
            fixOverflow(mt_raw);
        }
    }
    
    function fixOverflow(txtd) {
        //console.log('fixoverflow');
        //mtxt = $('.main-txt');
        //console.log(txtd);
        mtxt = $(txtd);
        //console.log(mtxt);
        mt_nat = mtxt[0];
        //console.log(mt_nat.offsetHeight + ' | ' + mt_nat.scrollHeight);
        if (mt_nat.offsetHeight < mt_nat.scrollHeight) {
            if (txtd == ".mainc-txt-l") {
                cssMainC();
            } else {
                fsize = mtxt.css('font-size');
                //console.log(fsize);
                fsize = fsize.slice(0, -2);
                //console.log(fsize);
                fsize = parseFloat(fsize);
                //console.log(fsize);
                fsize *= 0.95;
                fsize = fsize.toString();
                //console.log(fsize);
                fsize += "px";
                mtxt.css('font-size', fsize);
            }
            
            if (mt_nat.offsetHeight < mt_nat.scrollHeight) {
                fixOverflow(txtd);
            }
        } else {
            fixTooSmall(mtxt, txtd);
        }
    }
    
    var fix_divs_ar = {front: '.main-txt', right: '#fortxt-wrap', back: '.mainc-txt-l'};
    
    //fixOverflow();
    $.each(fix_divs_ar, function(k, val) {
        //console.log('each start ' + val);
        fixOverflow(val);
    });
    
    var i = 0;
    
    $(window).resize(function() {
        //console.log('resize');
        i++;
        
        setTimeout(function() {
            i--;
            if(i == 0) {
                //fixOverflow();
                $.each(fix_divs_ar, function(i, val) {
                    fixOverflow(val);
                });
            }
        }, 200);
    });
    
    var face;
    var trgt_div;
    
    //console.log($('#active-face'));
    $('#active-face').change(function() {
        face = $(this).val();
        if (face == "left") {
            return false;
        }
        trgt_div = fix_divs_ar[face];
        //console.log('fixOverflow on change');
        
        setTimeout(function() {
            fixOverflow(trgt_div);
        }, 3050);
    });
}