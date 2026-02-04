<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$required_fields = ['name', 'email', 'phone', 'country', 'timezone', 'availability'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($data['phone'])));
$country = htmlspecialchars(strip_tags(trim($data['country'])));
$timezone = htmlspecialchars(strip_tags(trim($data['timezone'])));
$availability = htmlspecialchars(strip_tags(trim($data['availability'])));

// SMTP Configuration
$smtp_host = 'mycarerx-in.mail.protection.outlook.com';
$smtp_port = 25;
$smtp_username = 'Info@mycarerx.in';
$smtp_password = 'Mycare@rxc8990';
$from_email = 'Info@mycarerx.in';
$from_name = 'My Care RX Connections';
$admin_email = 'Info@mycarerx.in';

// Try to use PHPMailer if available
$phpmailer_path = __DIR__ . '/../vendor/autoload.php';
$use_phpmailer = file_exists($phpmailer_path);

if ($use_phpmailer) {
    require_once $phpmailer_path;
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    $mail = new PHPMailer(true);
    
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = $smtp_host;
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_username;
        $mail->Password = $smtp_password;
        // Port 25 typically doesn't use encryption, but try STARTTLS if available
        $mail->SMTPSecure = false; // Port 25 is usually unencrypted
        $mail->SMTPAutoTLS = true; // Try STARTTLS if server supports it
        $mail->Port = $smtp_port;
        $mail->CharSet = 'UTF-8';
        $mail->SMTPDebug = 0; // Set to 2 for debugging
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        
        // Set From
        $mail->setFrom($from_email, $from_name);
        $mail->addReplyTo($from_email, $from_name);
        
        // Email 1: Thank you email to user
        $mail->clearAddresses();
        $mail->addAddress($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'Thank You for Your Consultation Request - My Care RX Connections';
        
        $thank_you_message = getThankYouEmailTemplate($name, $email, $phone, $country, $timezone, $availability);
        
        $mail->Body = $thank_you_message;
        $mail->send();
        
        // Email 2: Notification email to admin
        $mail->clearAddresses();
        $mail->addAddress($admin_email, 'My Care RX Connections');
        $mail->Subject = 'New Consultation Request - ' . $name;
        
        $admin_message = getAdminEmailTemplate($name, $email, $phone, $country, $timezone, $availability);
        
        $mail->Body = $admin_message;
        $mail->send();
        
        // Return success response
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your consultation request has been submitted successfully. We will contact you soon.'
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send consultation request. Please try again later.',
            'error' => $mail->ErrorInfo
        ]);
    }
} else {
    // Fallback: Use mail() function (Note: This won't use SMTP authentication)
    // For production with SMTP, PHPMailer is required
    
    // Prepare mail headers
    $headers  = "From: My Care RX Connections <" . $from_email . ">\r\n";
    $headers .= "Reply-To: " . $from_email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    
    // Thank you email to user
    $thank_you_subject = 'Thank You for Your Consultation Request - My Care RX Connections';
    $thank_you_message = getThankYouEmailTemplate($name, $email, $phone, $country, $timezone, $availability);
    
    $user_mail_sent = mail($email, $thank_you_subject, $thank_you_message, $headers);
    
    // Admin notification email
    $admin_subject = 'New Consultation Request - ' . $name;
    $admin_message = getAdminEmailTemplate($name, $email, $phone, $country, $timezone, $availability);
    
    $admin_mail_sent = mail($admin_email, $admin_subject, $admin_message, $headers);
    
    // Return success response
    if ($user_mail_sent && $admin_mail_sent) {
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
}

// Email template functions
function getThankYouEmailTemplate($name, $email, $phone, $country, $timezone, $availability) {
    return '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, rgb(1, 152, 218) 0%, rgb(1, 132, 198) 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #fff; margin: 0;">Thank You, ' . htmlspecialchars($name) . '!</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Dear ' . htmlspecialchars($name) . ',</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">Thank you for requesting a consultation with My Care RX Connections. We have received your request and our team will review it shortly.</p>
        
        <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: rgb(1, 152, 218); margin-top: 0; border-bottom: 2px solid rgb(1, 152, 218); padding-bottom: 10px;">Your Request Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 140px;">Name:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($name) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($email) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($phone) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Country:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($country) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Timezone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($timezone) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Preferred Availability:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($availability) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Submitted At:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . date('F j, Y \a\t g:i A') . '</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 25px;">We will contact you within 24 hours to schedule your consultation at your preferred time.</p>
        
        <p style="font-size: 16px; margin-bottom: 0;">Best regards,<br><strong>My Care RX Connections Team</strong></p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">If you have any questions, please contact us at Info@mycarerx.in</p>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
        <p>&copy; ' . date('Y') . ' My Care RX Connections. All rights reserved.</p>
    </div>
</body>
</html>';
}

function getAdminEmailTemplate($name, $email, $phone, $country, $timezone, $availability) {
    return '<!DOCTYPE html>
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
                    <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 140px;">Name:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($name) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email:</td>
                    <td style="padding: 10px 0; color: #1e293b;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: rgb(1, 152, 218); text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;"><a href="tel:' . htmlspecialchars($phone) . '" style="color: rgb(1, 152, 218); text-decoration: none;">' . htmlspecialchars($phone) . '</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Country:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($country) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Timezone:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($timezone) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Preferred Availability:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . htmlspecialchars($availability) . '</td>
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
}
?>
