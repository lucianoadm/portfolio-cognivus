/* ==========================================================================
   analytics.js — contagem mínima de acessos (Firestore)
   Grava apenas: nome da página + data/hora do servidor. Sem dados pessoais.
   Respeita "Do Not Track" e "Global Privacy Control".

   A configuração web do Firebase NÃO é um segredo: a proteção real está nas
   Regras de Segurança do Firestore (veja firestore.rules e README.md).
   ========================================================================== */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBWKSAiSyyMN0Z-fpGfxL0VNRaCBRpn_Ps',
  authDomain: 'cognivus-platform.firebaseapp.com',
  projectId: 'cognivus-platform',
  storageBucket: 'cognivus-platform.firebasestorage.app',
  messagingSenderId: '517638561103',
  appId: '1:517638561103:web:f1001fb054c961f109793a'
};

const optedOut =
  navigator.doNotTrack === '1' ||
  window.doNotTrack === '1' ||
  navigator.globalPrivacyControl === true;

if (!optedOut) {
  try {
    const db = getFirestore(initializeApp(firebaseConfig));
    // addDoc devolve uma Promise: o try/catch sozinho não captura a rejeição.
    addDoc(collection(db, 'visitas_site'), {
      pagina: 'portfolio_clean_view',
      data_acesso: serverTimestamp()
    }).catch(() => { /* falha de analytics nunca deve afetar o visitante */ });
  } catch {
    /* idem */
  }
}
