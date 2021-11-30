/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function areColorsEqual(a, b) {
  for (let i = 0; i < 4; ++i) {
    if (b[i] !== a[i]) {
      return false;
    }
  }

  return true;
}