function rotationPage() {
    var faces = ["front", "right", "back", "left"];
    var btn_anims = {"btn-simple-left": "turnLeftSimple",
                     "btn-simple-right": "turnRightSimple",
                     "btn-double-left": "turnLeftDouble",
                     "btn-double-right": "turnRightDouble"
                    };
    var classes;
    var btn_classes;
    var face;
    var anim_func;
    var offset;
    var anim_val;
    var face_index;
    var anim_x;

    //function zoomOut(anim_x) {
    window["zoomOut"] = function(anim_x) {
        anim_val = '3s ease-in-out forwards recoil-' + String(anim_x);
        return anim_val;
    }

    //function zoomIn(anim_x) {
    window["zoomIn"] = function(anim_x) {
        anim_val = '3s ease-in-out forwards forward-' + String(anim_x);
        return anim_val;
    }

    //function turnLeftSimple(anim_x) {
    window["turnLeftSimple"] = function(anim_x) {
        anim_val = '3s ease-in-out forwards rotation-left-simple-' + String(anim_x);
        return anim_val;
    }

    //function turnLeftDouble(anim_x) {
    window["turnLeftDouble"] = function(anim_x) {
        anim_val = '3s ease-in-out forwards rotation-left-double-' + String(anim_x);
        return anim_val;
    }

    //function turnRightSimple(anim_x) {
    window["turnRightSimple"] = function(anim_x) {
        anim_val = '3s ease-in-out forwards rotation-right-simple-' + String(anim_x);
        return anim_val;
    }

    //function turnRightDouble(anim_x) {
    window["turnRightDouble"] = function(anim_x) {
        anim_val = '3s ease-in-out forwards rotation-right-double-' + String(anim_x);
        return anim_val;
    }

    function storeVisibleFace(animFunc, i, face) {
        if (animFunc == "zoomIn" && i === 0) {
            $('#active-face').val(face).trigger('change');
        }
    }
    
    function animateFaces(animFunc, offset) {
        for (var i = 0; i < 4; i++) {
            face_index = i + offset;
            if (face_index > 3) {
                face_index -= 4;
            } else if (face_index < 0) {
                face_index += 4;
            }
            face = faces[face_index];
            storeVisibleFace(animFunc, i, face)
            face = "." + face;
            //console.log(face);
            anim_x = i + 1;
            anim_val = window[animFunc](anim_x);
            /*console.log(face);
            console.log(anim_val);*/
            $(face).css({animation: anim_val});
        }
    }

    var click = false;

    $('.btn-anim').click(function() {
        if (click) {
            return false;
        }
        click = true;
        //classes = $(this).parent().parent().attr('class');
        classes = $(this).parents('.face').attr('class');
        btn_classes = $(this).attr('class');
        //console.log(classes);
        classes = classes.split(' ');
        face = classes[1];
        btn_classes = btn_classes.split(' ');
        anim_func = btn_anims[btn_classes[2]];
        offset = faces.indexOf(face);

        animateFaces("zoomOut", offset);
        setTimeout(function() {
            animateFaces(anim_func, offset);
        }, 3050);
        
        //console.log(anim_func);
        setTimeout(function() {
            switch(anim_func) {
                case "turnLeftSimple":
                    offset--;
                    break;
                case "turnLeftDouble":
                    offset -= 2;
                    break;
                case "turnRightSimple":
                    offset++;
                    break;
                case "turnRightDouble":
                    offset += 2;
            }
            animateFaces("zoomIn", offset);
        }, 6100);

        setTimeout(function() {
            click = false;
        }, 9150);
    });
}