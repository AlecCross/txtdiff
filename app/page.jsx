'use client';

import React, { useState } from 'react';
import { diffLines, diffWords, diffChars } from 'diff'; // Імпортуємо необхідні функції

function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  // Стан для зберігання результатів порівняння по рядках
  const [resultLines, setResultLines] = useState([]);

  const compareText = () => {
    // Виконуємо первинне порівняння по рядках
    const diff = diffLines(text1, text2);

    const lines = [];
    let i = 0;

    // Проходимо по результату порівняння по рядках
    while (i < diff.length) {
      const currentPart = diff[i];
      const nextPart = diff[i + 1]; // Перевіряємо наступну частину для виявлення змінених рядків

      // Перевіряємо, чи поточна частина є видаленим рядком І чи наступна частина є доданим рядком.
      // Це вказує на зміну в рядку.
      if (currentPart.removed && nextPart && nextPart.added) {
        const removedPart = currentPart;
        const addedPart = nextPart;

        // *** ЕТАП 2: Вторинне порівняння цих двох змінених рядків (по словах) ***
        // Можна змінити на diffChars для порівняння по символах
        const inlineDiff = diffWords(removedPart.value, addedPart.value);

        // Формуємо HTML для лівого та правого виводу зміненого рядка з inline виділенням
        let leftInlineHtml = '';
        let rightInlineHtml = '';

        inlineDiff.forEach((inlinePart) => {
          const value = inlinePart.value;
          const added = inlinePart.added;
          const removed = inlinePart.removed;

          // Застосовуємо стилі виділення до частин, які відрізняються всередині рядка
          if (removed) {
            leftInlineHtml += `<span style="background-color: #ffe0e0;">${value}</span>`; // Фон для видалених слів/символів
          } else if (added) {
            rightInlineHtml += `<span style="background-color: #e0ffe0;">${value}</span>`; // Фон для доданих слів/символів
          } else {
            // Частини без змін всередині рядка
            leftInlineHtml += `<span>${value}</span>`;
            rightInlineHtml += `<span>${value}</span>`;
          }
        });

        // Додаємо згенерований HTML для змінених рядків до масиву рядкових пар
        lines.push({
          left: <span dangerouslySetInnerHTML={{ __html: leftInlineHtml }} />,
          right: <span dangerouslySetInnerHTML={{ __html: rightInlineHtml }} />,
        });

        i += 2; // Пропускаємо наступну частину, оскільки ми її вже обробили
      } else if (currentPart.removed) {
        // Частина видалена (присутня тільки в першому тексті)
        lines.push({
          left: <span style={{ backgroundColor: '#ffe0e0' }}>{currentPart.value}</span>, // Виділяємо весь видалений рядок
          right: <span></span>, // Пустий елемент для вирівнювання в правому виводі
        });
        i++;
      } else if (currentPart.added) {
        // Частина додана (присутня тільки в другому тексті)
        lines.push({
          left: <span></span>, // Пустий елемент для вирівнювання в лівому виводі
          right: <span style={{ backgroundColor: '#e0ffe0' }}>{currentPart.value}</span>, // Виділяємо весь доданий рядок
        });
        i++;
      } else {
        // Частина без змін (присутня в обох текстах)
        lines.push({
          left: <span>{currentPart.value}</span>,
          right: <span>{currentPart.value}</span>,
        });
        i++;
      }
    }

    setResultLines(lines);
  };

  return (
    <div style={{ padding: '20px' }}> {/* Додав відступ для зручності */}
      <h1>Text Compare</h1>

      <div style={{ display: 'flex', gap: '20px' }}> {/* Використовуємо flexbox для полів вводу */}
        <textarea
          placeholder="Перший текст"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          rows={15} // Збільшив кількість рядків для зручності
          cols={60} // Збільшив кількість колонок для зручності
          style={{ width: '50%' }} // Займає 50% ширини
        />
        <textarea
          placeholder="Другий текст"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          rows={15} // Збільшив кількість рядків для зручності
          cols={60} // Збільшив кількість колонок для зручності
          style={{ width: '50%' }} // Займає 50% ширини
        />
      </div>

      <button
        onClick={compareText}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Порівняти
      </button>

      <div style={{ marginTop: '30px' }}>
        <h2>Результат порівняння:</h2>
        {/* Відображаємо результат порівняння в двох колонках */}
        {resultLines.map((linePair, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              whiteSpace: 'pre-wrap', // Зберігаємо форматування тексту (переноси рядків, пробіли)
              borderBottom: '1px solid #eee', // Додав горизонтальну лінію між рядками для кращої візуалізації
            }}
          >
            {/* Ліва колонка результату */}
            <div style={{ flex: 1, marginRight: '10px', padding: '5px', wordBreak: 'break-word' }}> {/* Додав wordBreak */}
                {linePair.left}
            </div>
            {/* Права колонка результату */}
            <div style={{ flex: 1, padding: '5px', wordBreak: 'break-word' }}> {/* Додав wordBreak */}
                {linePair.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextCompare;
