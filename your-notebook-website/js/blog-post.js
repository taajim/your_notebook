/* =========================================================
   BLOG-POST.JS — Loads the right article based on ?post=slug
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get('post') || 'banker-algorithm';
  var post = (typeof BLOG_POSTS !== 'undefined' && BLOG_POSTS[slug]) || (typeof BLOG_POSTS !== 'undefined' && BLOG_POSTS['banker-algorithm']);

  if (!post) return;

  document.getElementById('pageTitle').textContent = post.title + ' — Mahu\'s Notebook';
  document.getElementById('postTopic').textContent = post.topic;
  document.getElementById('postTitle').textContent = post.title;
  document.getElementById('postDate').textContent = post.date;
  document.getElementById('postReadTime').textContent = post.readTime;
  document.getElementById('postCover').src = post.cover;
  document.getElementById('postCover').alt = post.title + ' — cover illustration';
  document.getElementById('postBody').innerHTML = post.body;

  var tagsEl = document.getElementById('postTags');
  if (tagsEl && post.tags) {
    tagsEl.innerHTML = post.tags.map(function (tag, i) {
      return '<li class="tag' + (i === 0 ? ' tag--rust' : '') + '">' + tag + '</li>';
    }).join('');
  }

  // Copy link button
  var copyBtn = document.getElementById('copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          copyBtn.textContent = 'Link copied!';
          setTimeout(function () { copyBtn.textContent = 'Copy link'; }, 2000);
        });
      }
    });
  }
});
