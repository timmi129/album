<?php
require_once('model.php');
header('Content-Type: application/json');

//function getRequestParams(){
//    $queryString = $_SERVER['QUERY_STRING'];
//
//    if (strtoupper($_SERVER['REQUEST_METHOD']) == 'POST') {
//
//        $request = file_get_contents('php://input');
//        $actionParams = json_decode($request, true);
//        // $this->isPostRequest = true;
//    } else
//        parse_str($queryString, $actionParams);
//
//    return $actionParams;
//}
function getArrayFromXML($str)
{
    return simplexml_load_string("<?xml version='1.0'?> 
<document>" . $str . "</document>");
}


function getList()
{


    $returnArray = [];
    $limit = '';
    if (isset($_POST['page']) && isset($_POST['page_count'])) {
        $num = $_POST['page_count'] * $_POST['page'] - $_POST['page_count'];
        $limit = " LIMIT " . $num . ", " . $_POST['page_count'];
    }else{

        $limit = " LIMIT 0,2";
    }
    $sql='WHERE ((date>=:min_date OR :min_date1 IS NULL) 
                                  AND (date<=:max_date OR :max_date1 IS NULL) OR date IS NULL)';


    $paramsArray= [
        'min_date'=>!empty($_POST['min_date'])?$_POST['min_date']:null,
        'min_date1'=>!empty($_POST['min_date'])?$_POST['min_date']:null,
        'max_date'=>!empty($_POST['max_date'])?$_POST['max_date']:null,
        'max_date1'=>!empty($_POST['max_date'])?$_POST['max_date']:null,
    ];

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

