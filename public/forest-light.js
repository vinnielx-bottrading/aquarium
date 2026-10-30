/* Final forest color treatment: whole tank layer, preserving opaque occlusion. */
const ForestLight={profile(night){return night?{filter:'brightness(.76) saturate(.86)',tint:'rgba(46,99,139,.17)',key:'rgba(165,211,244,.09)',shade:'rgba(4,23,40,.20)',water:[[0,'rgba(93,168,198,.12)'],[1,'rgba(12,64,93,.32)']]}:{filter:'brightness(.97) saturate(.94)',tint:'rgba(145,170,110,.07)',key:'rgba(255,238,176,.13)',shade:'rgba(23,62,47,.10)',water:[[0,'rgba(164,198,158,.09)'],[1,'rgba(42,109,91,.22)']]}}};
if(typeof module!=='undefined')module.exports=ForestLight;
