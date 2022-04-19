import {getIntValue} from './util.js';
import {
  CONTROL_MAX_VALUE,
  CONTROL_MIN_VALUE,
  CONTROL_STEP,
  CONTROL_DEFAULT_VALUE,
  EFFECT_CLASS_START
} from './const.js';

const imgPreviewElement = document.querySelector('.img-upload__preview img');
const scaleValueElement = document.querySelector('.scale__control--value');
const effectInputsElement = document.querySelectorAll('input[name="effect"]');
const sliderEffectLevelElement = document.querySelector('.effect-level__slider');
const valueEffectLevelElement = document.querySelector('.effect-level__value');
const sliderBlockNoneElement = document.querySelector('.img-upload__effect-level');
const listEffectsElement = document.querySelector('.effects__list');

const lowerSizeImg = () => {
  const numberValue = getIntValue(scaleValueElement);
  if (getIntValue(scaleValueElement) > CONTROL_MIN_VALUE) {
    scaleValueElement.value = `${numberValue - CONTROL_STEP}%`;
    imgPreviewElement.style = `transform: scale(${(numberValue - CONTROL_STEP) / 100})`;
  }
};

const incrementSizeImg = () => {
  const numberValue = getIntValue(scaleValueElement);
  if (getIntValue(scaleValueElement) < CONTROL_MAX_VALUE) {
    scaleValueElement.value = `${numberValue + CONTROL_STEP}%`;
    imgPreviewElement.style = `transform: scale(${(numberValue + CONTROL_STEP) / 100})`;
  }
};

effectInputsElement.forEach((effectInput) => {
  effectInput.addEventListener('change', (evt) => {
    imgPreviewElement.classList.remove(...imgPreviewElement.classList);
    imgPreviewElement.classList.add(EFFECT_CLASS_START + evt.target.value);
  });
});

valueEffectLevelElement.value = CONTROL_DEFAULT_VALUE;

noUiSlider.create(sliderEffectLevelElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

let filterName = `${EFFECT_CLASS_START  }none`;

sliderEffectLevelElement.noUiSlider.on('update', () => {
  valueEffectLevelElement.value = sliderEffectLevelElement.noUiSlider.get();
  if (filterName === `${EFFECT_CLASS_START  }chrome`) {
    imgPreviewElement.style.filter = `grayscale(${valueEffectLevelElement.value})`;
  } else if (filterName === `${EFFECT_CLASS_START  }sepia`) {
    imgPreviewElement.style.filter = `sepia(${valueEffectLevelElement.value})`;
  } else if (filterName === `${EFFECT_CLASS_START  }marvin`) {
    imgPreviewElement.style.filter = `invert(${valueEffectLevelElement.value}%)`;
  } else if (filterName === `${EFFECT_CLASS_START  }phobos`) {
    imgPreviewElement.style.filter = `blur(${valueEffectLevelElement.value}px)`;
  } else if (filterName === `${EFFECT_CLASS_START  }heat`) {
    imgPreviewElement.style.filter = `brightness(${valueEffectLevelElement.value})`;
  }
});

sliderBlockNoneElement.style.display = 'none';

const effectSliderSettings = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  }
};

listEffectsElement.addEventListener('change', (evt) => {
  filterName = EFFECT_CLASS_START + evt.target.value;
  imgPreviewElement.className = filterName;

  sliderBlockNoneElement.style.display = 'block';
  sliderEffectLevelElement.removeAttribute('disabled');

  if (filterName === `${EFFECT_CLASS_START  }none`) {
    sliderBlockNoneElement.style.display = 'none';
    imgPreviewElement.style.filter = 'none';
  } else {
    sliderEffectLevelElement.noUiSlider.updateOptions(effectSliderSettings[evt.target.value]);
  }
});

export {imgPreviewElement, scaleValueElement, sliderBlockNoneElement, lowerSizeImg, incrementSizeImg};
