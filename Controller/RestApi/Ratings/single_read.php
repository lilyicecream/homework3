<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../../Model/database.php';
    include_once '../../../Model/ratings.php';

    $database = new Database();
    $db = $database->getConnection();
    $item = new Ratings($db);
    $item->username = isset($_GET['username']) ? $_GET['username'] : die();
    $item->getSingleEmployee();

    if($item->username != null){
        
        // create array
        $emp_arr = array(
            "id" => $item->id,
            "username" => $item->username,
        );

        http_response_code(200);
        echo json_encode($emp_arr);
    }
    else{
        http_response_code(404);
        echo json_encode("User not found.");
    }
?>