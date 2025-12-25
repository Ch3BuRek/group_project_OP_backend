const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const LIKES_FILE = path.join(__dirname, 'likes.json');

app.use(cors());
app.use(express.json());
app.use('/imgs', express.static('public/imgs'));

// --- ДОПОМІЖНІ ФУНКЦІЇ ДЛЯ РОБОТИ З ФАЙЛОМ ---

const readLikesFromFile = () => {
    try {
        if (!fs.existsSync(LIKES_FILE)) {
            return [];
        }
        const data = fs.readFileSync(LIKES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Помилка читання файлу лайків:", error);
        return [];
    }
};

const saveLikesToFile = (likes) => {
    try {
        fs.writeFileSync(LIKES_FILE, JSON.stringify(likes, null, 2), 'utf8');
    } catch (error) {
        console.error("Помилка запису у файл лайків:", error);
    }
};

// --- ДАНІ ---

let cats = [
  {
    id: 1,
    name: "Фулстак",
    age: 3,
    city: "Київ",
    breed: "Британський короткошерстий",
    description: "Senior Full-Stack. Знаюся на фронтенді (твоє обличчя) і бекенді (твій холодильник). Пишу чистий код за паштет.",
    image: "/imgs/full-kit-developer.jpg"
  },
  {
    id: 2,
    name: "Джейсік",
    age: 2,
    city: "Львів",
    breed: "Європейська короткошерста",
    description: "Весь такий асинхронний. Люжу по ночах влаштовувати «тигидик» (це мій runtime). Чекаю на match, щоб замерджити серця.",
    image: "/imgs/jsik.jpg"
  },
  {
    id: 3,
    name: "Сервер",
    age: 4,
    city: "Одеса",
    breed: "Британський довгошерстий",
    description: "Мій аптайм — 99.9%. Завжди на зв'язку, особливо коли на кухні відкривається консерва. Стійкий до навантажень.",
    image: "/imgs/server.jpg"
  },
  {
    id: 4,
    name: "Ссд",
    age: 1,
    city: "Харків",
    breed: "Європейська короткошерста (Таббі)",
    description: "Працюю швидше за твій інтернет. Читання мурчання: 500 МБ/с. Запис любові: миттєво. Не туплю, не глючу.",
    image: "/imgs/ssd.jpg"
  },
  {
    id: 5,
    name: "Мілка",
    age: 2,
    city: "Дніпро",
    breed: "Шотландська висловуха",
    description: "Стиль — моє друге ім'я. Ношу бантики та окуляри. Тільки серйозні стосунки та інтелектуальні бесіди про пташок.",
    image: "/imgs/milka.jpg"
  },
  {
    id: 6,
    name: "Глюк",
    age: 5,
    city: "Чернівці",
    breed: "Корніш-рекс",
    description: "Я — помилка в матриці, яка зробить життя веселішим. Трохи дивний, максимально ексклюзивний. Просто завантажую оновлення.",
    image: "/imgs/glyk.jpg"
  },
  {
    id: 7,
    name: "Хтмлка",
    age: 2,
    city: "Полтава",
    breed: "Шотландська прямовуха",
    description: "Відповідаю за візуал. Можу зверстати затишок у будь-якій коробці. Давай налаштуємо наш padding обіймів.",
    image: "/imgs/htmlka.jpg"
  },
  {
    id: 8,
    name: "Карамелька",
    age: 1,
    city: "Франкiвськ",
    breed: "Шотландська довгошерста",
    description: "Солодка, як десерт. Допомагаю друкувати на клавіатурі (лягаю прямо на неї). Оціни мій рожевий вайб.",
    image: "/imgs/karamelka.jpg"
  },
  {
    id: 9,
    name: "Девмур",
    age: 4,
    city: "Київ",
    breed: "Домашня короткошерста",
    description: "Бізнес-кіт. Завжди при краватці. Дедлайни по мурчанню не чекають. Справжній джентльмен для вечірнього Netflix.",
    image: "/imgs/devmyr.jpg"
  },
  {
    id: 10,
    name: "Морсик",
    age: 6,
    city: "Вінниця",
    breed: "Мейн-кун суміш",
    description: "Професійний сомелье снів. Мій язик завжди назовні, бо я надто розслаблений для цього світу. Шукаю напарника для сну.",
    image: "/imgs/morsik.jpg"
  },
  {
    id: 11,
    name: "Сніжка",
    age: 1,
    city: "Тернопіль",
    breed: "Шотландська короткошерста",
    description: "Дивлюся прямо в душу. Не вір цьому ангельському погляду — я вкраду твій сирок за 0.2 секунди. Але ти все одно полюбиш.",
    image: "/imgs/snighka.jpg"
  },
  {
    id: 12,
    name: "Кузя",
    age: 3,
    city: "Запоріжжя",
    breed: "Домашня короткошерста",
    description: "Життя надто коротке, щоб бути серйозним. Люблю показувати язика обставинам. Веселий, непосидючий, щирий.",
    image: "/imgs/kyzya.jpg"
  },
  {
    id: 13,
    name: "Байт",
    age: 1,
    city: "Житомир",
    breed: "Європейська короткошерста",
    description: "Я той самий клікбейт, повз який не пройдеш. Маленький, але з потенціалом захопити твій диван. 100% реальний.",
    image: "/imgs/bait.jpg"
  },
  {
    id: 14,
    name: "Кодік",
    age: 2,
    city: "Луцьк",
    breed: "Британська суміш",
    description: "Маленький скрипт для гарного настрою. Легко інтегруюся в будь-яку сім'ю. Досліджую нові директорії (твої шафи).",
    image: "/imgs/kodik.jpg"
  },
  {
    id: 15,
    name: "Тінка",
    age: 2,
    city: "Київ",
    breed: "Екзотична короткошерста",
    description: "Трохи сумна зовні, але дуже тепла всередині. Шукаю того, хто зрозуміє мій глибокий внутрішній світ і дасть смаколик.",
    image: "/imgs/tinka.jpg"
  },
  {
    id: 16,
    name: "Піксель",
    age: 1,
    city: "Одеса",
    breed: "Домашня короткошерста",
    description: "Маленька деталь твого щастя. Люблю ховатися так, що не знайти. Обіцяю бути найяскравішим пікселем твого дня.",
    image: "/imgs/pixel.jpg"
  }
];
// --- API ---

//список усіх котів
app.get('/api/cats', (req, res) => {
    res.json(cats);
});

//список лайкнутих котів
app.get('/api/liked', (req, res) => {
    const likedCats = readLikesFromFile();
    res.json(likedCats);
});

//зберегти лайкі
app.post('/api/like', (req, res) => {
    const { cat } = req.body;
    let likedCats = readLikesFromFile();

    const alreadyLiked = likedCats.find(c => c.id === cat.id);

    if (!alreadyLiked) {
        const catWithChat = { ...cat, messages: [] }; 
        likedCats.push(catWithChat);
        saveLikesToFile(likedCats);
        console.log(`Кіт ${cat.name} успішно лайкнутий!`);
        res.json({ success: true, message: "Added to liked" });
    } else {
        console.log(`Кіт ${cat.name} вже був у списку.`);
        res.json({ success: false, message: "Already liked" });
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Сервер работаєт!!!</h1>');
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
