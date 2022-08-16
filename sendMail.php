<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'vendor/autoload.php';
require 'getSMTPPw.php';

class myMailer {
    private $mailer;
    private $smtp_pw;
    /*private $mail_regex = "/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/";*/
    
    //private $mail_regex = '/^([\w\.-]+)@([\w\.-]+)(\.[a-z]{2,4})$/';
    private $name_regex = "/^[\.a-zA-Z0-9\s]*$/";
    
    public function __construct() {
        $this->mailer = new PHPMailer(true);
        $pw_src = new getSMTPPw;
        $this->smtp_pw = $pw_src->get();
    }
    
    
    public function sendMail(string $subject, string $body, string $envoyeur, $name = false) {
        $envoyeur = trim($envoyeur);
        if (!$this->validateParams($envoyeur, $name)) {
            return false;
        }
        
        try {
            //$this->mailer->SMTPDebug = SMTP::DEBUG_SERVER;
            $this->mailer->SMTPDebug = false;
            $this->mailer->isSMTP();
            /*$this->mailer->Host = 'smtp.free.fr';
            $this->mailer->Username = 'jeromesalvatori@free.fr';
            $this->mailer->Password   = '2fEFyrKAahLC';*/
            $this->mailer->SMTPAuth   = true;    
            $this->mailer->Host = 'censuré';
            $this->mailer->Username = 'censuré';
            $this->mailer->Password   = $this->smtp_pw;
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $this->mailer->Port = 465;

            /*if (!$name) {
                $this->mailer->setFrom($envoyeur);
            } else {
                $this->mailer->setFrom($envoyeur, $name);
            }*/
            /*$this->mailer->setFrom('jeromesalvatori@free.fr', 'Contact cv en ligne');*/
            $this->mailer->setFrom('censuré', 'Contact cv en ligne');
            $this->mailer->addAddress('censuré');
            if (!$name) {
                $this->mailer->addReplyTo($envoyeur);
            } else {
                $this->mailer->addReplyTo($envoyeur, $name);
            }
            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = str_replace('\n', '<br>', $body);
        
        
            $this->mailer->send();
        } catch (Exception $e) {
            $except_ret = [];
            $except_ret[] = $e->getMessage();
            return $except_ret;
        }
        return true;
    }
    
    private function validateParams($envoyeur, $name) {
        //if (!$this->validateCredential($envoyeur, $this->mail_regex) || ($name && !$this->validateCredential($name, $this->name_regex))) {
        if (!$this->validateMail($envoyeur) || ($name && !$this->validateCredential($name, $this->name_regex))) {
            return false;
        } elseif ($name) {
            $trimmed_nm = trim($name);
            if (empty($trimmed_nm)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
    
    private function validateMail($envoyeur) {
        if (filter_var($envoyeur, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }
    
    private function validateCredential($cred, $pattern) {
        $preg_result = preg_match($pattern, $cred);
        if ($preg_result === 1) {
            return true;
        } else {
            return false;
        }
    }
}

