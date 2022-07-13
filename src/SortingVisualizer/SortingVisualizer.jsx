import React from 'react';
import {getInsertionSortAnimations, getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 15;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({array});
  }


  mergeSort() {
    //run algorithm and get animations
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //get all array bars by element
      const arrayBars = document.getElementsByClassName('array-bar');
      //determine indexes of color changing elements:
      //first two cases: 0, 1 color change
      //last case: 2 no color change
      //will occur every ASM milliseconds (hence the second parameter of the settimeout function)
      const isColorChange = i % 3 !== 2;
      //two color change cases (this will happen twice to enable then disable color)
      if (isColorChange) {
        //get two bars from [index, index] pair
        //change two swap bar styles
        //if first case, change to secondary color, if second set back to primary color (never last case)
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        //every ANIM_S_m milliseconds, set the two bar colors
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      //not color change case (this only happens once every three)
      } else {
        //get animation [idx, height] pair
        //change bar style to adjust to newHeight
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort(){
    const animations = getInsertionSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barIdx, barVal] = animations[i]
        const barStyle = arrayBars[barIdx].style
        barStyle.height = `${barVal}px`;
      }, i * ANIMATION_SPEED_MS)
    }
  }
  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
