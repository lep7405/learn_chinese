const VOCAB_PART_SIZE = 10;
const VOCAB_WORDS = Array.isArray(globalThis.WORDS_DATA) ? globalThis.WORDS_DATA : [];
console.log("Loaded VOCAB_WORDS:", VOCAB_WORDS);

const PARTS = [
  ...Array.from({ length: Math.ceil(VOCAB_WORDS.length / VOCAB_PART_SIZE) }, (_, index) => {
    const partNumber = index + 1;
    const start = index * VOCAB_PART_SIZE;
    const end = start + VOCAB_PART_SIZE;

    return {
      label: `Part ${partNumber}`,
      href: `vocab.html?part=${partNumber}`,
      data: () => VOCAB_WORDS.slice(start, end),
    };
  }),
];
