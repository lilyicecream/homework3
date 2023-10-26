<?php
// Start the session
session_start();

// Set headers to return JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

// Check if a user is logged in
if (isset($_SESSION["user"]) || isset($_SESSION["logged"])) {
    // Return the session data as JSON
    echo json_encode(
        array(
            "user" => $_SESSION["user"],
            "logged" => $_SESSION["logged"]
        )
    );
} else {
    // Return an error message as JSON
    echo json_encode(
        array("message" => "No user is currently logged in.")
    );
}
?>