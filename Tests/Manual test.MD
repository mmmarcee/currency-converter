Найденные баги ручным тестированнием:
1. При попытке открыть сайты из файла html 
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=notifications" />


  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

В 1 ссылке при нажатии открывается firefox при открытии появляется код CSS (как я понял это материалы по типу графиков)

Во 2 ссылке (сам сайт https://fonts.googleapis.com) показывает что такого нету и при использовании девтулс ничего невидно в консоли и вообще в коде и ошибка 404 
Вывод: проблема с запросом сервера и нужного ресурса или проблема с URL не распознан

В 3 ссылке (сам сайт https://fonts.googleapis.com) показывает что такого нету и при использовании девтулс ничего невидно в консоли и вообще в коде и ошибка 404 
Вывод: проблема с запросом сервера и нужного ресурса или проблема с URL не распознан

В 4 ссылке (https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap) просто показывает весь код CSS.