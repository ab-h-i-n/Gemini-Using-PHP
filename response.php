<?php
    require("vendor/autoload.php");

    use GeminiAPI\Client;
    use GeminiAPI\Resources\Parts\TextPart;

    $reqBody = json_decode(file_get_contents("php://input"), true);

    $text = $reqBody['text'];

    $client = new Client('AIzaSyAOMVZV_h2bPjuFJLAl867qTrFkKQdAfGo');

    $response = $client->geminiPro()->generateContent(
        new TextPart($text),
    );

    echo $response->text();

?>