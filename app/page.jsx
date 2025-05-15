'use client';

import React, { useState } from 'react';
import { diffLines } from 'diff';

function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [leftHtmlResult, setLeftHtmlResult] = useState(''); // Зберігатимемо HTML для лівого виводу
  const [rightHtmlResult, setRightHtmlResult] = useState(''); // Зберігатимемо HTML для правого виводу

  const compareText = () => {
    const diff = diffLines(text1, text2);

    let leftHtml = '';
    let rightHtml = '';

    diff.forEach((part) => {
      const value = part.value;
      const added = part.added;
      const removed = part.removed;

      if (removed) {
        // Частина видалена (тільки в першому тексті)
        leftHtml += `<span style="background-color: #ffe0e0;">${value}</span>`; // Виділяємо видалене в лівому
        // Додаємо відповідну кількість переносів рядків у правому для вирівнювання
        rightHtml += `<span>${value.split('\n').map(() => '\n').join('')}</span>`;
      } else if (added) {
        // Частина додана (тільки в другому тексті)
         // Додаємо відповідну кількість переносів рядків у лівому для вирівнювання
        leftHtml += `<span>${value.split('\n').map(() => '\n').join('')}</span>`;
        rightHtml += `<span style="background-color: #e0ffe0;">${value}</span>`; // Виділяємо додане в правому
      } else {
        // Частина без змін (в обох текстах)
        leftHtml += `<span>${value}</span>`;
        rightHtml += `<span>${value}</span>`;
      }
    });

    setLeftHtmlResult(leftHtml);
    setRightHtmlResult(rightHtml);
  };

  return (
    <div>
      {/* Поля вводу */}
       <div>
        <textarea value={text1} onChange={(e) => setText1(e.target.value)} rows={10} cols={50} />
      </div>
      <div>
        <textarea value={text2} onChange={(e) => setText2(e.target.value)} rows={10} cols={50} />
      </div>
      <button onClick={compareText}>Порівняти</button>


      {/* Результати порівняння в двох колонках */}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1, marginRight: '10px', border: '1px solid #ccc', padding: '10px', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: leftHtmlResult }} />
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: rightHtmlResult }} />
      </div>
    </div>
  );
}

export default TextCompare;
