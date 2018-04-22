

<?php

define( 'API_ACCESS_KEY', 'AAAAX1inWRQ:APA91bHGk9z1qsi2F3LAgZ8ay7SS5hDBZ3iCLofUeKUYot2S1ZA2Znqlc7V1fmYV2jET7HjHK3kN4ydEYhlzPEU3DdFJYqJLxTr0HDUJA30Y1yC6sWM63dRXtJuqGzG-CCg2H_UJdhaH' );

// ANDROID SETTINGS
$headers = array(
    "Content-Type: application/json", 
    "Authorization: key=".API_ACCESS_KEY
);

$data = array(
    'to'    =>  "dHV-RaqqLpU:APA91bH92fHAqL-Usu-wmWX950ELuiJlw3QPXBndDQ8gEOiEz-yj9H5aBqGtZWdkQ1XdqTAS5AD6q1cjB71FGFzT-wfMWBNW2yuslNuW3HxPLgpM6zHPbHasFl1zd7Oc31tS7CKULb0M",
    'notification' => array('title' => html_entity_decode('CreditChain'), 'body' => html_entity_decode('Подтвердите кредит-дебит!'), 'icon' =>  'icon.png', 'ACCEPT_ACTION_ACTIVITY'  =>  'https://pizzamania.by')
);

$data_string = json_encode($data); 

$ch = curl_init();

curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch, CURLOPT_URL, "https://fcm.googleapis.com/fcm/send" );
curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0 );
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0 );
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch, CURLOPT_POSTFIELDS, $data_string);

$response = curl_exec($ch);
curl_close($ch);

echo var_dump($response);

?>