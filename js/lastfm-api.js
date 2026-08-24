
var LastFmAPI = (function () {
  var API_KEY = 'f329f6f16e172d4957be4a8bdbf34cac';
  var BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

  function buildUrl(params) {
    params.api_key = API_KEY;
    params.format = 'json';
    var query = Object.keys(params)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
    return BASE_URL + '?' + query;
  }

  function request(params) {
    if (!API_KEY || API_KEY === 'YOUR_LASTFM_API_KEY') {
      return Promise.reject(new Error('Missing Last.fm API key. Set API_KEY in js/lastfm-api.js.'));
    }
    return fetch(buildUrl(params)).then(function (response) {
      if (!response.ok) {
        throw new Error('Last.fm request failed with status ' + response.status);
      }
      return response.json();
    }).then(function (data) {
      if (data.error) {
        throw new Error(data.message || 'Last.fm API error ' + data.error);
      }
      return data;
    });
  }

  function getArtistInfo(artistName) {
    return request({ method: 'artist.getinfo', artist: artistName }).then(function (data) {
      var artist = data.artist || {};
      var stats = artist.stats || {};
      var bioSummary = artist.bio && artist.bio.summary
        ? artist.bio.summary.replace(/<a[^>]*>.*<\/a>/, '').trim()
        : '';
      return {
        name: artist.name,
        listeners: stats.listeners ? Number(stats.listeners) : null,
        playcount: stats.playcount ? Number(stats.playcount) : null,
        bioSummary: bioSummary,
        url: artist.url
      };
    });
  }

  function getTopArtists(limit) {
    return request({ method: 'chart.gettopartists', limit: limit || 6 }).then(function (data) {
      var artists = (data.artists && data.artists.artist) || [];
      return artists.map(function (artist) {
        return {
          name: artist.name,
          listeners: artist.listeners ? Number(artist.listeners) : null,
          playcount: artist.playcount ? Number(artist.playcount) : null,
          url: artist.url
        };
      });
    });
  }

  function formatCount(n) {
    if (n === null || n === undefined) return null;
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  }

  return {
    getArtistInfo: getArtistInfo,
    getTopArtists: getTopArtists,
    formatCount: formatCount
  };
})();
