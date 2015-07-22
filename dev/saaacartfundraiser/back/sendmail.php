<?php

require 'vendor/autoload.php';

use Mailgun\Mailgun;

function ajaxResponse($status, $message, $data = null, $mailgun = null)
{
  $response = [
    'status'  => $status,
    'message' => $message,
    'data'    => $data,
    'mailgun' => $mailgun
  ];

  $output = json_encode($response);

  exit($output);
}

function sendMailgun($data)
{
  $mg = new Mailgun('key-466075d3f2ddd26f57c9554cece31d5f');
  $domain = 'mg.behindtheline.ca';
  $receiver = 'artfundraiser@behindtheline.ca';

  $name = $data['name'];
  $email = $data['email'];
  $content = $data['message'];

  $messageBody = "From: $name ($email)\n\n$content";

  $result = $mg->sendMessage($domain, [
    'from' => $email,
    'to' => $receiver,
    'subject' => 'Contact from ' . $name,
    'text' => $messageBody
  ]);


  return $result;
}

if(empty($_POST) || !isset($_POST)) {
  ajaxResponse('error', 'invalid-arguments');
} else {
  $postData = $_POST;
  $dataString = implode($postData,",");
  $mailgun = sendMailgun($postData);

  if($mailgun->http_response_code == 200) {
      ajaxResponse('success', 'Success.', $postData, $mailgun);
  } else {
      ajaxResponse('error', 'Mailgun failed to send', $postData, $mailgun);
  }
}

?>
