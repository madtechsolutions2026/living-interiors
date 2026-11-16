const menu=document.querySelector('#menu');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const projects=[...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
 projects.forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);
 document.querySelector('.gallery-expanded').classList.toggle('is-filtered',button.dataset.filter!=='all');
}));
const dialog=document.querySelector('#lightbox');let currentProject=0;
function visibleProjects(){return projects.filter(p=>!p.hidden)}
function showProject(index){const list=visibleProjects();currentProject=(index+list.length)%list.length;const p=list[currentProject];dialog.querySelector('img').src=p.dataset.image;dialog.querySelector('img').alt=p.querySelector('img').alt;dialog.querySelector('h3').textContent=p.dataset.title;document.querySelector('#image-count').textContent=`${String(currentProject+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}`}
projects.forEach(p=>p.addEventListener('click',()=>{showProject(visibleProjects().indexOf(p));dialog.showModal()}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
document.querySelector('#previous-image').addEventListener('click',()=>showProject(currentProject-1));
document.querySelector('#next-image').addEventListener('click',()=>showProject(currentProject+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showProject(currentProject-1)}if(e.key==='ArrowRight'){e.preventDefault();showProject(currentProject+1)}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const rooms={
 bedroom:{title:'Your own little retreat.',description:'Serene, inviting bedrooms designed for relaxation and rejuvenation. Contemporary, traditional, or somewhere in between—your comfort and personal style guide every decision.',image:'team.jpg',alt:'Bedroom with a burgundy upholstered headboard and integrated wardrobes',category:'BEDROOM',enquiry:'a bedroom design'},
 kitchen:{title:'The heart of your home.',description:'Kitchens that blend functionality with elegance. A space to cook, gather, and entertain, thoughtfully planned around the way you use it every day.',image:'kitchen.jpg',alt:'White kitchen with an island and warm wood flooring',category:'KITCHEN',enquiry:'a kitchen design'},
 drawing:{title:'Make yourself at home.',description:'Drawing rooms that balance sophistication and warmth. Welcoming layouts, carefully chosen furnishings, and harmonious colours make room for intimate gatherings and entertaining.',image:'drawing.jpg',alt:'A bright drawing room with seating and an open dining area',category:'DRAWING ROOM',enquiry:'a drawing room design'},
 commercial:{title:'A space that reflects your vision.',description:'The studio also designs commercial spaces, bringing the same collaborative approach to understanding your needs and creating a setting with its own identity. Talk to the team about your workplace or commercial brief.',image:'gallery-02.jpg',alt:'A sculptural wall detail illustrating the studio design language',category:'COMMERCIAL',enquiry:'a commercial interior'}
};
const roomTabs=[...document.querySelectorAll('[data-room]')];
function selectRoom(button){const room=rooms[button.dataset.room];roomTabs.forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1});document.querySelector('#service-panel').setAttribute('aria-labelledby',button.id);document.querySelector('#service-title').textContent=room.title;document.querySelector('#service-description').textContent=room.description;const img=document.querySelector('#service-image');img.src='assets/'+room.image;img.alt=room.alt;document.querySelector('#service-category').textContent=room.category;document.querySelector('#service-cta').href='https://wa.me/919355349747?text='+encodeURIComponent("Hello, I'd like to discuss "+room.enquiry+'.')}
roomTabs.forEach((button,index)=>{button.addEventListener('click',()=>selectRoom(button));button.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(index+1)%roomTabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(index-1+roomTabs.length)%roomTabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=roomTabs.length-1;if(next!==undefined){e.preventDefault();selectRoom(roomTabs[next]);roomTabs[next].focus()}})});
const palettes={calm:{title:'Quiet neutrals',copy:'Cream, soft sand, and a touch of warm wood. A little room to breathe.',image:'gallery-03.jpg',alt:'Cream curves and subtle wood tones',colours:['#eee7db','#d7c3a3','#a17d59','#746559']},warm:{title:'Warm & tactile',copy:'Rich wood, fluted glass, and muted brass. Warmth you can almost feel.',image:'gallery-07.jpg',alt:'Warm wood wardrobe and fluted glass',colours:['#dbc9ad','#ac8359','#73513c','#373632']},bold:{title:'Rich & expressive',copy:'Burgundy, smoky grey, and deep wood. A little drama, beautifully balanced.',image:'gallery-05.jpg',alt:'Burgundy bed and charcoal cabinetry',colours:['#e2d4c8','#803649','#494a49','#3c2921']}};
document.querySelectorAll('[data-palette]').forEach(button=>button.addEventListener('click',()=>{const p=palettes[button.dataset.palette];document.querySelectorAll('[data-palette]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelector('#palette-image').src='assets/'+p.image;document.querySelector('#palette-image').alt=p.alt;document.querySelector('#palette-title').textContent=p.title;document.querySelector('#palette-copy').textContent=p.copy;document.querySelectorAll('#palette-swatches i').forEach((swatch,index)=>swatch.style.backgroundColor=p.colours[index]);document.querySelector('#palette-cta').href='https://wa.me/919355349747?text='+encodeURIComponent('Hello, I love the '+p.title.toLowerCase()+' direction and would like to discuss my space.')}));
document.querySelector('#year').textContent=new Date().getFullYear();
const materialNotes={stone:{copy:'Organic veining turns a practical corner into a quiet focal point. Pattern brings the character; a restrained palette brings the calm.',index:'STONE'},wood:{copy:'Wood grain and fluted glass bring warmth and rhythm to everyday storage. The contrast is tactile, considered, and full of character.',index:'WOOD'},form:{copy:'A softened edge changes how a whole room feels. Sculpted surfaces and gentle lighting turn a plain wall into something quietly expressive.',index:'FORM'}};
document.querySelectorAll('[data-material]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-material]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});const material=materialNotes[button.dataset.material];document.querySelector('#material-description').textContent=material.copy;document.querySelector('#material-index').textContent=material.index}));
const roomLight=document.querySelector('#room-light');
roomLight.addEventListener('click',()=>{const on=roomLight.getAttribute('aria-pressed')!=='true';roomLight.setAttribute('aria-pressed',String(on));document.querySelector('.interior-footer').classList.toggle('lights-dimmed',!on);document.querySelector('#light-label').textContent=on?'Lights on':'Lights dimmed'});
const heroRoom=document.querySelector('#hero-room');
const heroSlides=[...document.querySelectorAll('[data-hero-slide]')];
const heroSlideButtons=[...document.querySelectorAll('[data-hero-select]')];
const heroPauseButton=document.querySelector('.hero-carousel-toggle');
const heroSlideNumber=document.querySelector('#hero-slide-number');
const heroImageCaption=document.querySelector('#hero-image-caption');
const reducedHeroMotion=matchMedia('(prefers-reduced-motion: reduce)');
const heroRotationDuration=6800;
let activeHeroSlide=0;
let heroRotationTimer;
let heroWipeTimer;
let heroManualPause=false;
let heroPointerPause=false;
let heroFocusPause=false;
let heroWasAdvancing=false;
function heroCarouselCanAdvance(){return !reducedHeroMotion.matches&&!heroManualPause&&!heroPointerPause&&!heroFocusPause&&!document.hidden}
function syncHeroCarouselPlayback(){
  clearTimeout(heroRotationTimer);
  const automaticMotion=!reducedHeroMotion.matches;
  const canAdvance=heroCarouselCanAdvance();
  if(canAdvance&&!heroWasAdvancing){heroRoom.classList.remove('is-carousel-playing');void heroRoom.offsetWidth;heroRoom.classList.add('is-carousel-playing')}
  heroRoom.classList.toggle('is-carousel-playing',automaticMotion);
  heroRoom.classList.toggle('is-carousel-paused',!canAdvance);
  heroPauseButton.hidden=!automaticMotion;
  heroPauseButton.setAttribute('aria-pressed',String(heroManualPause));
  heroPauseButton.setAttribute('aria-label',heroManualPause?'Resume automatic image changes':'Pause automatic image changes');
  heroPauseButton.querySelector('span').textContent=heroManualPause?'▶':'Ⅱ';
  if(canAdvance)heroRotationTimer=setTimeout(()=>setHeroSlide((activeHeroSlide+1)%heroSlides.length),heroRotationDuration);
  heroWasAdvancing=canAdvance;
}
function setHeroSlide(nextIndex){
  const index=(nextIndex+heroSlides.length)%heroSlides.length;
  if(index===activeHeroSlide)return;
  clearTimeout(heroWipeTimer);
  const outgoing=heroSlides[activeHeroSlide];
  const incoming=heroSlides[index];
  heroSlides.forEach((slide,slideIndex)=>{
    slide.classList.remove('is-active','is-wiping');
    slide.setAttribute('aria-hidden',String(slideIndex!==index));
  });
  outgoing.classList.add('is-active');
  incoming.classList.add('is-active','is-wiping');
  heroSlideButtons.forEach((button,buttonIndex)=>{
    const active=buttonIndex===index;
    button.classList.toggle('is-current',active);
    button.setAttribute('aria-pressed',String(active));
  });
  activeHeroSlide=index;
  heroSlideNumber.textContent=String(index+1).padStart(2,'0');
  heroImageCaption.textContent=incoming.dataset.caption;
  heroWipeTimer=setTimeout(()=>{
    outgoing.classList.remove('is-active');
    incoming.classList.remove('is-wiping');
  },1320);
  syncHeroCarouselPlayback();
}
heroSlideButtons.forEach((button,index)=>button.addEventListener('click',()=>setHeroSlide(index)));
heroPauseButton.addEventListener('click',()=>{heroManualPause=!heroManualPause;syncHeroCarouselPlayback()});
heroRoom.addEventListener('mouseenter',()=>{heroPointerPause=true;syncHeroCarouselPlayback()});
heroRoom.addEventListener('mouseleave',()=>{heroPointerPause=false;syncHeroCarouselPlayback()});
heroRoom.addEventListener('focusin',()=>{heroFocusPause=true;syncHeroCarouselPlayback()});
heroRoom.addEventListener('focusout',event=>{if(!heroRoom.contains(event.relatedTarget)){heroFocusPause=false;syncHeroCarouselPlayback()}});
document.addEventListener('visibilitychange',syncHeroCarouselPlayback);
reducedHeroMotion.addEventListener('change',syncHeroCarouselPlayback);
syncHeroCarouselPlayback();
const heroDetails={light:{kicker:'LIGHTING',title:'A little atmosphere.',copy:'A sculptural brass pendant adds a warm focal point, balanced by natural light and textured finishes.'},sofa:{kicker:'COMFORT',title:'Curves that welcome.',copy:'Soft upholstery, a generous seat, and a gently curved silhouette. Comfort sets the tone; earthy cushions add the character.'},stone:{kicker:'TEXTURE',title:'Naturally full of character.',copy:'Travertine, warm oak, and handmade clay. A tactile mix of materials makes a neutral room feel rich and personal.'}};
const heroDetailCard=document.querySelector('#hero-detail-card');const heroHotspots=[...document.querySelectorAll('[data-hero-detail]')];let lastHeroHotspot;
function closeHeroDetail(returnFocus=false){heroDetailCard.hidden=true;heroHotspots.forEach(b=>b.setAttribute('aria-expanded','false'));if(returnFocus&&lastHeroHotspot)lastHeroHotspot.focus()}
heroHotspots.forEach(button=>button.addEventListener('click',()=>{const wasOpen=button.getAttribute('aria-expanded')==='true';closeHeroDetail();if(wasOpen)return;lastHeroHotspot=button;const detail=heroDetails[button.dataset.heroDetail];document.querySelector('#hero-detail-kicker').textContent=detail.kicker;document.querySelector('#hero-detail-title').textContent=detail.title;document.querySelector('#hero-detail-copy').textContent=detail.copy;heroDetailCard.hidden=false;button.setAttribute('aria-expanded','true')}));
document.querySelector('#close-hero-detail').addEventListener('click',()=>closeHeroDetail(true));heroRoom.addEventListener('keydown',e=>{if(e.key==='Escape')closeHeroDetail(true)});document.addEventListener('click',e=>{if(!heroRoom.contains(e.target))closeHeroDetail()});
// Anchor the controls to image coordinates, accounting for the cover crop.
const heroImage=document.querySelector('.hero-day');const heroDetailPoints={light:[.53,.18],sofa:[.28,.63],stone:[.78,.76]};
function positionHeroDetails(){if(!heroImage.naturalWidth)return;const width=heroRoom.clientWidth,height=heroRoom.clientHeight,scale=Math.max(width/heroImage.naturalWidth,height/heroImage.naturalHeight);const renderedWidth=heroImage.naturalWidth*scale,renderedHeight=heroImage.naturalHeight*scale;const yPosition=matchMedia('(max-width:680px)').matches?.5:.55;heroHotspots.forEach(button=>{const point=heroDetailPoints[button.dataset.heroDetail];button.style.left=((width-renderedWidth)/2+point[0]*renderedWidth-button.offsetWidth/2)+'px';button.style.top=((height-renderedHeight)*yPosition+point[1]*renderedHeight-button.offsetHeight/2)+'px'})}
heroImage.addEventListener('load',positionHeroDetails);new ResizeObserver(positionHeroDetails).observe(heroRoom);positionHeroDetails();
const journey=document.querySelector('.room-journey');const journeyButtons=[...document.querySelectorAll('[data-journey-stage]')];const reducedJourneyMotion=matchMedia('(prefers-reduced-motion: reduce)');let journeyTimers=[];
const journeyCopy={idea:['It starts with your ideas.','A blank canvas. A world of possibilities.'],design:['Your space takes shape.','Layouts, materials, and furniture come together.'],home:['A place that feels like you.','Personal touches. Natural warmth. Everyday life.']};
function clearJourneyTimers(){journeyTimers.forEach(clearTimeout);journeyTimers=[]}
function setJourneyStage(stage){journey.dataset.stage=stage;journeyButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.journeyStage===stage)));document.querySelector('#journey-caption').textContent=journeyCopy[stage][0];document.querySelector('#journey-description').textContent=journeyCopy[stage][1]}
function playJourney(){clearJourneyTimers();if(reducedJourneyMotion.matches){journey.classList.add('has-started');setJourneyStage('home');return}journey.classList.add('is-resetting');journey.classList.remove('has-started');setJourneyStage('idea');journeyTimers.push(setTimeout(()=>{journey.classList.remove('is-resetting');journey.classList.add('has-started')},70));journeyTimers.push(setTimeout(()=>setJourneyStage('design'),1350));journeyTimers.push(setTimeout(()=>setJourneyStage('home'),2900))}
journeyButtons.forEach(button=>button.addEventListener('click',()=>{clearJourneyTimers();journey.classList.add('has-started');setJourneyStage(button.dataset.journeyStage)}));document.querySelector('.journey-replay').addEventListener('click',playJourney);
const journeyObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){playJourney();journeyObserver.disconnect()}},{threshold:.45});journeyObserver.observe(journey);
reducedJourneyMotion.addEventListener('change',()=>{if(reducedJourneyMotion.matches){clearJourneyTimers();journey.classList.add('has-started');setJourneyStage('home')}});


// Give each area a motion treatment based on its interior story.
const reducedScrollMotion=matchMedia('(prefers-reduced-motion: reduce)');
const revealSelector='main > section > *, .interior-footer > *, .gallery-expanded .project, .team-grid .person, .team-grid .person img, .approach .steps details, .service-tabs button, .values-choice, .material-sample, .interior-footer .footer-link-group, .hero-feature-card, .interior-footer .footer-room';
if(!reducedScrollMotion.matches&&'IntersectionObserver'in window){
  const revealItems=[...document.querySelectorAll(revealSelector)].filter(item=>!item.matches('.signature-overlay,.contact-orbit'));
  const motionFor=(item,index)=>{
    const section=item.closest('main > section');
    if(item.matches('.project'))return ['gallery-left','gallery-drop','gallery-right'][index%3];
    if(item.matches('.person img'))return 'portrait-image';
    if(item.matches('.person'))return index%2?'from-right':'from-left';
    if(item.matches('.material-sample'))return index%2?'sample-right':'sample-left';
    if(item.matches('.values-choice,.service-tabs button,.approach .steps details,.footer-link-group'))return 'list-row';
    if(item.matches('.hero-feature-card'))return 'feature-card';
    if(item.matches('.about-studio-image,.service-visual,.palette-board,.invitation-sketch,.invitation-card,.footer-room'))return 'curtain';
    if(item.matches('.signature > img'))return 'curtain';
    if(item.matches('.hero-image'))return 'hero-stage';
    if(section?.id==='values')return 'value-panel';
    if(section?.id==='philosophy')return index===0?'blueprint':'from-right';
    if(section?.classList.contains('studio-numbers'))return index===0?'from-left':'number-rise';
    if(section?.id==='services')return index===0?'from-left':'service-room';
    if(section?.id==='signature')return item.classList.contains('signature-caption')?'from-right':'from-left';
    if(section?.id==='spaces')return index===0?'from-left':'rise';
    if(section?.id==='details')return index===0?'from-left':'sample-board';
    if(section?.id==='palette')return index===0?'from-left':'curtain';
    if(section?.id==='process')return index===0?'from-left':'blueprint';
    if(section?.id==='team')return index===0?'from-left':'rise';
    if(section?.id==='visit')return index===0?'from-left':'paper-card';
    if(section?.id==='contact')return index===0?'from-left':'paper-card';
    if(section?.classList.contains('about-studio'))return index===0?'from-left':'curtain';
    if(item.closest('footer'))return index%2?'from-right':'rise';
    return index%2?'from-right':'rise';
  };
  revealItems.forEach(item=>{
    item.classList.add('scroll-reveal');
    const siblingIndex=[...item.parentElement.children].indexOf(item);
    item.dataset.revealMotion=motionFor(item,siblingIndex);
    item.style.setProperty('--reveal-delay',`${Math.min(siblingIndex,4)*78}ms`);
  });
  document.documentElement.classList.add('has-scroll-motion');
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  revealItems.forEach(item=>revealObserver.observe(item));
  // Also reveal what is already on screen, including when the browser restores a deep scroll position.
  let revealFrame=0;
  const revealInViewport=()=>{
    if(revealFrame)return;
    revealFrame=requestAnimationFrame(()=>{
      revealFrame=0;
      const viewportHeight=window.innerHeight;
      revealItems.forEach(item=>{
        if(item.classList.contains('is-visible'))return;
        const bounds=item.getBoundingClientRect();
        if(bounds.top<viewportHeight*.92&&bounds.bottom>viewportHeight*.08){
          item.classList.add('is-visible');
          revealObserver.unobserve(item);
        }
      });
    });
  };
  window.addEventListener('scroll',revealInViewport,{passive:true});
  window.addEventListener('resize',revealInViewport,{passive:true});
  requestAnimationFrame(revealInViewport);
}
const processSteps=[...document.querySelectorAll('.approach .steps details')];
if(!reducedScrollMotion.matches&&'IntersectionObserver'in window&&processSteps.length){
  const stepsRail=document.querySelector('.approach .steps');
  const processObserver=new IntersectionObserver(entries=>{
    const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top-window.innerHeight*.5)-Math.abs(b.boundingClientRect.top-window.innerHeight*.5))[0];
    if(!active)return;
    const activeIndex=processSteps.indexOf(active.target);
    processSteps.forEach((step,index)=>step.classList.toggle('is-current-step',index===activeIndex));
    stepsRail.style.setProperty('--step-progress',`${((activeIndex+1)/processSteps.length)*100}%`);
  },{rootMargin:'-38% 0px -38% 0px',threshold:0});
  processSteps.forEach(step=>processObserver.observe(step));
}
const valueStory=document.querySelector('.values-story');
if(valueStory){
  const valueButtons=[...valueStory.querySelectorAll('[data-value-choice]')];
  const valueImages=[...valueStory.querySelectorAll('[data-value-image]')];
  const values={
    comfort:{index:'01',caption:'Comfort you can feel.',intro:'Every room begins with the people who will call it home. Comfort, character and considered details shape each choice.',alt:'A light-filled living room arranged for relaxed everyday comfort.'},
    character:{index:'02',caption:'Character in every corner.',intro:'A sculpted surface, a favourite colour, a material with texture. Personal details give a space its own point of view.',alt:'A sculptural feature wall with abstract faces, fluted surfaces and warm integrated lighting.'},
    care:{index:'03',caption:'Care in every finish.',intro:'Good planning makes beauty work for real life. We consider how each finish, fitting and storage detail belongs together.',alt:'Display cabinetry paired with geometric mirrored wall panels.'}
  };
  let valueChangeTimer;
  valueButtons.forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.valueChoice;
    if(!values[key]||valueStory.dataset.activeValue===key)return;
    clearTimeout(valueChangeTimer);
    valueStory.classList.add('is-changing');
    valueChangeTimer=setTimeout(()=>{
      const value=values[key];
      valueStory.dataset.activeValue=key;
      document.querySelector('#values-index').textContent=value.index;
      document.querySelector('#values-caption').textContent=value.caption;
      document.querySelector('#values-intro').textContent=value.intro;
      valueButtons.forEach(choice=>{const active=choice===button;choice.classList.toggle('is-active',active);choice.setAttribute('aria-pressed',String(active))});
      valueImages.forEach(image=>{const active=image.dataset.valueImage===key;image.classList.toggle('is-active',active);image.alt=active?value.alt:'';if(active)image.removeAttribute('aria-hidden');else image.setAttribute('aria-hidden','true')});
      requestAnimationFrame(()=>valueStory.classList.remove('is-changing'));
    },150);
  }));
}
const mainHeader=document.querySelector('header');
const syncHeaderState=()=>mainHeader.classList.toggle('is-scrolled',window.scrollY>12);
syncHeaderState();window.addEventListener('scroll',syncHeaderState,{passive:true});

// Prepare the visitor's enquiry in WhatsApp; they review it before sending.
const enquiryForm=document.querySelector('#enquiry-form');
if(enquiryForm){
  enquiryForm.addEventListener('submit',event=>{
    event.preventDefault();
    const fields=new FormData(enquiryForm);
    const entries=[
      ['Name',fields.get('name')],['Contact number',fields.get('phone')],['Location',fields.get('location')],
      ['Project type',fields.get('projectType')],['Approximate area',fields.get('area')],
      ['Preferred timeline',fields.get('timeline')],['Estimated budget',fields.get('budget')],['Brief',fields.get('brief')]
    ].filter(([,value])=>String(value||'').trim());
    const message=['Hello, The Living Interiors. I would like to discuss a project.','',...entries.map(([label,value])=>`${label}: ${String(value).trim()}`)].join('\n');
    const whatsappUrl=`https://wa.me/919355349747?text=${encodeURIComponent(message)}`;
    const fallback=document.querySelector('#enquiry-fallback');
    fallback.href=whatsappUrl;fallback.hidden=false;
    window.open(whatsappUrl,'_blank','noopener,noreferrer');
    document.querySelector('#enquiry-status').textContent='Your WhatsApp draft is ready. Review the details there before sending.';
  });
}


