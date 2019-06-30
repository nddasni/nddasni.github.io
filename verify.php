<?php

    if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
        //your site secret key
        $secret = '6LddVqsUAAAAAF7fEEAzUSZL0FPDbiSsF-CZScyt';
        //get verify response data
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
        $responseData = json_decode($verifyResponse);
        if($responseData->success):

             print_r("Working Fine"); exit;
        else:
             print_r("No valid Key"); exit;
        endif;
    } else {
        print_r("Not Working Captcha"); exit;
    }

?>