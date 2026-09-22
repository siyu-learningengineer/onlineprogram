/* Shared tawk.to connection with an accessible bilingual launcher. */
window.Tawk_API = window.Tawk_API || {};
window.Tawk_LoadStart = new Date();
(function () {
  if (document.getElementById('tawk-widget-loader')) return;
  var api = window.Tawk_API;
  var ready = false;
  var chatRequested = false;
  var launcher = document.createElement('a');
  launcher.className = 'support-launcher';
  launcher.href = 'https://tawk.to/chat/6ab1db24f7bb3d3443bfeb23/1k33c01fl';
  launcher.target = '_blank';
  launcher.rel = 'noopener';
  launcher.setAttribute('aria-label', '在线咨询 · Chat with us');
  launcher.innerHTML = '<span class="support-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><path d="M26 21a11 11 0 1 0-18 3L4 29l9-3a11 11 0 0 0 13-5Z"/><path d="M10 13h12M10 18h8"/></svg></span><span><strong>在线咨询</strong><small lang="en">Chat with us</small></span><span class="support-unread" hidden aria-hidden="true">•</span>';
  document.body.appendChild(launcher);
  var panel = document.createElement('section');
  panel.className = 'support-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', '在线帮助 / Help');
  panel.innerHTML = `<button type="button" class="support-close" aria-label="关闭 / Close">×</button>
    <h2>你好，需要帮助吗？<small>Hello! How can we help?</small></h2>
    <p>课程、语言学习或留学问题，都可以在这里咨询。<small>Ask us about courses, languages or studying abroad.</small></p>
    <button type="button" class="support-chat">开始咨询 / Start chatting</button>
    <details><summary>留下联系方式（可选）<small>Leave your details (optional)</small></summary>
      <form>
        <label>姓名 / Name<input name="customer" required maxlength="100" autocomplete="name"></label>
        <label>联系方式（任选一种） / Contact method<select name="method"><option value="email">邮箱 / Email</option><option value="telephone">电话 / Phone</option><option value="wechat">微信 / WeChat</option><option value="whatsapp">WhatsApp</option></select></label>
        <label class="support-value-label">邮箱 / Email<input name="contact" type="email" required maxlength="200" autocomplete="email"></label>
        <p class="support-note">提交后，客服可通过所选方式联系你。<small>By submitting, you allow our team to contact you using these details.</small></p>
        <button type="submit">提交 / Submit</button>
        <p class="support-feedback" role="status"></p>
      </form>
    </details>`;
  document.body.appendChild(panel);
  var introTimer;
  var seenKey = 'onlineprogram-support-introduced';
  function markSeen() { try { localStorage.setItem(seenKey, '1'); } catch (_) {} }
  function showPanel() { clearTimeout(introTimer); markSeen(); panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); }
  function closePanel() { clearTimeout(introTimer); panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); }
  launcher.addEventListener('click', function (event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (panel.hidden) showPanel(); else closePanel();
  });
  panel.querySelector('.support-close').addEventListener('click', closePanel);
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !panel.hidden) { closePanel(); launcher.focus(); } });
  panel.querySelector('.support-chat').addEventListener('click', function () {
    closePanel();
    if (!ready) { window.open(launcher.href, '_blank', 'noopener'); return; }
    chatRequested = true;
    api.showWidget(); api.maximize();
  });
  var form = panel.querySelector('form');
  var method = form.elements.method;
  var contact = form.elements.contact;
  method.addEventListener('change', function () {
    var labels = {email:'邮箱 / Email', telephone:'电话（含国家区号） / Phone with country code', wechat:'微信号 / WeChat ID', whatsapp:'WhatsApp（含国家区号） / WhatsApp with country code'};
    panel.querySelector('.support-value-label').firstChild.textContent = labels[method.value];
    contact.type = method.value === 'email' ? 'email' : method.value === 'wechat' ? 'text' : 'tel';
    contact.autocomplete = method.value === 'email' ? 'email' : method.value === 'wechat' ? 'off' : 'tel';
    contact.value = '';
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var feedback = panel.querySelector('.support-feedback');
    if (!ready) { feedback.textContent = '客服正在连接，请稍后重试。 / Connecting. Please try again shortly.'; return; }
    var name = form.elements.customer.value.trim();
    var value = contact.value.trim();
    if (!name || !value) { feedback.textContent = '请填写姓名和一种联系方式。 / Enter your name and one contact detail.'; return; }
    var submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    feedback.textContent = '正在提交… / Sending…';
    api.setAttributes({'contact-name':name, 'contact-method':method.value, 'contact-detail':value}, function (error) {
      submit.disabled = false;
      feedback.textContent = error ? '未能提交，请重试或直接在线咨询。 / Could not submit. Please retry or start a chat.' : '已提交，我们会通过所选方式联系你。 / Submitted. Our team can contact you using your chosen method.';
      if (!error) { form.elements.customer.value = ''; contact.value = ''; }
    });
  });
  // Persist only the introduction flag, never contact details, in this browser.
  try { if (!localStorage.getItem(seenKey)) { markSeen(); introTimer = setTimeout(showPanel, 1800); } } catch (_) { /* No automatic prompt if persistence is unavailable. */ }
  api.onLoad = function () { ready = true; api.hideWidget(); };
  api.onChatMaximized = function () {
    if (!chatRequested) { api.minimize(); api.hideWidget(); return; }
    closePanel(); launcher.hidden = true; launcher.querySelector('.support-unread').hidden = true;
  };
  api.onChatMinimized = function () { chatRequested = false; api.hideWidget(); launcher.hidden = false; };
  api.onChatHidden = function () { launcher.hidden = false; };
  api.onChatMessageAgent = function () { if (!launcher.hidden) launcher.querySelector('.support-unread').hidden = false; };
  var script = document.createElement('script');
  script.id = 'tawk-widget-loader';
  script.async = true;
  script.src = 'https://embed.tawk.to/6ab1db24f7bb3d3443bfeb23/1k33c01fl';
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.head.appendChild(script);
})();
