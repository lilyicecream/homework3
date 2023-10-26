<?php

    //Catches any errors
    error_reporting(E_ALL); 
    ini_set('display_errors', 1);
    class Employee{

        private $db;

        // Table
        private $db_table = "users";
        

        // Columns
        public $username;
        public $password;

        public $result;

        // Initializes the input database to the variable $db
        public function __construct($db){
            $this->db = $db;
        }

        // GET ALL
        public function getEmployees(){
            $sqlQuery = "SELECT username, password FROM " . $this->db_table . "";
            $this->result = $this->db->query($sqlQuery);
            return $this->result;
        }

        // CREATE
        public function createEmployee(){
            // Sanitize input
            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = htmlspecialchars(strip_tags($this->password));

            // Hash the password
            $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

            // Prepare the SQL statement
            $sqlQuery = "INSERT INTO " . $this->db_table . " SET 
                            username = ?,
                            password = ?";

            $stmt = $this->db->prepare($sqlQuery);

            // Bind parameters
            $stmt->bind_param("ss", $this->username, $hashedPassword);

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