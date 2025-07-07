<?php

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Enable errors for debugging (optional, remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load .env
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Allow requests from browser (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get API key from .env
$apiKey = $_ENV["GEMINI_API_KEY"] ?? null;

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "API key not set"]);
    exit;
}

// Get the JSON input from JavaScript
$input = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!$input || !isset($input["contents"])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request."]);
    exit;
}

// Prepare request to Gemini API
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . $apiKey;

$options = [
    "http" => [
        "method" => "POST",
        "header" => "Content-Type: application/json\r\n",
        "content" => json_encode([
            "contents" => $input["contents"],
            "generationConfig" => $input["generationConfig"] ?? [ "temperature" => 1.3 ],
        ])
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Check for error
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to contact Gemini API"]);
    exit;
}

// Return the raw response from Gemini
echo $response;
