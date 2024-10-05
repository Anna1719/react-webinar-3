import { redirect } from "react-router-dom";

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * @param {{_id: string, title: string, parent?: { _id: string }}[]}  data
 * @returns
 */

export function toList(data){
  const array = [];
  const map = data.reduce((acc, item) => {
    acc[item._id] = { _id: item._id, title: item.title, children: [] };
    return acc;
  }, {});

  data.forEach(item => {
    if (item.parent) {
      const parent = map[item.parent._id];
      if (parent) {
        parent.children.push(map[item._id]);
      }
    } else {
      array.push(map[item._id]);
    }
  });
  return array;
}

export const getTranformedArray = (array, level) => {
  const result = []

  const getDash = (array, level) => {
    for (const category of array) {
      result.push({value: category._id, title: `${new Array(level).fill(' -').join('')} ${category.title}`})
      if (category.children) {
        getDash(category.children, level + 1);
      }
    }
  }
  getDash(array, level);

  return result;
}