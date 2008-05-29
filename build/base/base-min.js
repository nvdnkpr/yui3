YUI.add("base",function(F){var B=F.Lang,D=F.Object,A=":";F.CANCEL="yui:cancel";var E=F.EventTarget.prototype;function G(I,H){if(I.indexOf(A)===-1&&H.name){I=H.name+":"+I;}return I;}var C=function(){F.log("constructor called","life","Base");this.init.apply(this,arguments);};C.NAME="base";C._instances={};C.build=function(N,S,R){var V=C.build,J,T,Q,M,H,L,U=N.NAME;if(R){Q=R.aggregates;M=R.methods;L=R.dynamic;}if(L){J=V._template(N);S.splice(0,0,N);}else{J=N;}J._build={id:null,exts:[],dynamic:L};Q=(Q)?V.AGGREGATES.concat(Q):V.AGGREGATES;var I=S.length,P=Q.length,O;if(L){for(O=0;O<I;O++){T=S[O];F.mix(J,T,true);}if(Q){for(O=0;O<P;O++){var K=Q[O];if(D.owns(N,K)){J[K]=B.isArray(N[K])?[]:{};}}}}for(O=0;O<I;O++){T=S[O];if(Q){F.aggregate(J,T,true,Q);}F.augment(J,T,true);J._build.exts.push(T);U=U+":"+F.stamp(T);}if(M){for(O=0;O<M.length;O++){H=M[O];J.prototype[H]=V._wrappedFn(H);}}J._build.id=U;J.prototype.hasImpl=V._hasImpl;if(L){J.NAME=N.NAME;J.prototype.constructor=J;}return J;};F.mix(C.build,{AGGREGATES:["ATTRS","PLUGINS"],_template:function(H){function I(){var L=I._build.exts,J=L.length;for(var K=0;K<J;K++){L[K].apply(this,arguments);}return this;}return I;},_hasImpl:function(I){if(this.constructor._build){var K=this.constructor._build.exts,H=K.length,J;for(J=0;J<H;J++){if(K[J]===I){return true;}}}return false;},_wrappedFn:function(H){return function(){var M=this.constructor._build.exts,I=M.length,K,J,L;for(J=0;J<I;J++){K=M[J].prototype[H];if(K){L=K.apply(this,arguments);}}};}});C.create=function(I,K,J){var M=F.Base.build(I,K,{dynamic:true}),H=F.array(arguments,2,true);function L(){}L.prototype=M.prototype;return M.apply(new L(),H);};C.prototype={init:function(H){F.log("init called","life","Base");this.destroyed=false;this.initialized=false;this.name=this.constructor.NAME;if(this.fire("beforeInit")!==F.CANCEL){F.Base._instances[F.stamp(this)]=this;this._eventHandles={};this._initHierarchy(H);this.initialized=true;}return this;},destroy:function(){F.log("destroy called","life","Base");if(this.fire("beforeDestroy")!==F.CANCEL){this._destroyHierarchy();this.destroyed=true;this.fire("destroy");}return this;},attachListeners:function(K,J,I){var L=this._eventHandles,H;if(!L[K]){L[K]=H=[];F.each(J,function(O,N,M){if(N.indexOf(":")!==-1){H[H.length]=F.on(N,O);}else{H[H.length]=this.on(N,O);}},this);}else{if(I){this.detachListeners(K);this.attachListeners(K,J);}}},detachListeners:function(K){var L=this._eventHandles;var I=L[K];if(I){var H=I.length;for(var J=0;J<H;J++){J.detach();}delete L[K];}},_getClasses:function(){if(!this._classes){var I=this.constructor,H=[];while(I&&I.prototype){H.unshift(I);I=I.superclass?I.superclass.constructor:null;}this._classes=H;}return this._classes.concat();},_initHierarchy:function(M){var L,J=this._getClasses();for(var I=0,H=J.length;I<H;I++){L=J[I];if(L._build&&L._build.exts&&!L._build.dynamic){for(var N=0,K=L._build.exts.length;N<K;N++){L._build.exts[N].apply(this,arguments);}}this._initAtts(L.ATTRS,M);if(D.owns(L.prototype,"initializer")){L.prototype.initializer.apply(this,arguments);}}},_destroyHierarchy:function(){var H=this.constructor;while(H&&H.prototype){if(D.owns(H.prototype,"destructor")){H.prototype.destructor.apply(this,arguments);}H=H.superclass?H.superclass.constructor:null;}},toString:function(){return F.Base.NAME+"["+"]";},on:function(){return this.subscribe.apply(this,arguments);},subscribe:function(){var H=arguments;H[0]=G(H[0],this);return E.subscribe.apply(this,H);},fire:function(){var H=arguments;if(B.isString(H[0])){H[0]=G(H[0],this);}else{if(H[0].type){H[0].type=G(H[0].type,this);}}return E.fire.apply(this,H);},publish:function(){var H=arguments;H[0]=G(H[0],this);return E.publish.apply(this,H);}};F.augment(C,F.Attribute);F.Base=C;},"@VERSION@",{requires:["attribute"]});