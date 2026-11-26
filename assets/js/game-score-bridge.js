/* Parent page integration. Call with actual iframe elements; same-origin HTTP required. */
window.installB5GameScoreBridge = function({warmFrame,warFrame,onScore}) {
  const config={warm:{frame:warmFrame,max:4,points:1},war:{frame:warFrame,max:6,points:2}};
  function receive(e){
    if(e.origin!==location.origin||!/^https?:$/.test(location.protocol))return;
    const d=e.data;
    if(!d||d.type!=='b5-game-score'||!Object.prototype.hasOwnProperty.call(config,d.game))return;
    const c=config[d.game];
    if(!c.frame||e.source!==c.frame.contentWindow||d.max!==c.max||!Number.isInteger(d.earned)||d.earned<0||d.earned>c.max)return;
    onScore(d.game,d.earned/c.max*c.points);
  }
  addEventListener('message',receive);
  return ()=>removeEventListener('message',receive);
};
