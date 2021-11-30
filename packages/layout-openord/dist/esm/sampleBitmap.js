/**
 * @internal
 *
 * Generates a sample bitmap from the given density grid
 * @param densityGrid The density grid to sample
 * @param rate The sampling rate. 1=full sample. 2=skip every other row+column
 */
export function sampleBitmap(densityGrid, rate) {
  const bitmap = densityGrid.bitmap;
  const result = [];

  for (let rowIndex = 0; rowIndex < bitmap.length; rowIndex += rate) {
    const row = [];
    result.push(row);

    for (let colIndex = 0; colIndex < bitmap[0].length; colIndex += rate) {
      row.push(bitmap[rowIndex][colIndex]);
    }
  }

  return result;
}