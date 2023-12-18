<?php
// Подключение к MongoDB
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");

// Выбор базы данных
$database = $mongoClient->admin;

// Выбор коллекции задач
$collection = $database->tasks;
?>