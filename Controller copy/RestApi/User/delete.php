<?php

    //Catches any errors
    error_reporting(E_ALL); 
    ini_set('display_errors', 1);
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../../../Model/database.php';
    include_once '../../../Model/employees.php';

    $database = new Database();
    $db = $database->getConnection();
    $item = new Employee($db);

    $item->username = isset($_GET['username']) ? $_GET['username'] : die();

    if ($item->deleteEmployee()) {
        echo json_encode(array("message" => "Employee deleted."));
    } else {
        echo json_encode(array("message" => "Data could not be deleted"));
    }
?>
