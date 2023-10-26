<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../../Model/database.php';
include_once '../../../Model/employees.php';

$database = new Database();
$db = $database->getConnection();
$items = new Employee($db);
$records = $items->getEmployees();
$itemCount = $records->num_rows;

if ($itemCount > 0) {
    $employeeArr = array();
    $employeeArr["itemCount"] = $itemCount;
    $employeeArr["body"] = array();

    while ($row = $records->fetch_assoc()) {
        array_push($employeeArr["body"], $row);
    }

    echo json_encode($employeeArr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No record found.")
    );
}
?>
