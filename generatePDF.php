<?php

require("vendor/autoload.php");

$reqBody = json_decode(file_get_contents("php://input"), true);

$mpdf = new Mpdf\Mpdf();
$mpdf->WriteHTML("
<html>
  <head>
  <title>".$reqBody['prompt']."</title>
    <style>
      .title {
        text-transform: uppercase;
        text-align: center;
      }
      .heading {
        text-transform: capitalize;
      }
    </style>
  </head>
  <body>
    <h1 class='title'>".$reqBody['prompt']."</h1>
    <h2>RESPONSE</h2>
    ".$reqBody['response']."
  </body>
</html>
");

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="response.pdf"');

$mpdf->Output('php://output', 'I'); // 'I' for inline view
