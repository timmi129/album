<?php
/**
 * Created by PhpStorm.
 * User: Timur Vasilev
 * Date: 22.05.2018
 * Time: 8:29
 */

class db
{
    private static function connect()
    {
        $host = '127.0.0.1';
        $db = 'album';
        $user = 'root';
        $pass = '';
        $charset = 'utf8';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $opt = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];


        return $pdo = new PDO($dsn, $user, $pass, $opt);
    }


    public static function select(string $sql, array $params=null)
    {
        $pdo = self::connect();
        $stmt = $pdo->prepare($sql);
         $stmt->execute($params);
         $data=$stmt->fetchAll();
        $stmt=null;
        $pdo=null;
        return $data;
    }


}