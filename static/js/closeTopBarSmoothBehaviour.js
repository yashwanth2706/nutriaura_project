function closeTopBar() {
  const topBar = document.getElementById('topBar');
  const navbar = document.querySelector('.navbar');
  const body = document.body;
  
  topBar.classList.add('hidden');
  navbar.style.top = '0';
  body.classList.add('top-bar-closed'); // Use class instead of inline style
  
  // Save preference
  localStorage.setItem('topBarClosed', 'true');
}

// Check if top bar was previously closed
if (localStorage.getItem('topBarClosed') === 'true') {
  document.getElementById('topBar').classList.add('hidden');
  document.querySelector('.navbar').style.top = '0';
  document.body.classList.add('top-bar-closed');
}
