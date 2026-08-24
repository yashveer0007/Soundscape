function setupNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var list = document.querySelector('.nav-list');
  if (!toggle || !list) return;
  toggle.addEventListener('click', function () {
    list.classList.toggle('open');
    var isOpen = list.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function loadFavorites() {
  var saved = localStorage.getItem('soundscape-favorites');
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(list) {
  localStorage.setItem('soundscape-favorites', JSON.stringify(list));
}

function setupFavoriteButtons() {
  var buttons = document.querySelectorAll('.fav-btn');
  var favorites = loadFavorites();
  buttons.forEach(function (btn) {
    var id = btn.getAttribute('data-song-id');
    if (favorites.indexOf(id) !== -1) {
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = '♥';
    }
    btn.addEventListener('click', function () {
      var pressed = btn.getAttribute('aria-pressed') === 'true';
      var newState = !pressed;
      btn.setAttribute('aria-pressed', newState ? 'true' : 'false');
      btn.textContent = newState ? '♥' : '♡';
      var current = loadFavorites();
      if (newState) {
        if (current.indexOf(id) === -1) current.push(id);
      } else {
        current = current.filter(function (item) { return item !== id; });
      }
      saveFavorites(current);
    });
  });
}

function loadSavedEvents() {
  var saved = localStorage.getItem('soundscape-events');
  return saved ? JSON.parse(saved) : [];
}

function saveSavedEvents(list) {
  localStorage.setItem('soundscape-events', JSON.stringify(list));
}

function setupSaveEventButtons() {
  var buttons = document.querySelectorAll('.save-btn');
  var saved = loadSavedEvents();
  buttons.forEach(function (btn) {
    var id = btn.getAttribute('data-event-id');
    if (saved.indexOf(id) !== -1) {
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = 'Saved';
    }
  });
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-event-id');
      var pressed = btn.getAttribute('aria-pressed') === 'true';
      var newState = !pressed;
      var current = loadSavedEvents();
      if (newState) {
        if (current.indexOf(id) === -1) current.push(id);
      } else {
        current = current.filter(function (item) { return item !== id; });
      }
      saveSavedEvents(current);
      document.querySelectorAll('.save-btn[data-event-id="' + id + '"]').forEach(function (match) {
        match.setAttribute('aria-pressed', newState ? 'true' : 'false');
        match.textContent = newState ? 'Saved' : 'Save Event';
      });
    });
  });
}

function setupFollowButton() {
  var btn = document.querySelector('.follow-btn');
  if (!btn) return;
  var id = btn.getAttribute('data-artist-id');
  var key = 'soundscape-follow-' + id;
  if (localStorage.getItem(key) === 'true') {
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = 'Following';
  }
  btn.addEventListener('click', function () {
    var pressed = btn.getAttribute('aria-pressed') === 'true';
    var newState = !pressed;
    btn.setAttribute('aria-pressed', newState ? 'true' : 'false');
    btn.textContent = newState ? 'Following' : 'Follow Artist';
    localStorage.setItem(key, newState ? 'true' : 'false');
  });
}

function setupDiscoverFilters() {
  var chips = document.querySelectorAll('.filter-chips .filter-chip[data-filter]');
  var cards = document.querySelectorAll('[data-type]');
  if (chips.length === 0) return;
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      var filter = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        var type = card.getAttribute('data-type');
        if (filter === 'all' || filter === type) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function setupEventFilters() {
  var chips = document.querySelectorAll('.filter-chips .filter-chip[data-filter]');
  var cards = document.querySelectorAll('.event-card[data-event-type]');
  if (chips.length === 0 || cards.length === 0) return;
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      var filter = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        var type = card.getAttribute('data-event-type');
        if (filter === 'all' || filter === type) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function setupSearchForm() {
  var form = document.getElementById('discover-search-form');
  var input = document.getElementById('discover-search-input');
  if (!form || !input) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var query = input.value.trim().toLowerCase();
    var cards = document.querySelectorAll('.card[data-type]');
    cards.forEach(function (card) {
      var title = card.querySelector('.card-title');
      var text = title ? title.textContent.toLowerCase() : '';
      if (query === '' || text.indexOf(query) !== -1) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function loadTasks() {
  var saved = localStorage.getItem('soundscape-tasks');
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, title: 'Make a playlist for the road trip', done: false },
    { id: 2, title: 'Listen to Coral Radio new single', done: false },
    { id: 3, title: 'Get tickets for the Sticker Fest', done: false },
    { id: 4, title: 'Follow three new artists', done: false }
  ];
}

function saveTasks(tasks) {
  localStorage.setItem('soundscape-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  var list = document.getElementById('music-task-list');
  if (!list) return;
  var tasks = loadTasks();
  list.innerHTML = '';
  if (tasks.length === 0) {
    var empty = document.createElement('p');
    empty.className = 'empty-message';
    empty.textContent = 'No tasks yet. Add one below!';
    list.appendChild(empty);
    return;
  }
  tasks.forEach(function (task) {
    var item = document.createElement('li');
    item.className = 'task-item';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.id = 'task-' + task.id;
    checkbox.checked = task.done;
    checkbox.addEventListener('change', function () {
      var allTasks = loadTasks();
      allTasks.forEach(function (t) {
        if (t.id === task.id) t.done = checkbox.checked;
      });
      saveTasks(allTasks);
    });

    var label = document.createElement('label');
    label.className = 'task-title';
    label.setAttribute('for', 'task-' + task.id);
    label.textContent = task.title;

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'task-remove';
    remove.textContent = '✕';
    remove.setAttribute('aria-label', 'Remove task: ' + task.title);
    remove.addEventListener('click', function () {
      var allTasks = loadTasks().filter(function (t) { return t.id !== task.id; });
      saveTasks(allTasks);
      renderTasks();
    });

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(remove);
    list.appendChild(item);
  });
}

function setupAddTaskForm() {
  var form = document.getElementById('add-task-form');
  var input = document.getElementById('new-task-input');
  if (!form || !input) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (text === '') return;
    var tasks = loadTasks();
    var nextId = tasks.length > 0 ? Math.max.apply(null, tasks.map(function (t) { return t.id; })) + 1 : 1;
    tasks.push({ id: nextId, title: text, done: false });
    saveTasks(tasks);
    input.value = '';
    renderTasks();
  });
}

function setupLastfmArtistStats() {
  if (typeof LastFmAPI === 'undefined') return;
  var nodes = document.querySelectorAll('[data-lastfm-artist]');
  if (nodes.length === 0) return;
  nodes.forEach(function (node) {
    var artistName = node.getAttribute('data-lastfm-artist');
    var statsEl = node.querySelector('[data-lastfm-stats]');
    if (!statsEl) return;
    statsEl.textContent = 'Loading listener stats…';
    LastFmAPI.getArtistInfo(artistName).then(function (info) {
      var parts = [];
      if (info.listeners !== null) {
        parts.push(LastFmAPI.formatCount(info.listeners) + ' listeners');
      }
      if (info.playcount !== null) {
        parts.push(LastFmAPI.formatCount(info.playcount) + ' plays');
      }
      statsEl.textContent = parts.length ? parts.join(' · ') + ' (Last.fm)' : '';
    }).catch(function (err) {
      statsEl.textContent = '';
      console.warn('Last.fm artist lookup failed for ' + artistName + ':', err.message);
    });
  });
}

function setupLastfmTrending() {
  if (typeof LastFmAPI === 'undefined') return;
  var list = document.getElementById('trending-artists-list');
  if (!list) return;
  list.innerHTML = '<p class="empty-message">Loading trending artists…</p>';
  LastFmAPI.getTopArtists(6).then(function (artists) {
    if (artists.length === 0) {
      list.innerHTML = '<p class="empty-message">No trending data available right now.</p>';
      return;
    }
    list.innerHTML = '';
    artists.forEach(function (artist) {
      var item = document.createElement('a');
      item.className = 'card trending-card';
      item.href = artist.url || '#';
      item.target = '_blank';
      item.rel = 'noopener noreferrer';

      var body = document.createElement('div');
      body.className = 'card-body';

      var title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = artist.name;

      var stats = document.createElement('p');
      stats.className = 'artist-card-bio';
      var listeners = LastFmAPI.formatCount(artist.listeners);
      stats.textContent = listeners ? listeners + ' listeners on Last.fm' : 'Live from Last.fm';

      body.appendChild(title);
      body.appendChild(stats);
      item.appendChild(body);
      list.appendChild(item);
    });
  }).catch(function (err) {
    list.innerHTML = '<p class="empty-message">Couldn\'t load trending artists (' + err.message + ').</p>';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setupNavToggle();
  setupFavoriteButtons();
  setupSaveEventButtons();
  setupFollowButton();
  setupDiscoverFilters();
  setupEventFilters();
  setupSearchForm();
  renderTasks();
  setupAddTaskForm();
  setupLastfmArtistStats();
  setupLastfmTrending();
});
