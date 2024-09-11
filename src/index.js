import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import { generateCode } from './codeGenerator.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: generateCode(), title: 'Название элемента', selectedCount: 0},
    { code: generateCode(), title: 'Некий объект', selectedCount: 0 },
    { code: generateCode(), title: 'Заголовок' , selectedCount: 0},
    { code: generateCode(), title: 'Очень длинное название элемента из семи слов' , selectedCount: 0},
    { code: generateCode(), title: 'Запись' , selectedCount: 0},
    { code: generateCode(), title: 'Шестая запись' , selectedCount: 0},
    { code: generateCode(), title: 'Седьмая запись' , selectedCount: 0},
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
