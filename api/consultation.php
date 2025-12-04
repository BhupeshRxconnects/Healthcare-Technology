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
$required_fields = ['name', 'email', 'phone', 'availability'];
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
$availability = htmlspecialchars(strip_tags(trim($data['availability'])));

// Prepare mail headers
$headers  = "From: Healthcare Technology <admin@rxconnect.space>\r\n";
$headers .= "Reply-To: admin@rxconnect.space\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

// Email recipient (same as from address)
$to = "admin@rxconnect.space";
$subject = "New Consultation Request - Healthcare Technology";

// HTML Email template
$message = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #fff; margin: 0;">New Consultation Request</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">You have received a new consultation request from your website.</p>
        
        <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 140px;">Name:</td>
                    <td style="padding: 10px 0; color: #1e293b;">' . $name . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email:</td>
                    <td style="padding: 10px 0; color: #1e293b;"><a href="mailto:' . $email . '" style="color: #2563eb; text-decoration: none;">' . $email . '</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone:</td>
                    <td style="padding: 10px 0; color: #1e293b;"><a href="tel:' . $phone . '" style="color: #2563eb; text-decoration: none;">' . $phone . '</a></td>
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
        <p>&copy; ' . date('Y') . ' Healthcare Technology. All rights reserved.</p>
    </div>
</body>
</html>';

// Send email
$mailSent = mail($to, $subject, $message, $headers);

// Return success response
if ($mailSent) {
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

