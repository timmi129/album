var mas = {
    11: {
        src: "http://fotorelax.ru/wp-content/uploads/2016/02/Beautiful-photos-and-pictures-on-different-topics-01.jpg",
        text: 124
    },
    22: {
        src: "https://js.cx/gallery/img3-lg.jpg",
        text: 555252
    },
    33: {
        src: "https://js.cx/gallery/img4-lg.jpg",
        text: 647575
    },
    44: {
        src: "https://js.cx/gallery/img5-lg.jpg",
        text: 125613262364
    }


};
var min_date = null;
var max_date = null;
var page_numb = 9;
var pagination_pages = 0;
var loader_flag = false;

function getSearch() {
    getList(
        {
            page: 1,
            page_count: page_numb


        }, true);
}


/* Альбом */
var current_id = 0;
var scale = 1;
var translateX = 0;
var translateY = 0;


function right_arrow() {
    getNewCurrent();
}

function left_arrow() {
    getNewCurrent(true);
}


function getNewCurrent(typeLeft) { // Получение id картинки при переходе направо/налево
    restartImg();

    var stopFlag = false;

    var newCurrentId = undefined;
    for (key in mas) {

        if (key == current_id) {
            stopFlag = true;
        } else {
            newCurrentId = key;
            if (stopFlag) {
                setCurrentImg(newCurrentId); //уходим на правый слайд
                return false;
            }
        }

        if (stopFlag && typeLeft) {

            setCurrentImg(newCurrentId != undefined ? newCurrentId : getLastElementArray()); //уходим на левый слайд
            return false;
        }
    }
    setCurrentImg(getFirstElementArray());  // необходимо для перехода на первый слайд, если был самый правый слайд

}


function getFirstElementArray() { //получение первого элемента массива
    for (key in mas) {
        return key;
    }
}

function getLastElementArray() { //получение последнего элемента массива
    var keyItem;
    for (key in mas) {
        keyItem = key;
    }
    return keyItem;
}

function close_big_img() { //закрытие просмотра фотографий

    document.getElementById("big_img").style.display = "none";
    restartImg();
}

function restartImg() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    transformImg(1, 0, 0);
}

function setCurrentImg(id) { //замена текущей картинки в альбоме
    current_id = id;
    $('#big_img').find('.img_zoom').attr('src', mas[id].src);
    $('#big_img').find('.text_info').html(mas[id].text);
}

function click_img(id) {
    setCurrentImg(id);
    document.getElementById("big_img").style.display = "block";

}


$('.info_pict').mouseenter(function () { // отображение информации о изображении

    $('.text_info').show();
    $('.info_pict').removeClass('shake');
    $(this).mouseleave(function () {
        $('.text_info').hide();
        $('.info_pict').addClass('shake');
    });
});


function loop_plus() { //уменьшение изображения
    if (scale > 5.5)
        return false;


    scale = scale + 0.5;
    transformImg(scale, translateX, translateY);
}


function loop_minus() {//увеличение изображения
    if (scale < 0.05)
        return false;

    if (scale > 0.5)
        scale = scale - 0.5;
    else
        scale = scale - 0.01;

    transformImg(scale, translateX, translateY);

}

function transformImg(scale, translateX, translateY) {
    document.getElementById('img_zoom').style.transform = 'scale(' + scale + ') translate(' + translateX + 'px,' + translateY + 'px)'; // зум и передвижение изображения
}


var img_zoom = document.getElementById('img_zoom');
img_zoom.ondragstart = function () {
    return false;
};
img_zoom.onmousedown = function (e) {
    if (event.which != 1)
        return false;

    transformImg(scale, translateX, translateY);

    var shiftX = e.pageX;
    var shiftY = e.pageY;


    function moveAt(e) {
        translateX = e.pageX - shiftX;
        translateY = e.pageY - shiftY;
        transformImg(scale, translateX, translateY);
    }

    document.onmousemove = function (e) {
        moveAt(e);
    };

    function returnStartPosition() {
        translateX = 0;
        translateY = 0;
        transformImg(scale, translateX, translateY);
    }

    img_zoom.onmouseup = function () {

        document.onmousemove = null;
        img_zoom.onmouseup = null;
        returnStartPosition();
    };

    img_zoom.onmouseleave = function () {

        document.onmousemove = null;
        img_zoom.onmouseup = null;
        returnStartPosition();
    }
};

/* Альбом */


/*Пагинация*/


function getList(send, generatePagination) { //запрос на бэк
    $.ajax({
        type: "POST",
        url: "/php/request.php/",
        data: $.extend(send, {
            min_date: min_date,
            max_date: max_date, meta: $("form").serializeArray()
        }),
        beforeSend: function () {
            $(".meta_name").next(".checkbox_cont").hide();
            $('body').addClass('loading');

        },
        success: function (data) {
            $('.album_container').empty();
            if(data['total']<=0){

                $('.album_container').append("<span class=\"error\">К сожалению, ничего не найдено:(</span>");
                setTimeout(function () {
                    $('body').removeClass('loading');
                }, 1000);
                return false;
            }
            var html = '';



            if (data.length <= 0) {
                html = '<p class=\'register_error\'>По вашему запросу ничего не найдено</p>'
                $('.pagination_container').empty();
                return false
            }
            mas = data['list'];

            html = '<ul class="album_items">\n';
            $(mas).each(function (i, elem) {

                html += '            <li class="album_item">\n' +
                    '                <div class="image_cont ">\n' +
                    '                    <img src="' + elem['src'] + '"\n' +
                    '                         alt="" class="img_item" onclick="click_img(' + i + ')">\n' +
                    '                </div>\n' +
                    '\n' +
                    '                <div class="info_container">\n' +
                    '                   ' + elem['text'] + '\n' +
                    '                </div>\n' +
                    '            </li>\n';

            });
            html += '        </ul>';
            $('.album_container').append(html);

            if (generatePagination && data['total']) pagination(data['total']);

            setTimeout(function () {
                $('body').removeClass('loading');
            }, 1000);

        }
    });

}


function pagination(num) { //построение пагинации
    $('.pagination_container').empty();

    if (num == 0) {
        return false;
    }

    pagination_pages = Math.ceil(num / page_numb);
    var pagination_buttons = '';
    var max = pagination_pages < 10 ? pagination_pages : 10;
    if (max != 1) {
        for (var i = 1; i <= max; i++) {
            if (i == 1)
                pagination_buttons += '<span class=" pagination_number active">' + i + '</span>';
            else
                pagination_buttons += '<span class="pagination_number ">' + i + '</span>';
        }

        if (pagination_pages <= 10)
            pagination_buttons += '<span class="pagination_help_button pagination_next">' + '>';
        else
            pagination_buttons += '<span class="pagination_help_button pagination_next">' + '>' + '</span>' + '<span class="pagination_help_button pagination_last">' + '>>' + '</span>';

        $('.pagination_container').append(pagination_buttons);
        pagination_click(pagination_pages, max);

    }

}

function pagination_click(pagination_pages, max) {//обработка кликов

    $('#pagination_next').click(function () {
        parseInt($('.pagination_number.active').html());
    });

    $('.pagination_number').click(function () {
        if (loader_flag)
            return false;

        $('.pagination_number').removeClass("active");
        $(this).addClass("active");

        getList({
            page: $(this).html(),
            page_count: page_numb

        });

        $('.pagination_container').empty();
        var pagination_buttons = '';

        if (parseInt($(this).html()) <= 5) {
            if (parseInt($(this).html()) != 1)
                pagination_buttons += '<span class="pagination_help_button pagination_back">' + '<' + '</span>';


            pagination_buttons += generatePagination(1, max, parseInt($(this).html()), parseInt($(this).html()));

            if (pagination_pages <= 10)
                pagination_buttons += '<span class="pagination_help_button pagination_next">' + '>';
            else
                pagination_buttons += '<span class="pagination_help_button pagination_next">' + '>' + '</span>' + '<span class="pagination_help_button pagination_last">' + '>>' + '</span>';


        } else if (parseInt($(this).html()) > pagination_pages - 5) {
            //  pagination_buttons +='<span class="pagination_help_button pagination_to_first">' + '<<' + '</span>' +  '<span class="pagination_help_button pagination_back">' + '<' + '</span>';
            if (pagination_pages <= 10) {
                var min = 1
                pagination_buttons += '<span class="pagination_help_button pagination_back">' + '<' + '</span>';

            }
            else {
                var min = pagination_pages - 10
                pagination_buttons += '<span class="pagination_help_button pagination_to_first">' + '<<' + '</span>' + '<span class="pagination_help_button pagination_back">' + '<' + '</span>';

            }

            pagination_buttons += generatePagination(min, pagination_pages, parseInt($(this).html()), pagination_buttons);

            if (parseInt($(this).html()) != pagination_pages)
                pagination_buttons += '<span class="pagination_help_button pagination_next">' + '>';


        } else {


            pagination_buttons += '<span class="pagination_help_button pagination_to_first">' + '<<' + '</span>' + '<span class="pagination_help_button pagination_back">' + '<' + '</span>';

            pagination_buttons += generatePagination(parseInt($(this).html()) - 4, parseInt($(this).html()) + 5, parseInt($(this).html()), pagination_buttons);

            pagination_buttons += '<span class="pagination_help_button pagination_next">' + '>' + '</span>' + '<span class="pagination_help_button pagination_last">' + '>>' + '</span>';

        }

        $('.pagination_container').append(pagination_buttons);
        pagination_click(pagination_pages, max);
        pagination_button_help_click(pagination_pages);

    });
}

function generatePagination(min, max, numFlag) { //общее построение
    var str = '';

    for (var i = min; i <= max; i++) {

        if (i == numFlag)
            str += '<span class="pagination_number active">' + i + '</span>';
        else
            str += '<span class="pagination_number ">' + i + '</span>';

    }

    return str;
}

function pagination_button_help_click(pagination_pages) {//клики на << <  > >>

    $('.pagination_back').click(function () {

        if (loader_flag)
            return false;

        $('.pagination_number.active').prev().click();
    });
    $('.pagination_next').click(function () {

        if (loader_flag)
            return false;

        $('.pagination_number.active').next().click();

    });

    $('.pagination_to_first').click(function () {

        if (loader_flag)
            return false;

        $('.pagination_number.active').prev().html(1);
        $('.pagination_number.active').prev().click();


    });
    $('.pagination_last').click(function () {

        if (loader_flag)
            return false;

        $('.pagination_number.active').next().html(pagination_pages);
        $('.pagination_number.active').next().click();
    });
}

$(document).ready(function () {

    /*Пагинация*/


    /*Настройки для фильтра*/

    $.ajax({ // подтягиваем настройки поиска
        type: "POST",
        url: "/php/request.php/",
        data: {request_type: "settings"},
        beforeSend: function () {


        },
        success: function (data) {
            // console.log(Date.parse(dt_to))
            init_Range(data['date']['min'], data['date']['max']);

            var html = '<form>';
            $(data['meta']).each(function (i, meta) {

                html += ' <div  class="meta_container">\n' +
                    '                    <p class="meta_name">' + meta['name'] + ':</p>\n    <div class="checkbox_cont">';


                $(meta['list']).each(function (key, meta_list) {

                    html += '<div class="checkbox_item checkbox">' +
                        '<input type="checkbox" id="' + meta['meta'] + '_' + key + '" class="checkbox__input"  value="' + meta_list + '">' +
                        ' <label class="checkbox__label" for="' + meta['meta'] + '_' + key + '">' + meta_list + '</label>' +
                        '  </div>';


                });


                html += '</div><input  type="hidden" class="help_input" name="' + meta['meta'] + '" value="">\n</div>';
            });
            html += '</form>';

            $('.meta_items').append(html);
            metaInit();


            getList({page: 1, page_count: page_numb}, true);

        }
    });


    function metaInit() {


        $(".meta_name").next(".checkbox_cont").hide();


        $(".meta_name").click(function () {


            if($(this).next(".checkbox_cont").css('display')=='none'){
                $(".meta_name").next(".checkbox_cont").hide();
                $(this).next(".checkbox_cont").toggle()
            }else{

                $(".meta_name").next(".checkbox_cont").hide();

            }


        });




        $(' :checkbox').change(function () {
            // console.log($(this));
            var help_input = $(this).parents('.meta_container').find('.help_input');
            var str = $(this).val();
            console.log();
            if (this.checked) {
                help_input.val(help_input.val() + str + ',');

            } else {

                help_input.val(help_input.val().replace(str + ',', ''));
            }
        });
    }

//

    function init_Range(dt_from, dt_to) { // запускаем слайдер
        //console.log(dt_from);
        $('.slider-time').html(formatDT(new Date(dt_from * 1000)));
        $('.slider-time2').html(formatDT(new Date(dt_to * 1000)));
        var min_val = parseInt(dt_from); //Date.parse(dt_from)/1000;
        var max_val = parseInt(dt_to);//Date.parse(dt_to)/1000;
//console.log(min_val);
        function zeroPad(num, places) {
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        }

        function formatDT(__dt) {

            var year = __dt.getFullYear();
            var month = zeroPad(__dt.getMonth() + 1, 2);
            var date = zeroPad(__dt.getDate(), 2);
            var hours = zeroPad(__dt.getHours(), 2);
            var minutes = zeroPad(__dt.getMinutes(), 2);
            var seconds = zeroPad(__dt.getSeconds(), 2);
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
        };

        min_date = min_val;
        max_date = max_val;
        $("#slider-range").slider({
            range: true,
            min: min_val,
            max: max_val,
            step: 10,
            values: [min_val, max_val],
            slide: function (e, ui) {
                min_date = ui.values[0];
                max_date = ui.values[1];
                var dt_cur_from = new Date(ui.values[0] * 1000); //.format("yyyy-mm-dd hh:ii:ss");
                $('.slider-time').html(formatDT(dt_cur_from));

                var dt_cur_to = new Date(ui.values[1] * 1000); //.format("yyyy-mm-dd hh:ii:ss");
                $('.slider-time2').html(formatDT(dt_cur_to));
            }
        });
    }


    /*Настройки для фильтра*/


});
