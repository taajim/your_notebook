/* =========================================================
   BLOG-FILTER.JS — Topic tabs + live search for blog.html
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.filter-tab');
  var searchInput = document.getElementById('postSearch');
  var cards = document.querySelectorAll('#blogGrid .blog-card');
  var emptyState = document.getElementById('emptyState');
  var activeTopic = 'all';

  function applyFilters() {
    var query = (searchInput && searchInput.value.trim().toLowerCase()) || '';
    var visibleCount = 0;

    cards.forEach(function (card) {
      var topic = card.getAttribute('data-topic');
      var title = card.getAttribute('data-title') || '';

      var matchesTopic = activeTopic === 'all' || topic === activeTopic;
      var matchesSearch = query === '' || title.indexOf(query) !== -1;

      if (matchesTopic && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      activeTopic = tab.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Pre-select topic tab if URL has ?topic=
  var params = new URLSearchParams(window.location.search);
  var topicParam = params.get('topic');
  if (topicParam) {
    var matchingTab = document.querySelector('.filter-tab[data-filter="' + topicParam + '"]');
    if (matchingTab) {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      matchingTab.classList.add('is-active');
      activeTopic = topicParam;
      applyFilters();
    }
  }
});
