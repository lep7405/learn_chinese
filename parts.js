const VOCAB_PARTS = Array.isArray(globalThis.WORDS_DATA) ? globalThis.WORDS_DATA : [];

const PARTS = VOCAB_PARTS.map((words, index) => {
  const partNumber = index + 1;
  return {
    label: `Part ${partNumber}`,
    href: `index.html?part=${partNumber}`,
    data: () => words,
  };
});
