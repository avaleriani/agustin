<?php
require 'phpmailer.php';
require 'smtp.php';

header('Content-type:application/json');
/* Get input variables  */
if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer;

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'test@test.com';       // SMTP username
    $mail->Password = 'test';                        // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->setFrom('test@test.com', 'AV - Contact');
    $mail->addAddress('test@test.com', 'AV');
    $mail->addAddress('test@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);

    $mail->Subject = $subject;
    $mail->Body = $message;

    if (!$mail->send()) {
        echo json_encode([
            "status" => "error",
            "message" => 'Something went wrong!'
        ], JSON_PRETTY_PRINT);
    } else {
        echo json_encode([
            "status" => "OK",
            "message" => 'Your message has been sent!'
        ], JSON_PRETTY_PRINT);
    }
}
?>