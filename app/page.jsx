'use client';

import React, { useState } from 'react';
import { diffChars } from 'diff';

function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState([]);

  const compareText = () => {
    const diff = diffChars(text1, text2);
    setDiffResult(diff);
  };

  return (
    <div>
      <div>
        <textarea
          placeholder="Перший текст"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          rows={10}
          cols={50}
        />
      </div>
      <div>
        <textarea
          placeholder="Другий текст"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          rows={10}
          cols={50}
        />
      </div>
      <button onClick={compareText}>Порівняти</button>

      <div>
        <h2>Результат порівняння:</h2>
        {diffResult.map((part, index) => (
          <span
            key={index}
            style={{
              color: part.added ? 'green' : part.removed ? 'red' : 'black',
              backgroundColor: part.added ? '#e0ffe0' : part.removed ? '#ffe0e0' : 'transparent',
            }}
          >
            {part.value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TextCompare;
