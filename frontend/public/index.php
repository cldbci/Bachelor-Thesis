<?php

require_once __DIR__.'\..\vendor\autoload.php';
use app\core\Application;


$app = new Application(dirname(__DIR__));

$app->router->get('/', 'home.php');
$app->router->get('/county-stats', 'county-statistics.php');

$app->run();