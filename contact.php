<?php

include 'sendMail.php';

$mailer = new myMailer;

/*echo "<!--<form id="form-contact" action="" method="post">
    <label for="sujet">Sujet</label><br>
    <input type="text" id="sujet" name="sujet"><br>
    <label for="nom-exp">Votre nom</label><br>
    <input type="text" id="nom-exp" name="nom-exp" placeholder="(facultatif)"><br>
    <label for="adresse">Votre adresse email</label><br>
    <input type="email" id="adresse" name="adresse"><br>
    <label for="message">Message</label><br>
    <textarea id="message" name="message"></textarea>
    <button type="submit" id="contact-sub">Envoyer</button>
</form>-->";*/


//echo '<br>';
//var_dump($_POST);

if(!empty($_POST)) {
    if (empty($_POST["nom_exp"])) {
        $result = $mailer->sendMail($_POST["sujet"], $_POST["message"], $_POST["adresse"]);
    } else {
        $result = $mailer->sendMail($_POST["sujet"], $_POST["message"], $_POST["adresse"], $_POST["nom_exp"]);
    }



    $json = ["invalid-prms" => false, "send_fail" => false, "success" => false];

    if (!$result) {
        $json["invalid-prms"] = true;
    } else if (is_array($result)) {
        var_dump($result);
        $json["send_fail"] = true;
    } else if ($result) {
        $json["success"] = true;
    }

    $json = json_encode($json);

    echo $json;
}
