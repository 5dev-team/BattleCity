<h1 align="center">Учебный проект</h1>
<image src="./packages/client/src/assets/battleCityLogo.png" alt="Logo game">

<br>
<div align="center">
    <img src="https://img.shields.io/badge/Year-2022-red">
    <img src="https://img.shields.io/badge/Open Source-lightgray">
    <img src="https://img.shields.io/badge/PRs-welcom-red">
</div>
<div align="center">
    <img src="https://img.shields.io/badge/Type Script-success">
    <img src="https://img.shields.io/badge/Java Script-success">
    <img src="https://img.shields.io/badge/HTML-success">
    <img src="https://img.shields.io/badge/SCSS-success">
    <img src="https://img.shields.io/badge/React-success">
    <img src="https://img.shields.io/badge/Redux-success">
</div>
<br>

<h2 align="center">Описание</h2>
<p align="center">Battle City — компьютерная игра. В России и странах СНГ выпускалась на пиратских картриджах как в оригинальном виде, так и в модификации Tank 1990, и известна под неофициальным названием «Та́нчики». Её предшественником была аркадная игра Tank Battalion, выпущенная фирмой Namco в 1980 году. Полигон действий виден сверху. Игрок должен, управляя своим танком, уничтожить все вражеские танки на уровне, которые постепенно появляются вверху игрового поля. Враги пытаются уничтожить штаб игрока (внизу игрового поля в виде орла) и его танк. На каждом уровне нужно уничтожить танки противника разных видов. Если противник (или игрок) сможет разрушить штаб или лишит игрока всех жизней — игра окончена.</p>
<h2 align="center">В проекте используются</h2>
шрифты: Google Fonts

библиотека стилей: Nes

<h2 align="center">Техническое описание</h2>

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как правильно писать коммиты?
Можно почитать в соответствующей разделе [документации](docs/README.md)


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

<h2 align="center">Проверка на утечки памяти</h2>
<br>

Фрагмент теста (короткий) - утечек не обнаружено

<image src="./packages/client/src/assets/memoryLeaksScreen/2.png" alt="image short test"/>

Фрагмент теста (длинный) через несколько дней/обновлений - утечек не обнаружено
<image src="./packages/client/src/assets/memoryLeaksScreen/1.png" alt="image long test"/>
