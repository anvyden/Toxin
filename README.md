# MetaLamp 2 education task - Hotel website Toxin

Практика верстки сайта по поиску номеров отеля.

## Особенности проекта

- Был применен компонентный подход, который заключается в разделении элементов на независимые блоки, а именно методология [БЭМ](https://ru.bem.info/methodology/quick-start/)
- Для реализации компонентного подхода использовались такие технологии, как шаблонизатор [Pug(Jade)](https://gist.github.com/neretin-trike/53aff5afb76153f050c958b82abd9228), препроцессор [SCSS](https://sass-scss.ru) и сборщик проектов [Webpack](https://webpack.js.org).
- В проекте был Использован шрифт [Montserrat](https://fonts.google.com/specimen/Montserrat). Все шрифты подключены локально в форматах: _woff2_, _woff_, _ttf_, _eot_ и _svg_. Также некоторые элементы дизайна выполнены иконочными шрифтами [Material Icons](https://google.github.io/material-design-icons/) и [Font Awesome 6](https://fontawesome.com)
- Для адаптации сайта под разрешения экрана от 320px до 1980px был применен responsive подход
- Для преобразования кода ES6 в более старую версию JavaScript был использован [Babel](https://babeljs.io), а для соблюдения кроссбраузерности и компактности CSS был использован [PostCSS](https://postcss.org)
- Для соблюдения единобразия и чистоты кода был использован [стайлгайд от AirBnB](https://github.com/airbnb/javascript), который проверялся линтером [eslint](https://eslint.org/)
- В проекте было выполнено требование PixelPerfect
- Разработка велась под последние версии Chrome и Firefox (last 3 version)

В проекте выполнен _Ui Kit_, который состоит из четырех отдельных страниц:

- [**Colors & Types**](https://anvyden.github.io/Toxin/colors-type.html)
- [**Headers & Footers**](https://anvyden.github.io/Toxin/headers-footers.html)
- [**Form & Elements**](https://anvyden.github.io/Toxin/form-elements.html)
- [**Cards**](https://anvyden.github.io/Toxin/cards.html)

Также выполнен сайт, состоящий из 5 страниц:

- [**Landing page**](https://anvyden.github.io/Toxin/landing-page.html)
- [**Sign in**](https://anvyden.github.io/Toxin/sign-in.html)
- [**Registration**](https://anvyden.github.io/Toxin/registration.html)
- [**Search room**](https://anvyden.github.io/Toxin/search-room.html)
- [**Room details**](https://anvyden.github.io/Toxin/room-details.html)

## Развертывание проекта

**Clone repository:**

```bash
  git clone https://github.com/anvyden/Toxin.git
```

`npm install` - **installing dependencies**

**Development server:**

`npm start` - **start the project on the server localhost:8081**

**Development and production project:**

`npm run dev` - **start the project in development mode**

`npm run prod` - **start the project in production mode**

## Сторонние библиотеки

В проекте использовались следующие сторонние JavaScript библиотеки:

- [**Air Datepicker**](https://air-datepicker.com/ru) (version 3.1.1)
- [**Inputmask**](https://github.com/RobinHerbots/Inputmask) (version 5.0.7)
- [**jQuery**](https://jquery.com) (version 3.6.0)
- [**NoUISlider**](https://github.com/leongersen/noUiSlider) (version 15.5.0)
- [**WNumb**](https://refreshless.com/wnumb/) (version 1.2.0)
- [**Swiper**](https://swiperjs.com/) (version 8.0.6)