const outfieldWeights = {
  attacking: 0.15,
  defending: 0.15,
  finishing: 0.15,
  penalties: 0.05,
  crossing: 0.10,
  passing: 0.15,
  jumping: 0.10,
  heading: 0.15
};

const gkWeights = {
  diving: 0.15,
  handling: 0.15,
  reflexes: 0.20,
  positioning: 0.15,
  kicking: 0.10,
  communication: 0.10,
  jumping: 0.10,
  penaltydefence: 0.05
};

function sync(statDiv) {
  const range = statDiv.querySelector('input[type="range"]');
  const number = statDiv.querySelector('input[type="number"]');

  range.addEventListener('input', () => {
    number.value = range.value;
    calculateOVR();
  });

  number.addEventListener('input', () => {
    let value = Math.max(0, Math.min(100, number.value || 0));
    range.value = value;
    number.value = value;
    calculateOVR();
  });
}

function calculateOVR() {
  let outfieldOVR = 0;
  let gkOVR = 0;

  document.querySelectorAll('.stat:not(.gk)').forEach(stat => {
    const key = stat.dataset.stat;
    const val = stat.querySelector('input[type="number"]').value;
    outfieldOVR += val * outfieldWeights[key];
  });

  document.querySelectorAll('.stat.gk').forEach(stat => {
    const key = stat.dataset.stat;
    const val = stat.querySelector('input[type="number"]').value;
    gkOVR += val * gkWeights[key];
  });

  document.getElementById('ovr-outfield').textContent = Math.round(outfieldOVR);
  document.getElementById('ovr-gk').textContent = Math.round(gkOVR);
}

document.querySelectorAll('.stat').forEach(sync);
calculateOVR();
