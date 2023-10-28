<?php

    //Catches any errors
    error_reporting(E_ALL); 
    ini_set('display_errors', 1);

    class Ratings{

        private $db;

        // Table
        private $db_table2 = "ratings";
        

        // Columns
        public $id;
        public $username;
        public $artist;
        public $song;
        public $rating;

        public $result;

        // Initializes the input database to the variable $db
        public function __construct($db){
            $this->db = $db;
        }

        // GET ALL
        public function getRatings(){
            $sqlQuery = "SELECT username, artist, song, rating FROM " . $this->db_table . "";
            $this->result = $this->db->query($sqlQuery);
            return $this->result;
        }

        // CREATE
        public function createRating(){
            // Sanitize input
            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->artist = htmlspecialchars(strip_tags($this->artist));
            $this->song = htmlspecialchars(strip_tags($this->song));
            $this->rating = (int)$this->rating; // Ensure rating is an integer

            // Prepare the SQL statement
            $sqlQuery = "INSERT INTO " . $this->db_table2 . " (username, artist, song, rating) VALUES (?, ?, ?, ?)";

            $stmt = $this->db->prepare($sqlQuery);

            // Bind parameters
            $stmt->bind_param("sssi", $this->username, $this->artist, $this->song, $this->rating);

            // Execute the statement
            if ($stmt->execute()) {
                return true;
            }

            return false;
        }



        // DELETE
        function deleteEmployee() {
            $username = $this->db->real_escape_string($this->username); // Sanitize the input
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE username = '" . $username . "'";
            $this->db->query($sqlQuery);

            if ($this->db->affected_rows > 0) {
                return true;
            }

            return false;
        }

        public function getSingleEmployee(){
            $username = $this->db->real_escape_string($this->username);  // Sanitize the input
            $sqlQuery = "SELECT id, username FROM " . $this->db_table2 . " WHERE username = '$username'";
            $record = $this->db->query($sqlQuery);
            $dataRow = $record->fetch_assoc();
            $this->id = $dataRow['id'];
            $this->username = $dataRow['username'];
        }
        


        // public function getSingleEmployee(){
        //     $sqlQuery = "SELECT id, name, email, designation, created 
        //                 FROM ". $this->db_table ." WHERE id = ".$this->id;
        //     $record = $this->db->query($sqlQuery);
        //     $dataRow=$record->fetch_assoc();
        //     $this->name = $dataRow['name'];
        //     $this->email = $dataRow['email'];
        //     $this->designation = $dataRow['designation'];
        //     $this->created = $dataRow['created'];
        // }
        
        // UPDATE
        // public function updateEmployee(){
        //     $this->name=htmlspecialchars(strip_tags($this->name));
        //     $this->email=htmlspecialchars(strip_tags($this->email));
        //     $this->designation=htmlspecialchars(strip_tags($this->designation));
        //     $this->created=htmlspecialchars(strip_tags($this->created));
        //     $this->id=htmlspecialchars(strip_tags($this->id));

        //     $sqlQuery = "UPDATE ". $this->db_table ." SET 
        //                     name = '".$this->name."',
        //                     email = '".$this->email."',
        //                     designation = '".$this->designation."',created = '".$this->created."'
        //                     WHERE id = ".$this->id;

        //     $this->db->query($sqlQuery);

        //     if($this->db->affected_rows > 0){
        //         return true;
        //     }

        //     return false;
        //     }

    }
?>