(function(){
  document.querySelectorAll('form[data-mailto]').forEach(function(f){
    var note=f.querySelector('[data-status]');
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(!f.reportValidity()) return;
      var to=f.getAttribute('data-mailto'), biz=f.getAttribute('data-biz')||'';
      var lines=[], subj=f.getAttribute('data-subject')||'Service request';
      f.querySelectorAll('[data-label]').forEach(function(el){
        var v=(el.type==='checkbox'||el.type==='radio')?(el.checked?el.value:''):el.value.trim();
        if(el.type==='radio'&&!el.checked) return;
        if(v) lines.push(el.getAttribute('data-label')+': '+v);
      });
      var kind=f.querySelector('[data-subject-part]:checked')||f.querySelector('select[data-subject-part]');
      if(kind&&kind.value) subj+=' – '+kind.value;
      var url='mailto:'+to+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent('Hi '+biz+',\n\n'+lines.join('\n')+'\n\n(Sent from the sample site preview.)');
      if(note){note.hidden=false;}
      window.location.href=url;
    });
  });
  var m=document.querySelector('[data-menu]'),n=document.querySelector('[data-nav]');
  if(m&&n){m.addEventListener('click',function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)});
    n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');m.setAttribute('aria-expanded','false')})});}
  var h=document.querySelector('[data-sticky]');
  if(h){var fn=function(){h.classList.toggle('scrolled',window.scrollY>40)};fn();window.addEventListener('scroll',fn,{passive:true});}
})();
