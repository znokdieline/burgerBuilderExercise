(this["webpackJsonpburger-basics--01-after-eject-and-css-modules"]=this["webpackJsonpburger-basics--01-after-eject-and-css-modules"]||[]).push([[5],{103:function(e,n,r){"use strict";r.r(n);var t=r(5),a=r(6),c=r(8),i=r(7),o=r(0),s=r.n(o),u=r(15),l=r(17),d=(r(99),function(e){var n=[];for(var r in e.ingredients)n.push({name:r,amount:e.ingredients[r]});var t=n.map((function(e){return s.a.createElement("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid #ccc",padding:"5px"},key:e.name},e.name," (",e.amount,")")}));return s.a.createElement("div",{className:"Order"},s.a.createElement("p",null,"Ingredientes: ",t),s.a.createElement("p",null,"Price: ",s.a.createElement("strong",null,"USD ",Number.parseFloat(e.price).toFixed(2))))}),p=r(35),m=r(16),f=r(34),b=function(e){Object(c.a)(r,e);var n=Object(i.a)(r);function r(){var e;Object(t.a)(this,r);for(var a=arguments.length,c=new Array(a),i=0;i<a;i++)c[i]=arguments[i];return(e=n.call.apply(n,[this].concat(c))).componentDidMount=function(){e.props.onFetchOrders(e.props.token,e.props.userId)},e}return Object(a.a)(r,[{key:"render",value:function(){var e=s.a.createElement(f.a,null);return this.props.loading||(e=this.props.orders.map((function(e){return s.a.createElement(d,{key:e.id,ingredients:e.ingredients,price:e.price})}))),s.a.createElement("div",null,e)}}]),r}(o.Component);n.default=Object(u.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(n,r){return e(m.d(n,r))}}}))(Object(p.a)(b,l.a))},99:function(e,n,r){}}]);
//# sourceMappingURL=5.f3a8d470.chunk.js.map