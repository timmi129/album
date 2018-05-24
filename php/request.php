<?php
require_once('model.php');
header('Content-Type: application/json');


function getArrayFromXML($str)
{
    return simplexml_load_string("<?xml version='1.0'?> 
<document>" . $str . "</document>");
}


function getList()
{


    $returnArray = [];

    if (isset($_POST['page']) && isset($_POST['page_count'])) {
        $num = intval($_POST['page_count']) * intval($_POST['page']) - intval($_POST['page_count']);
        $limit = " LIMIT " . $num . ", " . intval($_POST['page_count']);
    }else{

        $limit = " LIMIT 0,2";
    }
    $addSql='';

    $addArray=[];

    foreach ($_POST['meta'] as $metaItem){

        $firstFlag=true;

        $addSqlLittle='';

        foreach (explode(',',$metaItem['value']) as $key=>$item){

            if(!empty($item)){
                if($firstFlag){
                    $addSqlLittle.=' meta LIKE ? ';
                    $firstFlag=false;
                }else{
                    $addSqlLittle.=' OR meta LIKE ? ';
                }
                $addArray[]='%<'.$metaItem['name'].'>'.$item.'</'.$metaItem['name'].'>%';

            }
        }

        if($addSqlLittle!=''){
            $addSql.=' AND ( '.$addSqlLittle." )";
        }


    }


    $sql='WHERE ((date>=? OR ? IS NULL) 
                                  AND (date<=? OR ? IS NULL) OR date IS NULL)'.$addSql;


    $paramsArray= array_merge ([
        !empty($_POST['min_date'])?$_POST['min_date']:null,
        !empty($_POST['min_date'])?$_POST['min_date']:null,
        !empty($_POST['max_date'])?$_POST['max_date']:null,
        !empty($_POST['max_date'])?$_POST['max_date']:null,

    ],$addArray);

    $data = model::getInfo($sql, $limit,$paramsArray);

    $returnArray['total'] = model::getColumns($sql, $paramsArray);

    foreach (model::getMetaNames() as $meta) {
        $metaNames[$meta['meta']] = $meta['name'];
    }

    foreach ($data as $item) {
        $str = '';
        foreach (getArrayFromXML($item['meta']) as $key => $meta_item) {
            $str .= $metaNames[$key] . " : " . $meta_item . '<br>';
        }
        $returnArray['list'][] = [
            'src' => $item['url_image'],
            'text' => $str
        ];
    }

    return $returnArray;
}
function getSettings(){
    $date=model::getSettingsDate();
    $returnArray=[];
    $returnArray['date']['min']=$date['min_date'];
    $returnArray['date']['max']=$date['max_date'];
    $metaNames=[];
    foreach (model::getMetaNames() as $meta) {
        $metaNames[$meta['meta']] = $meta['name'];
    }
    $info=model::getMetaInfo();


    foreach ($info as $item){
        $returnArray['meta'][$item['type_meta']]['name']=$metaNames[$item['type_meta']];
        $returnArray['meta'][$item['type_meta']]['meta']=$item['type_meta'];
        $returnArray['meta'][$item['type_meta']]['list'][]=$item['info'];
    }
    $returnArray['meta']=array_values( $returnArray['meta']);
    return $returnArray;
}


$type=isset($_POST['request_type'])?$_POST['request_type']:'list';

switch ($type) {

    case 'settings':
        echo json_encode(getSettings());
        break;
    case 'list':
    default:

        echo json_encode(getList());
        die;
        break;
}

