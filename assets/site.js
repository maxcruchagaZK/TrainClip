(function(){
  var isEn=(document.documentElement.lang||'').indexOf('en')===0;
  var t=isEn?{
    name:'Enter your name.',mail:'Enter a valid email, like name@company.com.',company:'Enter your company name.',
    preview:'This is a preview: the form does not send messages yet.',sent:'We got your message',reply:'We will reply to ',
    fail:'We could not send your message. Check your connection and try again, or email us at ',
    subject:'Website contact: ',opened:'Your email app opened with the message ready. Send it from there so it reaches us.',
    labels:['Name','Email','Company','Package','What I need to teach']
  }:{
    name:'Escribe tu nombre.',mail:'Escribe un correo válido, como nombre@empresa.cl.',company:'Escribe el nombre de tu empresa.',
    preview:'Esta es una vista previa: el formulario todavía no envía mensajes.',sent:'Recibimos tu mensaje',reply:'Te responderemos a ',
    fail:'No pudimos enviar el mensaje. Revisa tu conexión e inténtalo otra vez, o escríbenos a ',
    subject:'Contacto web: ',opened:'Se abrió tu programa de correo con el mensaje listo. Envíalo desde ahí para que nos llegue.',
    labels:['Nombre','Correo','Empresa','Paquete','Qué quiero enseñar']
  };
  /* Eventos de GA4. Si la etiqueta no cargó, no hacen nada. */
  function track(name,params){if(window.gtag)window.gtag('event',name,params||{});}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    var href=a.getAttribute('href');
    if(href.indexOf('https://wa.me/')===0)track('whatsapp_click');
    else if(href.indexOf('mailto:')===0)track('email_click');
  });

  /* Solo suena un video a la vez. video_play cuenta la primera reproducción de cada video. */
  var clips=[].slice.call(document.querySelectorAll('.clips video'));
  clips.forEach(function(v){
    var counted=false,src=v.querySelector('source');
    v.addEventListener('play',function(){
      clips.forEach(function(o){if(o!==v)o.pause();});
      if(counted)return;
      counted=true;
      track('video_play',{video_language:/muestra-en/.test(src?src.getAttribute('src'):'')?'en':'es'});
    });
  });

  /* Los botones de cada paquete dejan elegido ese paquete en el formulario. */
  var form=document.getElementById('form-contacto');
  if(!form)return;
  var select=document.getElementById('paquete');
  document.querySelectorAll('[data-package]').forEach(function(a){
    a.addEventListener('click',function(){select.value=a.dataset.package;});
  });

  var rules={
    nombre:function(v){return v?'':t.name;},
    correo:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':t.mail;},
    empresa:function(v){return v?'':t.company;}
  };
  function check(id){
    var el=document.getElementById(id),msg=rules[id](el.value.trim()),err=document.getElementById(id+'-error');
    err.textContent=msg;err.hidden=!msg;
    if(msg)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');
    return !msg;
  }
  Object.keys(rules).forEach(function(id){
    var el=document.getElementById(id);
    el.addEventListener('blur',function(){if(el.value.trim()||el.hasAttribute('aria-invalid'))check(id);});
  });

  var notice=document.getElementById('form-aviso'),btn=form.querySelector('button[type=submit]');
  function say(text,bad){notice.textContent=text;notice.hidden=false;notice.classList.toggle('bad',!!bad);}
  function success(title,text){
    var d=document.getElementById('form-listo');
    d.querySelector('h3').textContent=title;d.querySelector('p').textContent=text;
    form.hidden=true;d.hidden=false;d.focus();
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=Object.keys(rules).filter(function(id){return !check(id);});
    if(bad.length){document.getElementById(bad[0]).focus();return;}
    if(form.elements.sitio.value)return;
    var data=new FormData(form),mail=form.dataset.mail,end=form.dataset.endpoint;
    data.delete('sitio');

    if(form.dataset.preview){
      say(t.preview);return;
    }
    if(end){
      btn.disabled=true;notice.hidden=true;
      data.append('subject',t.subject+data.get('empresa'));
      data.append('from_name','TrainClip');
      data.append('replyto',data.get('correo'));
      var stop=new AbortController();setTimeout(function(){stop.abort();},15000);
      fetch(end,{method:'POST',body:data,headers:{Accept:'application/json'},signal:stop.signal}).then(function(r){
        if(!r.ok)throw new Error(r.status);
        return r.json();
      }).then(function(res){
        if(String(res.success)==='false')throw new Error(res.message||'not sent');
        track('generate_lead',{package:data.get('paquete')});
        success(t.sent,t.reply+data.get('correo')+'.');
      }).catch(function(){
        btn.disabled=false;
        say(t.fail+mail+'.',true);
      });
      return;
    }
    var body=['nombre','correo','empresa','paquete','mensaje']
      .map(function(k,n){return t.labels[n]+': '+(data.get(k)||'');}).join('\n');
    location.href='mailto:'+mail+'?subject='+encodeURIComponent(t.subject+data.get('empresa'))+'&body='+encodeURIComponent(body);
    say(t.opened);
  });
})();
