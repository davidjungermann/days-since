(this["webpackJsonpdays-since"]=this["webpackJsonpdays-since"]||[]).push([[0],{49:function(e,t,n){},52:function(e,t,n){},54:function(e,t,n){},57:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n.n(r),c=n(38),s=n(42),i=n.n(s),u=(n(49),n(0)),o=n.n(u),j=n(1),f=n(12),b=n(13),l=n(43),p=n(19),d=n(28),O=Object(l.a)({apiKey:"AIzaSyD3JgRl5KWKzWo-tVXoMqKc5HZzoNr8r5Q",authDomain:"days-since-f2f53.firebaseapp.com",projectId:"days-since-f2f53",storageBucket:"days-since-f2f53.appspot.com",messagingSenderId:"770516759412",appId:"1:770516759412:web:6a858719defadfc696f221",measurementId:"G-EDN478SNWY"}),h=Object(p.e)(O),m=Object(d.c)(O);m.setPersistence(d.a);var x=Object(p.b)(h,"counters"),v=function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)(Object(p.b)(h,"counters"),{value:0,uid:t});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(j.a)(o.a.mark((function e(t,n){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object(p.g)(x,Object(p.j)("uid","==",t)),e.next=3,Object(p.d)(r);case 3:if(a=e.sent,"value"!==n){e.next=8;break}return e.abrupt("return",a.docs[0].data().value);case 8:if("ref"!==n){e.next=10;break}return e.abrupt("return",a.docs[0].id);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=Object(j.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object(p.c)(h,"counters",n),e.next=3,Object(p.i)(r,{value:t});case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),y=function(){var e=Object(j.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(p.f)(Object(p.c)(h,"counters","counter"),(function(e){t(e.get("value"))})),e.abrupt("return",n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=(n(52),n(7)),S=function(e){return Object(k.jsx)("div",{className:"emoji",role:"img","aria-label":e.label?e.label:"","aria-hidden":e.label?"false":"true",style:{fontSize:e.fontSize},children:e.symbol})},N=n(35),I=(n(54),function(e){var t=e.handleSignOut,n=e.uid,c=Object(r.useState)(null),s=Object(f.a)(c,2),i=s[0],u=s[1];Object(r.useEffect)((function(){if(n)return Object(j.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(n,"value");case 2:t=e.sent,u(t);case 4:case"end":return e.stop()}}),e)})))(),function(){return y(u)}}),[n]);var b=function(){var e=Object(j.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=6;break}return u(i+1),e.next=4,g(n,"ref");case 4:t=e.sent,w(i+1,t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(j.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=6;break}return u(0),e.next=4,g(n,"ref");case 4:t=e.sent,w(0,t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(k.jsxs)(a.a.Fragment,{children:[Object(k.jsxs)("div",{className:"title",children:[Object(k.jsx)("h1",{className:"heading",children:"Days Since \ud83d\udd25"}),Object(k.jsx)(S,{symbol:"",fontSize:50})]}),Object(k.jsx)("h1",{className:"counter",children:i}),Object(k.jsxs)("div",{className:"increment-reset",children:[Object(k.jsx)("div",{className:"emoji-container",onClick:b,children:Object(k.jsx)(S,{symbol:"\u2705",fontSize:100})}),Object(k.jsx)("div",{className:"emoji-container",onClick:l,children:Object(k.jsx)(S,{symbol:"\u274c",fontSize:100})})]}),Object(k.jsx)(N.a,{variant:"primary",onClick:t,children:"Sign Out"})]})}),C=n(31),z=function(e){var t=e.mode,n=e.handleAuthentication,a=Object(r.useState)("sign-in"===t?"Sign In":"Sign Up"),c=Object(f.a)(a,1)[0],s=Object(r.useState)(""),i=Object(f.a)(s,2),u=i[0],o=i[1],j=Object(r.useState)(""),b=Object(f.a)(j,2),l=b[0],p=b[1];return Object(k.jsxs)(C.a,{children:[Object(k.jsx)("h1",{children:c}),Object(k.jsx)(C.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:Object(k.jsx)(C.a.Control,{type:"email",placeholder:"Email",onChange:function(e){return o(e.target.value)}})}),Object(k.jsx)(C.a.Group,{className:"mb-3",controlId:"formBasicPassword",children:Object(k.jsx)(C.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return p(e.target.value)}})}),Object(k.jsx)(N.a,{variant:"primary",onClick:function(){return n(t,u,l)},children:c})]})},A=function(){var e=Object(j.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.h)(Object(p.c)(h,"users",t.uid),{email:t.email,created:t.metadata.creationTime,lastSignIn:t.metadata.lastSignInTime});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=(n(57),n(44)),B=function(){var e=Object(E.a)(m),t=Object(f.a)(e,1)[0],n=Object(b.f)();Object(r.useEffect)((function(){var e=m.onAuthStateChanged((function(e){n(e?"/":"/sign-up")}));return function(){return e()}}),[n]);var a=function(){var e=Object(j.a)(o.a.mark((function e(t,n,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"sign-in"===t?s(m,n,r):c(m,n,r);case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),c=function(){var e=Object(j.a)(o.a.mark((function e(t,n,r){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.b)(t,n,r);case 2:a=e.sent,A(a.user),v(a.user.uid);case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),s=function(){var e=Object(j.a)(o.a.mark((function e(t,n,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.d)(t,n,r);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),i=function(){var e=Object(j.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.e)(m);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(b.c,{children:[Object(k.jsx)(b.a,{path:"/",element:Object(k.jsx)(I,{handleSignOut:i,uid:null===t||void 0===t?void 0:t.uid})}),Object(k.jsx)(b.a,{path:"/sign-in",element:Object(k.jsx)(z,{mode:"sign-in",handleAuthentication:a})}),Object(k.jsx)(b.a,{path:"/sign-up",element:Object(k.jsx)(z,{mode:"sign-up",handleAuthentication:a})})]})})})};n(58);i.a.render(Object(k.jsx)(a.a.StrictMode,{children:Object(k.jsx)(c.a,{basename:"/days-since",children:Object(k.jsx)(B,{})})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.7d47ee3b.chunk.js.map