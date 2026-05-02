<?php

$conn = new mysqli("localhost", "admin10", "admin10jelszo", "admin10");

if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

$action = "";
if (isset($_GET["action"])) {
    $action = $_GET["action"];
}


if ($action == "get") {

    $sql = "SELECT * FROM eloadas_txt";
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

    $filmid = intval($data["filmid"]);
    $moziid = intval($data["moziid"]);
    $datum = $conn->real_escape_string($data["datum"]);
    $nezoszam = intval($data["nezoszam"]);
    $bevetel = intval($data["bevetel"]);

    $sql = "INSERT INTO eloadas_txt (filmid, moziid, datum, nezoszam, bevetel)
            VALUES ($filmid, $moziid, '$datum', $nezoszam, $bevetel)";

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

    $sql = "DELETE FROM eloadas_txt WHERE id=$id";

    if ($conn->query($sql)) {
        echo "OK";
    } else {
        echo "HIBA: " . $conn->error;
    }

    exit;
}


if ($action == "update") {

    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    if (!$data) {
        echo "NINCS ADAT";
        exit;
    }

    $id = intval($data["id"]);
    $filmid = intval($data["filmid"]);
    $moziid = intval($data["moziid"]);
    $datum = $conn->real_escape_string($data["datum"]);
    $nezoszam = intval($data["nezoszam"]);
    $bevetel = intval($data["bevetel"]);

    $sql = "UPDATE eloadas_txt 
            SET filmid=$filmid, moziid=$moziid, datum='$datum', nezoszam=$nezoszam, bevetel=$bevetel
            WHERE id=$id";

    if ($conn->query($sql)) {
        echo "OK";
    } else {
        echo "HIBA: " . $conn->error;
    }

    exit;
}

?>