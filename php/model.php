<?php
/**
 * Created by PhpStorm.
 * User: Timur Vasilev
 * Date: 22.05.2018
 * Time: 8:32
 */
require_once('db.php');

class model
{
    public static function getInfo($where='',$limit='',$params=[]){

       return db::select('SELECT  url_image,meta FROM album '.$where.' ORDER BY date ASC '.$limit,$params);
    }


    public static function getMetaNames(){

        return db::select('SELECT  * FROM meta_name ');
    }

    public static function getColumns($where='',$params=[])
    {
        return db::select('SELECT count(*) as total FROM album '.$where,$params)[0]['total'];

    }


    public static function getSettingsDate()
    {
        return db::select('SELECT MAX(date) as max_date,MIN(date) as min_date FROM album WHERE date is NOT NULL ')[0];

    }
}