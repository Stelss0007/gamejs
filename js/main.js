(function($) {
"use strict";
//Количество барабанов
var slotsCount = 5;
//Минимальное количество совпадений, для того чтобы защитать выиграш
var slotsMinEquals = 3;
//Количество элементов в слоте барабана (например от 0 до 6 или от 0 до 10)
var slotItemsCount = 6;
//Высота элемента слота (высота слота)
var elementHeight = 110;//55;
//Переменная с результатами для слотов
var slots = [];

//Флаг окончания игры, все слоты остановились = 1
var finishedSlotFlag = 0;

//Звуки
var sndStart = new Audio(),
    sndStop = new Audio(),
    sndIntro = new Audio(),
    sndBackground = new Audio(),
    sndWinMoney = new Audio(),
    sndWin = new Audio(),
    sndLose = new Audio()
    ;
    
//Пути до звуков    
    sndIntro.src = 'sound/intro-1.mp3';
    sndIntro.loop = true;
    sndStart.src = 'sound/start-1.mp3';
    sndStop.src = 'sound/stop-1.mp3';
    sndWin.src = 'sound/win-1.mp3';
    sndWinMoney.src = 'sound/win-money-1.mp3';
    sndLose.src = 'sound/lose-1.mp3';
    sndBackground.src = 'sound/bg-sound.mp3';
    sndBackground.loop = true;
    
//sndIntro.play();

//Функция запуска игры.
window.StartGame = function() {
    if ($('#sturt-button').hasClass("disabled")) {
        return;
    }
    
    $('#sturt-button').addClass("disabled");
    
    sndIntro.pause()
    sndStart.play();
    sndBackground.play();
    
    finishedSlotFlag = 0;
    
    for(var i=0; i<slotsCount; i++){
        slots[i] = getRandomInt(1, slotItemsCount);
    } 
    
//    console.log(slots);
   
    //Запускаются слоты, для эфекта барабаны крутятся несколько раз (разные барабаны, разное количество раз прокручиваются)
    //при последнем прокруте передается результат и замедляется скорость
    startSlot('.digit1');
    startSlot('.digit1');
    startSlot('.digit1', slots[0], 300);
    startSlot('.digit2');
    startSlot('.digit2');
    startSlot('.digit2');
    startSlot('.digit2');
    startSlot('.digit2', slots[1], 200);
    startSlot('.digit3');
    startSlot('.digit3', slots[2], 200);
    startSlot('.digit4');
    startSlot('.digit4');
    startSlot('.digit4');
    startSlot('.digit4');
    startSlot('.digit4', slots[3], 300);
    startSlot('.digit5');
    startSlot('.digit5');
    startSlot('.digit5');
    startSlot('.digit5', slots[4], 150);
    
    
    //sndStop.play();
    //sndBackground.pause();
};

//Получаем рандомное значение
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Проверка результата игры (Выиграл/Проиграл)
function checkGameStatus() {
    var equalsSlotsItems = [];
    
    for(var j=0; j<=slotItemsCount; j++ ) {
        equalsSlotsItems[j] = [];
    }
        
    for(var i=0; i<slotsCount; i++) {
        equalsSlotsItems[parseInt(slots[i])].push(i);
    }
    
    console.log(equalsSlotsItems); 
 
    for(var j=0; j<=slotItemsCount; j++){
        if(equalsSlotsItems[j].length >= slotsMinEquals) {
            for(var i=0; i<=equalsSlotsItems[j].length; i++) {
                $('.digit'+(equalsSlotsItems[j][i]+1)).addClass('higlight');
            }
            alert('win');
            return 1;
        }
    }
    
    return 0;
}

//Функция завершения игры, все слоты установлены, проверка результата
function finishedGame() {
    sndBackground.pause();
    
    var winner = checkGameStatus();
    
    //if winner
    if(!winner){
        sndLose.play();
    } else {
        sndWin.play();
        sndWinMoney.play();
        
        setInterval(function(){
            $(".higlight").toggleClass("higlight-bg");
        },100);
    }
    
    setTimeout(function(){
        $('.higlight').removeClass('higlight');
        $("#sturt-button").removeClass("disabled");
    }, 3000);

    //sndIntro.play();
}

//Функция после остановки слота
function finishedSlot() {
    finishedSlotFlag++;
    sndStop.play();
}

//Функция запуска слота барабана, эфект кручения слота
function startSlot(el, value, interval) {
    var timerVar = 0;
    var itemNumber = 0;
    
    var elementCount = value ? value : slotItemsCount;

    var interval = (interval) ? interval :  60;

    var maxTop = elementCount * elementHeight;

    var $element = $(el);


    $element.css({"background-position-y": '-'+(elementHeight)+'px'});
    
    for(var i = 1; i<=elementCount; i++ ) {
        $element.animate({
                "background-position-y": '-'+(i*elementHeight)+'px'
        }, interval, function(){
            if(value) {
                timerVar++;
                if(timerVar == value) {
                     finishedSlot();
                     
                     if(finishedSlotFlag == slotsCount) {
                         finishedGame();
                     }
                }
            }
            
        });
    }
 
}


})(jQuery);


