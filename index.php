<?php
// ============================================
// CORS CONFIGURATION
// ============================================
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================================
// CakePHP Bootstrap
// ============================================
define('ROOT', dirname(__DIR__));
define('APP_DIR', 'src');
define('APP', ROOT . DS . APP_DIR . DS);
define('CONFIG', ROOT . DS . 'config' . DS);
define('WWW_ROOT', ROOT . DS . 'webroot' . DS);
define('LOGS', ROOT . DS . 'logs' . DS);
define('TMP', ROOT . DS . 'tmp' . DS);
define('CACHE', TMP . 'cache' . DS);

require ROOT . '/vendor/autoload.php';

$app = new App\Application(CONFIG);
$server = new Cake\Http\Server($app);
$server->emit($server->run());