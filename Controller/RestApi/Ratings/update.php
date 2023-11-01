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
    $data = json_decode(file_get_contents("php://input"));

    $item->id = $data->id;
    $item->username = $data->username;
    $item->artist = $data->artist;
    $item->song = $data->song;
    $item->rating = $data->rating;

    if($item->updateRating()){
        echo json_encode("Rating updated.");
    } else{
        echo json_encode("Data could not be updated");
    }
?>