<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$required_fields = ['name', 'email', 'phone', 'country', 'timezone', 'availability'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($data['phone'])));
$country = htmlspecialchars(strip_tags(trim($data['country'])));
$timezone = htmlspecialchars(strip_tags(trim($data['timezone'])));
$availability = htmlspecialchars(strip_tags(trim($data['availability'])));

$headers  = "From: My Care RX Connections <Info@mycarerx.in>\r\n";
$headers .= "Reply-To: Info@mycarerx.in\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

$toCompany = "Info@mycarerx.in";
$subjectCompany = "New Consultation Request - My Care RX Connections";

$messageCompany = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, rgb(1, 152, 218) 0%, rgb(1, 132, 198) 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #fff; margin: 0;">New Consultation Request</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">You have received a new consultation request from your website.</p>
        
        <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: rgb(1, 152, 218); margin-top: 0; border-bottom: 2px solid rgb(1, 152, 218); padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 180px;">Name:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $name . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email:</td>
                    <td style="padding: 10px 0; color: #1e293b;"><a href="mailto:' . $email . '" style="color: rgb(1, 152, 218); text-decoration: none;">' . $email . '</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;"><a href="tel:' . $phone . '" style="color: rgb(1, 152, 218); text-decoration: none;">' . $phone . '</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Country:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $country . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Timezone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $timezone . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Preferred Availability:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $availability . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Submitted At:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . date('F j, Y \a\t g:i A') . '</td>
                </tr>
            </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">This is an automated notification from your website contact form.</p>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
        <p>&copy; ' . date('Y') . ' My Care RX Connections. All rights reserved.</p>
    </div>
</body>
</html>';

$subjectUser = "Thank You for Your Consultation Request - My Care RX Connections";
$messageUser = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Consultation Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, rgb(1, 152, 218) 0%, rgb(1, 132, 198) 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #fff; margin: 0;">Thank You, ' . $name . '!</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Dear ' . $name . ',</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">Thank you for reaching out to My Care RX Connections! We have successfully received your consultation request and are excited about the opportunity to assist you.</p>
        
        <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: rgb(1, 152, 218); margin-top: 0; border-bottom: 2px solid rgb(1, 152, 218); padding-bottom: 10px;">Your Request Summary</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 180px;">Name:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $name . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $email . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $phone . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Country:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $country . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Timezone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $timezone . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Preferred Availability:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $availability . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Submitted At:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . date('F j, Y \a\t g:i A') . '</td>
                </tr>
            </table>
        </div>
        
        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid rgb(1, 152, 218);">
            <p style="font-size: 16px; margin: 0; color: #1e293b;"><strong>What happens next?</strong></p>
            <ul style="margin: 15px 0 0 20px; padding: 0; color: #1e293b;">
                <li style="margin-bottom: 10px;">Our team will review your request within 24 hours</li>
                <li style="margin-bottom: 10px;">We will contact you at your preferred availability time</li>
                <li style="margin-bottom: 10px;">We will discuss your specific healthcare technology needs</li>
                <li>We will provide a customized solution proposal</li>
            </ul>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 20px;">If you have any immediate questions or need to update your consultation request, please feel free to contact us at <a href="mailto:Info@mycarerx.in" style="color: rgb(1, 152, 218); text-decoration: none;">Info@mycarerx.in</a>.</p>
        
        <p style="font-size: 16px; margin-bottom: 0;">We look forward to speaking with you soon!</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,<br><strong>My Care RX Connections Team</strong></p>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
        <p>&copy; ' . date('Y') . ' My Care RX Connections. All rights reserved.</p>
        <p>Email: <a href="mailto:Info@mycarerx.in" style="color: rgb(1, 152, 218);">Info@mycarerx.in</a></p>
    </div>
</body>
</html>';

$mailSentToCompany = mail($toCompany, $subjectCompany, $messageCompany, $headers);
$mailSentToUser = mail($email, $subjectUser, $messageUser, $headers);

if ($mailSentToCompany && $mailSentToUser) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your consultation request has been submitted successfully. We have sent a confirmation email to your inbox. We will contact you soon.'
    ]);
} else if ($mailSentToCompany) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your consultation request has been submitted successfully. We will contact you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send consultation request. Please try again later.'
    ]);
}

