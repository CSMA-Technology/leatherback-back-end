/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START imports]
const firebase = require('firebase-admin');
// [END imports]
// [START initialize]
// Initialize the app with a service account, granting admin privileges
/** @type {any} */
const serviceAccount = require('../placeholders/leatherback-d54a5-93df3ddd67e0.json'); // this fiile contains the service account information for our project
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://leatherback-d54a5.firebaseio.com'
});
// [END initialize]

const db = firebase.firestore();

async function addDoc() {
  const res = await db.collection('users').add({
    name: {
      first_name: 'Ken',
      last_name: 'Chenault', 
      username: 'trkc'
    }
  });
  return res.id;
}

async function getDoc(id) {
  const user = await db.collection('users').doc(id).get();
  return user;
}

async function start() {
  const id = await addDoc();
  console.log('new doc with id: ' + id);
  const user = await getDoc(id);
  if (!user.exists) {
    console.log('no bueno');
  } else {
    console.log('new user data: ', user.data());
  }
}

start();