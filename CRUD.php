<?php

$conn = new mysqli("localhost", "root", "", "Mozik");

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

$action = "";
if (isset($_GET["action"])) {
    $action = $_GET["action"];
}


if ($action == "get") {

    $sql = "SELECT * FROM mozi_txt";
    $result = $conn->query($sql);

    $adatok = array();

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $adatok[] = $row;
        }
    }

    header("Content-Type: application/json");
    echo json_encode($adatok);
    exit;
}


if ($action == "add") {

    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    if (!$data) {
        echo "NINCS ADAT";
        exit;
    }

    $nev = $conn->real_escape_string($data["nev"]);
    $varos = $conn->real_escape_string($data["varos"]);
    $ferohely = intval($data["ferohely"]);

    $sql = "INSERT INTO mozi_txt (nev, varos, ferohely)
            VALUES ('$nev', '$varos', $ferohely)";

    if ($conn->query($sql)) {
        echo "OK";
    } else {
        echo "HIBA: " . $conn->error;
    }

    exit;
}


if ($action == "delete") {

    if (!isset($_GET["id"])) {
        echo "NINCS ID";
        exit;
    }

    $id = intval($_GET["id"]);

    $sql = "DELETE FROM mozi_txt WHERE id=$id";

    if ($conn->query($sql)) {
        echo "OK";
    } else {
        echo "HIBA: " . $conn->error;
    }

    exit;
}


// ✏️ UPDATE
if ($action == "update") {

    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    if (!$data) {
        echo "NINCS ADAT";
        exit;
    }

    $id = intval($data["id"]);
    $nev = $conn->real_escape_string($data["nev"]);
    $varos = $conn->real_escape_string($data["varos"]);
    $ferohely = intval($data["ferohely"]);

    $sql = "UPDATE mozi_txt 
            SET nev='$nev', varos='$varos', ferohely=$ferohely
            WHERE id=$id";

    if ($conn->query($sql)) {
        echo "OK";
    } else {
        echo "HIBA: " . $conn->error;
    }

    exit;
}

?>