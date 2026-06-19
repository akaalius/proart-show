// Данные тура ПРО.АРТ 2026 — извлечены из боевого сайта (JSON-LD)
const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

const SCHEDULE = [
  { city:'Киров',       date:'2026-06-24', venue:'ДК РЖД', addr:'ул. Комсомольская, 3', url:'https://qtickets.ru/show/878429' },
  { city:'Смоленск',    date:'2026-06-30', venue:'Кинотеатр «Современник»', addr:'Октябрьской революции, 15', url:'https://qtickets.ru/show/881535' },
  { city:'Воронеж',     date:'2026-07-01', venue:'Городской Дворец культуры', addr:'ул. 9 Января, 108', url:'https://qtickets.ru/show/876400' },
  { city:'Симферополь', date:'2026-07-09', venue:'Крымский ДК профсоюзов', addr:'ул. Киевская, 115', url:'https://qtickets.ru/show/874978' },
  { city:'Оренбург',    date:'2026-07-17', venue:'ДКиС «Газовик»', addr:'ул. Чкалова, 1', url:'https://qtickets.ru/show/892521' },
  { city:'Йошкар-Ола',  date:'2026-07-22', venue:'ДК им. В.И. Ленина', addr:'ул. Машиностроителей, 22а', url:'https://qtickets.ru/show/881855' },
  { city:'Таганрог',    date:'2026-07-22', venue:'Городской Дворец культуры', addr:'Петровская ул., 104-1', url:'https://qtickets.ru/show/892710' },
  { city:'Иркутск',     date:'2026-07-23', venue:'КДЦ «Орбита»', addr:'Советская ул., 139', url:'https://qtickets.ru/show/881994' },
  { city:'Геленджик',   date:'2026-07-23', venue:'ДКиД', addr:'Геленджикский проспект, 95', url:'https://qtickets.ru/show/892426' },
  { city:'Липецк',      date:'2026-07-25', venue:'Областной центр культуры', addr:'ул. Космонавтов, 54А', url:'https://qtickets.ru/show/878029' },
  { city:'Екатеринбург',date:'2026-07-28', venue:'Дворец культуры железнодорожников', addr:'ул. Челюскинцев, 102', url:'https://qtickets.ru/show/872217' },
  { city:'Калининград', date:'2026-07-29', venue:'Дворец культуры железнодорожников', addr:'ул. Железнодорожная, 2', url:'https://qtickets.ru/show/881531' },
  { city:'Тула',        date:'2026-07-30', venue:'ДК «Туламашзавод»', addr:'ул. Демидовская, 52', url:'https://qtickets.ru/show/875722' },
  { city:'Саранск',     date:'2026-07-31', venue:'Дворец культуры и искусств', addr:'ул. Полежаева, 44/3', url:'https://qtickets.ru/show/900769' },
  { city:'Ярославль',   date:'2026-08-21', venue:'ДК «Нефтяник»', addr:'Московский проспект, 92', url:'https://qtickets.ru/show/894775' },
  { city:'Севастополь', date:'2026-08-26', venue:'Центр культуры и искусств', addr:'ул. Ленина, 25', url:'https://qtickets.ru/show/908670' },
  { city:'Тула',        date:'2026-09-11', venue:'ДК «Туламашзавод»', addr:'ул. Демидовская, 52', url:'https://qtickets.ru/show/904516' },
  { city:'Тюмень',      date:'2026-09-16', venue:'ДКЖ', addr:'ул. Первомайская, 55', url:'https://qtickets.ru/show/878776' },
  { city:'Орел',        date:'2026-09-18', venue:'КДЦ «Металлург»', addr:'ул. Металлургов, 17', url:'https://qtickets.ru/show/896370' },
  { city:'Самара',      date:'2026-09-19', venue:'Дом офицеров', addr:'ул. Шостаковича, 7', url:'https://qtickets.ru/show/882442' },
  { city:'Калининград', date:'2026-09-23', venue:'Дворец культуры железнодорожников', addr:'ул. Железнодорожная, 2', url:'https://qtickets.ru/show/887442' },
  { city:'Киров',       date:'2026-09-25', venue:'ДК РЖД', addr:'ул. Комсомольская, 3', url:'https://qtickets.ru/show/887456' },
  { city:'Уфа',         date:'2026-09-25', venue:'Башкирская филармония им. Х. Ахметова', addr:'ул. Гоголя, 58', url:'https://qtickets.ru/show/910643' },
];

const PAINTINGS = [
  { img:'assets/paintings/kartina6.webp',   title:'Девушка с жемчужной серёжкой', author:'Ян Вермеер' },
  { img:'assets/paintings/kartina5.webp',   title:'Рождение Венеры', author:'Сандро Боттичелли' },
  { img:'assets/paintings/kartina8.webp',   title:'Любовь земная и Любовь небесная', author:'Тициан Вечеллио' },
  { img:'assets/paintings/kartina10.webp',  title:'Постоянство памяти', author:'Сальвадор Дали' },
  { img:'assets/paintings/kartina4.webp',   title:'Смерть и жизнь', author:'Густав Климт' },
  { img:'assets/paintings/kartina1-2.webp', title:'Поцелуй', author:'Густав Климт' },
  { img:'assets/paintings/kartina1-1.webp', title:'Крик', author:'Эдвард Мунк' },
  { img:'assets/paintings/kartina1.webp',   title:'Звёздная ночь', author:'Винсент Ван Гог' },
];

const PROGRAM = [
  { part:'Часть 1', items:[
    { era:'античность',  songs:['Зарождение музыки', 'Hans Zimmer — Gladiator'] },
    { era:'средневековье', songs:['W. A. Mozart — Requiem (Introitus)', 'J. S. Bach — Air on the G String'] },
    { era:'возрождение и барокко', songs:['Thomas Newman — Any Other Name', 'Alexandre Desplat — The Imitation Game', 'Ludovico Einaudi — Divenire', 'James Newton Howard — The Gravel Road'] },
  ]},
  { part:'Часть 2', items:[
    { era:'реализм',      songs:['Yann Tiersen — Comptine d’un autre été', 'Ludovico Einaudi — Experience', 'Clint Mansell — Lux Aeterna'] },
    { era:'импрессионизм',songs:['Hans Zimmer — Mountains', 'Hans Zimmer — Chevaliers de Sangreal'] },
    { era:'сюрреализм',   songs:['Hildur Guðnadóttir — Bathroom Dance'] },
    { era:'авангард',     songs:['Daft Punk — Adagio for TRON', 'Max Richter — Vivaldi Recomposed (Spring 1)'] },
    { era:'космос',       songs:['Hans Zimmer — Time'] },
  ]},
];

const FAQ = [
  { q:'Что такое ПРО.АРТ?', a:'ПРО.АРТ — шоу живой музыки при свечах с визуальными образами и ожившими картинами.' },
  { q:'Нужно ли разбираться в искусстве, чтобы посетить ПРО.АРТ?', a:'Нет. ПРО.АРТ не требует подготовки. Не нужно знать стили, направления или имена художников и композиторов. Проект открыт для всех, кто ищет эмоциональную перезагрузку.' },
  { q:'В чём особенность живой музыки в проекте?', a:'Живая музыка в ПРО.АРТ — проводник по эпохам искусства. Она выстраивает диалог между зрителем и полотнами: классические мелодии подчёркивают гармонию барокко, а современные композиции раскрывают глубину абстрактных работ.' },
  { q:'Это разовое мероприятие или серия событий?', a:'ПРО.АРТ задуман как серия художественных спектаклей. Проект развивается последовательно, формируя культуру регулярного посещения и осознанного взаимодействия с искусством.' },
];

const FEATURES = [
  { t:'Живое звучание оркестра', d:'Филигранное исполнение в формате близкого контакта со зрителем.' },
  { t:'Эксклюзивный опыт', d:'Редкое событие, в котором невозможно предугадать, что будет дальше.' },
  { t:'Уникальный формат', d:'Художественный перформанс на стыке музыки, визуального искусства и света.' },
  { t:'Арт-терапия', d:'Пространство, в котором внимание естественно смещается внутрь и происходит обновление.' },
  { t:'Искусство как состояние', d:'Не через объяснение, а через ощущение, ясность и внутренний отклик.' },
  { t:'Ожившие картины', d:'Визуальные образы, которые существуют в одном ритме с музыкой.' },
];
