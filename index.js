document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('main');
    const context = canvas.getContext('2d');
    let painting = false;
  
    function startPosition(e) {
      painting = true;
      draw(e);
    }
  
    function endPosition() {
      painting = false;
      context.beginPath();
    }
  
    function draw(e) {
      if (!painting) return;
  
      const brushSize = document.getElementById('slider').value;
      context.lineWidth = brushSize;
      context.lineCap = 'round';
      context.strokeStyle = getSelectedColor();
  
      context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
  
    function getSelectedColor() {
      const colors = {
        erase: '#FFFFFF',
        pink: '#F50057',
        blue: '#2979FF',
        yellow: '#FFD600',
        black: '#000000',
      };
  
      const selectedColor = document.querySelector('.btn-action.active');
      return colors[selectedColor.id];
    }
  
    function setBrushSize() {
      const size = document.getElementById('slider').value;
      document.getElementById('brushSize').innerText = size;
    }
  
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // Event Listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
  
    document.getElementById('slider').addEventListener('input', setBrushSize);
  
    document.getElementById('new').addEventListener('click', clearCanvas);
  
    const colorButtons = document.querySelectorAll('.btn-action');
    colorButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        colorButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  });
  