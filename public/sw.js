if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let o={};const r=e=>s(e,c),t={module:{uri:c},exports:o,require:r};n[c]=Promise.all(i.map((e=>t[e]||r(e)))).then((e=>(a(...e),o)))}}define(["./workbox-946f13af"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/AFi6Ij2K8z9fmM4tJXw3P/_buildManifest.js",revision:"d15e8021ce73f5ec658a2481e9f54204"},{url:"/_next/static/AFi6Ij2K8z9fmM4tJXw3P/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/666-32abc19d8289460f.js",revision:"32abc19d8289460f"},{url:"/_next/static/chunks/framework-fe99aa755573eedd.js",revision:"fe99aa755573eedd"},{url:"/_next/static/chunks/main-33d58531812b7e6d.js",revision:"33d58531812b7e6d"},{url:"/_next/static/chunks/pages/_app-6f4ec7b391a72128.js",revision:"6f4ec7b391a72128"},{url:"/_next/static/chunks/pages/_error-fb68742d3cf986b6.js",revision:"fb68742d3cf986b6"},{url:"/_next/static/chunks/pages/index-bc142d2406329c40.js",revision:"bc142d2406329c40"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5a2f0c06753c08d5.js",revision:"5a2f0c06753c08d5"},{url:"/_next/static/css/e4a93cd2df2d3eb2.css",revision:"e4a93cd2df2d3eb2"},{url:"/android-icon-144x144.png",revision:"bef95166bb875dc69e27e795141ef31c"},{url:"/android-icon-192x192.png",revision:"e9358db78b1ba25ee35fc3b2becf962b"},{url:"/android-icon-36x36.png",revision:"bd4cc57eeeddfbc4cc370bd3cb14eb1d"},{url:"/android-icon-48x48.png",revision:"97a2cc01e1db7b0c39a2249d50288647"},{url:"/android-icon-72x72.png",revision:"c79c9a157d275709bc2b608c0dd2af43"},{url:"/android-icon-96x96.png",revision:"4ff130b24467bee57b6e7b9f2bd308ca"},{url:"/apple-icon-114x114.png",revision:"1225f903d63b613de367cb5f168758cd"},{url:"/apple-icon-120x120.png",revision:"6a8c3cb52d18de755cbba02b861c23b5"},{url:"/apple-icon-144x144.png",revision:"223557016627258150519e0b97239426"},{url:"/apple-icon-152x152.png",revision:"9711df1a7227dd40f79394af1c2eb30e"},{url:"/apple-icon-180x180.png",revision:"f61cc57e640cd19e51b57502d9bf0211"},{url:"/apple-icon-57x57.png",revision:"aaa8027b4af3327a12f2dd9c4142baab"},{url:"/apple-icon-60x60.png",revision:"545ae368dd9016326907c1b3b938b34f"},{url:"/apple-icon-72x72.png",revision:"f2371f325263df5b73df43a71436e1f0"},{url:"/apple-icon-76x76.png",revision:"1e4045e21449f290072dd445a0fc77ba"},{url:"/apple-icon-precomposed.png",revision:"a88e8db2e213de95ea713679d464e57d"},{url:"/apple-icon.png",revision:"a88e8db2e213de95ea713679d464e57d"},{url:"/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/favicon-16x16.png",revision:"e60f64ff5cfa1fe5cdff317a1032d32c"},{url:"/favicon-32x32.png",revision:"b05203ed74a8910f37db3922f7369c7d"},{url:"/favicon-96x96.png",revision:"a8cf9e0ac83db03fd4deab32667c80b9"},{url:"/favicon.ico",revision:"979644dd778c3a7088d76eb901debb65"},{url:"/icon.png",revision:"4e3ec6bea7b80691c121ef39fb0e2d6a"},{url:"/manifest.json",revision:"b7632f42a609e6336cfbb79f90397371"},{url:"/manifest2.json",revision:"b58fcfa7628c9205cb11a1b2c3e8f99a"},{url:"/ms-icon-144x144.png",revision:"223557016627258150519e0b97239426"},{url:"/ms-icon-150x150.png",revision:"da28c83cf90a94d7c2609addf845f9e3"},{url:"/ms-icon-310x310.png",revision:"5ae9054a6875a3fd4159cc7f49760d33"},{url:"/ms-icon-70x70.png",revision:"8f3d0454cdb62bb17a99bd76a080b3e1"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:i})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
