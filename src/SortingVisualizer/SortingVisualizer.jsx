import React from 'react';
import {getBubbleSortAnimations, getHeapSortAnimations, getInsertionSortAnimations, getMergeSortAnimations, getQuickSortAnimations, getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 15;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#fcba03';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#ca03fc';

const LOWER_BOUND = 5;
const UPPER_BOUND = 700;

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
      array.push(randomIntFromInterval(LOWER_BOUND, UPPER_BOUND));
    }
    this.setState({array});
  }

  selectionSort() {
    //run algorithm and get animations
    const animations = getSelectionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //get all array bars by element
      const arrayBars = document.getElementsByClassName('array-bar');
      //console.log(Math.floor(i/2) % 2)
      const isColorChange = Math.floor(i/2) % 2 === 0 //1, 2, 5, 6, 9, 10, etc
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = (idx) => i % 3 !== 0 ? 
            newShade(arrayBars[idx].style.backgroundColor, 100) : 
            getPrimaryColor(arrayBars[idx].style.height);
      

            // const color = (idx) => i % 3 !== 0 ? 
            // newShade(arrayBars[idx].style.backgroundColor, 100) : 
            // getPrimaryColor(arrayBars[idx].style.height);
      
      
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
          barStyle.backgroundColor = getPrimaryColor(`${newHeight}`)
        }, i * ANIMATION_SPEED_MS);
      }
    }
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
        //i % 3 === 0
        const color = (idx) => false ? 
          SECONDARY_COLOR :// PRIMARY_COLOR
            // newShade(arrayBars[idx].style.backgroundColor, 100) : 
             getPrimaryColor(arrayBars[idx].style.height);
        //every ANIM_S_m milliseconds, set the two bar colors
        setTimeout(() => {
          barOneStyle.backgroundColor = color(barOneIdx);
          barTwoStyle.backgroundColor = color(barTwoIdx);
        }, i * ANIMATION_SPEED_MS);
      //not color change case (this only happens once every three)
      } else {
        //get animation [idx, height] pair
        //change bar style to adjust to newHeight
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
          barStyle.backgroundColor = getPrimaryColor(`${newHeight}`)
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort(){
    const animations = getInsertionSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barIdx, newHeight] = animations[i]
        const barStyle = arrayBars[barIdx].style
        barStyle.height = `${newHeight}px`;
        barStyle.backgroundColor = getPrimaryColor(`${newHeight}`)
      }, i * ANIMATION_SPEED_MS)
    }
  }
  quickSort() {
    //run algorithm and get animations
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //get all array bars by element
      const arrayBars = document.getElementsByClassName('array-bar');
      //console.log(Math.floor(i/2) % 2)
      const isColorChange = Math.floor(i/2) % 2 === 0; //1, 2, 5, 6, 9, 10, etc
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = (idx) => i % 2 === 0 ? 
            newShade(arrayBars[idx].style.backgroundColor, 100) : 
            getPrimaryColor(arrayBars[idx].style.height);
        setTimeout(() => {
          barOneStyle.backgroundColor = color(barOneIdx);
          barTwoStyle.backgroundColor = color(barTwoIdx);
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
          barStyle.backgroundColor = getPrimaryColor(`${newHeight}`)
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  
  heapSort() {
    //run algorithm and get animations
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //get all array bars by element
      const arrayBars = document.getElementsByClassName('array-bar');
      //console.log(Math.floor(i/2) % 2)
      const isColorChange = Math.floor(i/2) % 2 === 0; //1, 2, 5, 6, 9, 10, etc
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = (idx) => i % 2 === 0 ? 
            newShade(arrayBars[idx].style.backgroundColor, 100) : 
            getPrimaryColor(arrayBars[idx].style.height);
        setTimeout(() => {
          barOneStyle.backgroundColor = color(barOneIdx);
          barTwoStyle.backgroundColor = color(barTwoIdx);
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
          barStyle.backgroundColor = getPrimaryColor(`${newHeight}`)
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    //run algorithm and get animations
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //get all array bars by element
      const arrayBars = document.getElementsByClassName('array-bar');
      //console.log(Math.floor(i/2) % 2)
      const isColorChange = Math.floor(i/2) % 2 === 0; //1, 2, 5, 6, 9, 10, etc
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = (idx) => i % 2 === 0 ? 
            newShade(arrayBars[idx].style.backgroundColor, 100) : 
            getPrimaryColor(arrayBars[idx].style.height);
        setTimeout(() => {
          barOneStyle.backgroundColor = color(barOneIdx);
          barTwoStyle.backgroundColor = color(barTwoIdx);
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
          barStyle.backgroundColor = getPrimaryColor(`${newHeight}`)
        }, i * ANIMATION_SPEED_MS);
      }
    }
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
              backgroundColor: getPrimaryColor(`${value}`),
              height: `${value}px`,
              borderRadius: `5px`
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
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

// const newShadeRGB = (color, magnitude) => {
//   color.r += magnitude
//   color.r > 255 && (color.a = 255)
//   color.g += magnitude
//   color.g > 255 && (color.g = 255)
//   color.b += magnitude
//   color.b > 255 && (color.b = 255)
//   return color
// };

//https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
const newShade = (hexColor, magnitude) => {
  hexColor = rgba2hex(hexColor)
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
      const decimalColor = parseInt(hexColor, 16);
      let r = (decimalColor >> 16) + magnitude;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor & 0x0000ff) + magnitude;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
      return hexColor;
  }
};

//https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

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

function getPrimaryColor(value = 0){
  return getColorInBetween(PRIMARY_COLOR, SECONDARY_COLOR, (value-LOWER_BOUND)/(UPPER_BOUND-LOWER_BOUND))
}
function getInBetween(val1, val2, dist){
  return ((val2-val1)*dist)+val1
}
function getColorInBetween(color1, color2, dist){
  let rgbColor1 = hexToRgb(color1)
  let rgbColor2 = hexToRgb(color2)
  let rgbColorNew = [getInBetween(rgbColor1.r, rgbColor2.r, dist), 
  getInBetween(rgbColor1.g, rgbColor2.g, dist),
  getInBetween(rgbColor1.b, rgbColor2.b, dist)]
  return (rgbToHex(rgbColorNew[0], rgbColorNew[1], rgbColorNew[2]))
}

//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
  let hex = Math.round(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
