# FENTEZ

**Language:** [English](#english) · [Українська](#українська)

---

## English

Personal link page of **FENTEZ**: vibecoder and gamer from Ukraine.
A night sky that follows your cursor, soft sounds, and a heart counter shared by all visitors.

Live: https://fentez.pp.ua

### Features

- Starfield that lights up around the cursor and forms constellations
- Name that glows where the light touches it
- "Tap to enter" screen, soft synthesized sounds (no audio files), volume slider and mute button
- Click the sky to play a note; other visitors see and hear it too
- Click the avatar to send a heart; the counter is the same for everyone
- Discord status dot and avatar pulled live from Discord
- Dark and light theme, saved in the browser
- Mobile friendly, respects "reduce motion"

### Tech

HTML, CSS and vanilla JavaScript. No build step, no dependencies.
Free services used: [ntfy.sh](https://ntfy.sh) (live clicks), [Abacus](https://abacus.jasoncameron.dev) (heart counter), [Lanyard](https://github.com/Phineas/lanyard) (Discord status).

### Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup |
| `style.css` | Styles and themes |
| `script.js` | Sky, sounds, hearts, Discord status |
| `image/` | Avatar and icons |

### Run

Open `index.html` in a browser, or publish with GitHub Pages:
**Settings → Pages → Branch: `main` / root**.

### Configuration

All settings are in `script.js`:

| What | Where | What to change |
| --- | --- | --- |
| Shared sky (clicks seen by others) | `TOPIC` | Any unique string |
| Heart counter | `HB`, `HP` | `HB` is the service URL, `HP` is the counter name (change it to reset to 0) |
| Discord status and avatar | Lanyard URL in `presence` | Your Discord user ID |

For the Discord status to work, join the [Lanyard server](https://discord.gg/UrXF2cfJ7F) with your account.

### Links

[Steam](https://steamcommunity.com/id/marko_jenkins) · [Discord](https://discord.com/users/664172314602110976) · [GitHub](https://github.com/Fentez)

---

## Українська

Особиста сторінка з посиланнями **FENTEZ**: vibecoder і геймер з України.
Нічне небо, що слідує за курсором, м'які звуки та лічильник сердечок, спільний для всіх відвідувачів.

Сайт: https://fentez.pp.ua

### Можливості

- Зоряне небо, що світиться навколо курсора і складається в сузір'я
- Ім'я, яке спалахує там, де його торкається світло
- Екран «Tap to enter», м'які синтезовані звуки (без аудіофайлів), повзунок гучності та кнопка вимкнення звуку
- Клік по небу грає ноту; інші відвідувачі бачать і чують її теж
- Клік по аватарці надсилає сердечко; лічильник однаковий для всіх
- Статус і аватарка Discord підтягуються наживо
- Темна та світла теми, вибір зберігається в браузері
- Зручно на телефоні, враховує налаштування «зменшити рух»

### Технології

HTML, CSS і чистий JavaScript. Без збірки та залежностей.
Безкоштовні сервіси: [ntfy.sh](https://ntfy.sh) (кліки наживо), [Abacus](https://abacus.jasoncameron.dev) (лічильник сердечок), [Lanyard](https://github.com/Phineas/lanyard) (статус Discord).

### Файли

| Файл | Призначення |
| --- | --- |
| `index.html` | Розмітка сторінки |
| `style.css` | Стилі та теми |
| `script.js` | Небо, звуки, сердечка, статус Discord |
| `image/` | Аватарка та іконки |

### Запуск

Відкрийте `index.html` у браузері або опублікуйте через GitHub Pages:
**Settings → Pages → Branch: `main` / root**.

### Налаштування

Усі налаштування знаходяться в `script.js`:

| Що | Де | Що змінити |
| --- | --- | --- |
| Спільне небо (кліки бачать інші) | `TOPIC` | Будь-який унікальний рядок |
| Лічильник сердечок | `HB`, `HP` | `HB` це адреса сервісу, `HP` це назва лічильника (змініть її, щоб скинути на 0) |
| Статус і аватарка Discord | Адреса Lanyard у `presence` | Ваш Discord ID |

Щоб працював статус Discord, зайдіть зі своїм акаунтом на [сервер Lanyard](https://discord.gg/UrXF2cfJ7F).

### Посилання

[Steam](https://steamcommunity.com/id/marko_jenkins) · [Discord](https://discord.com/users/664172314602110976) · [GitHub](https://github.com/Fentez)
