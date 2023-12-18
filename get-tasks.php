
<?php
include './db.php';

$tasks = $collection->find()->toArray();
// Выводите результат для отладки
var_dump($tasks);

// Отправить JSON-ответ с задачами
header('Content-Type: application/json');
echo json_encode($tasks);
?>
