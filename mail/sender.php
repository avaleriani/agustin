<?php
require 'phpmailer.php';
require 'smtp.php';
require 'config.php';

header('Content-type:application/json');
/* Get input variables  */
if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer;

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = $data['host'];                          // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $data['username'];                  // SMTP username
    $mail->Password = $data['password'];                  // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = $data['port'];                          // TCP port to connect to

    $mail->setFrom($data['form'], 'AV - Contact');
    $mail->addAddress($data['to'], 'AV');
    $mail->addAddress($data['cc']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);

    $mail->Subject = $subject;
    $mail->Body = $message;

    if (!$mail->send()) {
        echo json_encode([
            "status" => "error",
            "message" => 'Something went wrong!',
            "details" => error_get_last()['message'];
        ], JSON_PRETTY_PRINT);
    } else {
        echo json_encode([
            "status" => "OK",
            "message" => 'Your message has been sent!'
        ], JSON_PRETTY_PRINT);
    }
}