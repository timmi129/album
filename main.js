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

var current_id = 0;

function right_arrow() {
    getNewCurrent();
}

function left_arrow() {
    getNewCurrent(true);
}


function getNewCurrent(typeLeft) {
    var stopFlag = false;

    var newCurrentId = undefined;
    for (key in mas) {

        if (key == current_id) {
            stopFlag = true;
        } else {
            newCurrentId=key;
            if (stopFlag) {
                setCurrentImg(newCurrentId); //уходим на правый слайд
                return false;
            }
        }

        if (stopFlag && typeLeft) {

            setCurrentImg(newCurrentId!=undefined?newCurrentId:getLastElementArray()); //уходим на левый слайд
            return false;
        }
    }
    setCurrentImg(getFirstElementArray());  // необходимо для перехода на первый слайд, если был самый правый слайд

}


function getFirstElementArray() {
    for (key in mas) {
        return key;
    }
}
function getLastElementArray() {
    var keyItem;
    for (key in Array.prototype.reverse.call(mas)) {
        keyItem=key;
    }
    return keyItem;
}

function close_big_img() {
    document.getElementById("big_img").style.display = "none"
}


function setCurrentImg(id) {
    current_id = id;
    $('#big_img').find('.img_zoom').attr('src', mas[id].src);
    $('#big_img').find('.text_info').html( mas[id].text);
}

function click_img(id) {
    setCurrentImg(id);
    document.getElementById("big_img").style.display = "block"

}


$('.info_pict').mouseenter(function () {

    $('.text_info').show();
    $('.info_pict').removeClass('shake');
    $(this).mouseleave(function () {
        $('.text_info').hide();
        $('.info_pict').addClass('shake');
    });
});