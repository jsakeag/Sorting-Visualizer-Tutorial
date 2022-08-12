//https://www.geeksforgeeks.org/heap-sort/
export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  console.log(animations);
  return animations;
}

function heapSort(arr, animations) {
  var n = arr.length;
  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i, animations);

  // One by one extract an element from heap
  for (var i = n - 1; i > 0; i--) {
    // Move current root to end
    swap(arr, 0, i);
    addSwapAnimation(arr, 0, i, animations);
    // call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, n, i, animations) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && arr[l] > arr[largest]) largest = l;

  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest]) largest = r;

  // If largest is not root
  if (largest != i) {
    swap(arr, i, largest);
    addSwapAnimation(arr, i, largest, animations);
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, animations);
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, array.length, animations);

  return animations;
}

function bubbleSort(arr, n, animations) {
  let i, j;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        animations.push([j, j + 1]);
        animations.push([i, j]);
        animations.push([j, arr[j]]);
        animations.push([j + 1, arr[j + 1]]);
      }
    }
  }
}

function addSwapAnimation(arr, index1, index2, animations) {
  animations.push([index1, index2]);
  animations.push([index1, index2]);
  animations.push([index1, arr[index1]]);
  animations.push([index2, arr[index2]]);
}
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSort(array, 0, array.length - 1, animations);

  return animations;
}

/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
 */
function quickSort(arr, low, high, animations) {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place
    let pi = partition(arr, low, high, animations);

    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1, animations);
    quickSort(arr, pi + 1, high, animations);
  }
}

/* This function takes last element as pivot, places
 the pivot element at its correct position in sorted
 array, and places all smaller (smaller than pivot)
 to left of pivot and all greater elements to right
 of pivot */
function partition(arr, low, high, animations) {
  // pivot
  let pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    if (arr[j] < pivot) {
      // Increment index of
      // smaller element
      i++;
      swap(arr, i, j);
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([i, arr[i]]);
      animations.push([j, arr[j]]);
    }
  }
  swap(arr, i + 1, high);
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);
  animations.push([i + 1, arr[i + 1]]);
  animations.push([high, arr[high]]);
  return i + 1;
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  selectionSort(array, animations);

  return animations;
}

function selectionSort(array, animations) {
  let size = array.length;

  for (let step = 0; step < size - 1; step++) {
    let min_idx = step;
    for (let i = step + 1; i < size; i++) {
      // To sort in descending order, change > to < in this line.
      // Select the minimum element in each loop.
      if (array[i] < array[min_idx]) {
        min_idx = i;
      }
    }

    animations.push([min_idx, step]);
    animations.push([min_idx, step]);

    // swap min to correct position
    swap(array, step, min_idx);

    animations.push([step, array[step]]);
    animations.push([min_idx, array[min_idx]]);
  }
}

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSort(array, animations);
  return animations;
}
//animations returns a different [index, index] or [index, height] pair that needs to be changed

function insertionSort(array, animations) {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let current = array[i];
    let j = i - 1;
    while (j > -1 && current < array[j]) {
      array[j + 1] = array[j];
      animations.push([j + 1, array[j + 1]]);
      j--;
    }
    //adds one back so that j stays as the index below last swapped
    array[j + 1] = current;
    animations.push([j + 1, array[j + 1]]);
  }
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// A utility function to swap two elements
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
