'use strict'

ymaps.ready(function () {
    var
        xSize = 45,
        ySize = 42;
    var myMap = new ymaps.Map('map', {
            center: [34.869497, -111.760186],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Метка'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'https://bumper-stickers.ru/27241-thickbox_default/metka-dlja-karty-navigacii-so-znakom-plusa.jpg',
            iconImageSize: [xSize, ySize],
            iconImageOffset: [-xSize / 2, -ySize]
        });

    myMap.geoObjects
        .add(myPlacemark);
});