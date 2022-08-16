function mailSend() {
    var nb_xhr = 0;
    
    function mailRequest(sujet, nom_exp, adresse, message) {
        var path = "contact.php"; //à modifier htaccess
        /*console.log(sujet);
        console.log(nom_exp);
        console.log(adresse);
        console.log(message);*/
        $.ajax({
            method: "POST",
            url: path,
            data: {sujet: sujet, nom_exp: nom_exp, adresse: adresse, message: message},
            //dataType: 'json',
            beforeSend: function(xhr) {
                if (nb_xhr > 0) {
                    xhr.abort();
                    return;
                }
                nb_xhr++;
                $('#div-form h2, #form-contact').animate({opacity: 0}, 100).css('display', 'none');
                setTimeout(function() {
                    $('#div-form').append('<div id="wrap-loader"><img id="mail-loader" src="images/loading-arrows.svg" alt="chargement"></div>');
                    $('#mail-loader').animate({opacity: 1}, 200);
                    /*console.log($('#mail-loader'));
                    console.log('settimeout');*/
                }, 110);
                //console.log(nb_xhr);
            }
        }).done(function(json) {
            json = JSON.parse(json);
            $('#mail-loader').animate({opacity: 0}, 200);
            setTimeout(function() {
                $('#wrap-loader').css('display', 'none');
            }, 210);
            if (json["success"]) {
                $('#div-form').append('<div id="super-wrap-suc"><div id="wrap-success"><div class="wrap-svg-suc"><svg id="svg-suc" width="160" height="160"><path id="path-suc" stroke="#26b77c" stroke-width="8" fill="none"  d="M16 80 L64 120 L144 40"/></svg></div><div id="wrap-mail-ok"><span class="letters">Mail envoyé.</span></div></div></div>');
                $('#div-form').find('#path-suc').css('animation', 'dash 1.2s ease-in-out forwards');
                successAnim();
            } else {
                $('#div-form').append('<div id="wrap-fail"><div id="contact-fail">Erreur: Envoi échoué.</div></div>');
            }
        });
    }
    
    function successAnim() {
        textWrapper = document.querySelector('#wrap-mail-ok .letters');
                textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                
        anime.timeline({loop: false}).add({
            targets: '#wrap-mail-ok .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 1200,
            delay: (el, i) => 50 * i
        });
    }
    
    var sujet, nom_exp, adresse, message;
    $('#contact-sub').click(function() {
        sujet = $('#sujet').val();
        nom_exp = $('#nom-exp').val();
        adresse = $('#adresse').val();
        message = lineBreaks($('#message').val());
        
        mailRequest(sujet, nom_exp, adresse, message);
    });
}