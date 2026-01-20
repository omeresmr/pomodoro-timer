const SECOND_MS = 1000;

const formatMilliseconds = (milliseconds: number) => {
  return `${String(Math.floor(milliseconds / 60 / SECOND_MS)).padStart(2, '0')}:${String(
    milliseconds % (60 * SECOND_MS)
  )
    .slice(0, -3)
    .padStart(2, '0')}`;
};

export default formatMilliseconds;
