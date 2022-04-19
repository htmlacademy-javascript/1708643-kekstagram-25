import {getIntValue} from './util.js';
import {
  CONTROL_MAX_VALUE,
  CONTROL_MIN_VALUE,
  CONTROL_STEP,
  CONTROL_DEFAULT_VALUE,
  EFFECT_CLASS_START
} from './const.js';

const imgPreview = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');
const effectInputs = document.querySelectorAll('input[name="effect"]');
const sliderEffectLevel = document.querySelector('.effect-level__slider');
const valueEffectLevel = document.querySelector('.effect-level__value');
const sliderBlockNone = document.querySelector('.img-upload__effect-level');
const listEffects = document.querySelector('.effects__list');

const lowerSizeImg = () => {
  const numberValue = getIntValue(scaleValue);
  if (getIntValue(scaleValue) > CONTROL_MIN_VALUE) {
    scaleValue.value = `${numberValue - CONTROL_STEP}%`;
    imgPreview.style = `transform: scale(${(numberValue - CONTROL_STEP) / 100})`;
  }
};

const incrementSizeImg = () => {
  const numberValue = getIntValue(scaleValue);
  if (getIntValue(scaleValue) < CONTROL_MAX_VALUE) {
    scaleValue.value = `${numberValue + CONTROL_STEP}%`;
    imgPreview.style = `transform: scale(${(numberValue + CONTROL_STEP) / 100})`;
  }
};

effectInputs.forEach((effectInput) => {
  effectInput.addEventListener('change', (evt) => {
    imgPreview.classList.remove(...imgPreview.classList);
    imgPreview.classList.add(EFFECT_CLASS_START + evt.target.value);
  });
});

valueEffectLevel.value = CONTROL_DEFAULT_VALUE;

noUiSlider.create(sliderEffectLevel, {
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

sliderEffectLevel.noUiSlider.on('update', () => {
  valueEffectLevel.value = sliderEffectLevel.noUiSlider.get();
  if (filterName === `${EFFECT_CLASS_START  }chrome`) {
    imgPreview.style.filter = `grayscale(${valueEffectLevel.value})`;
  } else if (filterName === `${EFFECT_CLASS_START  }sepia`) {
    imgPreview.style.filter = `sepia(${valueEffectLevel.value})`;
  } else if (filterName === `${EFFECT_CLASS_START  }marvin`) {
    imgPreview.style.filter = `invert(${valueEffectLevel.value}%)`;
  } else if (filterName === `${EFFECT_CLASS_START  }phobos`) {
    imgPreview.style.filter = `blur(${valueEffectLevel.value}px)`;
  } else if (filterName === `${EFFECT_CLASS_START  }heat`) {
    imgPreview.style.filter = `brightness(${valueEffectLevel.value})`;
  }
});

sliderBlockNone.style.display = 'none';

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

listEffects.addEventListener('change', (evt) => {
  filterName = EFFECT_CLASS_START + evt.target.value;
  imgPreview.className = filterName;

  sliderBlockNone.style.display = 'block';
  sliderEffectLevel.removeAttribute('disabled');

  if (filterName === `${EFFECT_CLASS_START  }none`) {
    sliderBlockNone.style.display = 'none';
    imgPreview.style.filter = 'none';
  } else {
    sliderEffectLevel.noUiSlider.updateOptions(effectSliderSettings[evt.target.value]);
  }
});

export {imgPreview, scaleValue, sliderBlockNone, lowerSizeImg, incrementSizeImg};
