<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<?php include "config.php"; ?>
<?php
/*
// Ejemplo de uso de dependencias
require 'vendor/autoload.php';

$log = new Monolog\Logger('my-log');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));
$log->addWarning('some log message');
*/
?>
<!doctype html>
<html>
<head></head>
<body>
<h1>Testing connection to CF API</h1>
<?=$cf_url_api; ?>
<h2>Test 1: Ping</h2>
<?php
//Testing connection
function pingDomain($domain){
    $starttime = microtime(true);
    $file      = fsockopen ($domain, 80, $errno, $errstr, 10);
    $stoptime  = microtime(true);
    $status    = 0;

    if (!$file) $status = -1;  // Site is down
    else {
        fclose($file);
        $status = ($stoptime - $starttime) * 1000;
        $status = floor($status);
    }
    return $status;
}

echo pingDomain($cf_url_api);
?>
<h2>Test 2: file_get_contents</h2>
<h3>Test 2.1: file_get_contents with CF API</h2>
<?php
echo file_get_contents($cf_url_api);
?>
<h3>Test 2.2: file_get_contents with Google</h2>
<?php
$google_url = "http://google.com";
echo $google_url;
$html = htmlspecialchars(file_get_contents('http://google.com'), ENT_QUOTES);
echo "<pre><code>" . $html . "</code></pre>";
?>
<?php
/*
<p>View log file <a href="app.log">here</a>.</p>
*/
?>
</body>
</html>