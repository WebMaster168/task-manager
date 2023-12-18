<?php
include './db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = json_decode($_POST['task'], true);
    $collection->insertOne($task);
}
?>