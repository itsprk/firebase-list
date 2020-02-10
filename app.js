const cafeList = document.querySelector('#name-list');
const form = document.querySelector('#add-name-form');

// creating element and appending it
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let cross = document.createElement('div');
    

   

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;
    cross.textContent = 'x';
    

    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(cross);
    

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation;
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('list').doc(id).delete();
    })

}

//getting data
/*db.collection('list').orderBy('name').get().then((snapshot) =>{
  snapshot.docs.forEach(doc => {
     renderCafe(doc);
  });
})*/

/* Update 
  db.collection('list').doc('75wNbNB4nekXZsXPAi89').update({
name: 'Popoye'
})

*/

//Reat time listner
db.collection('list').orderBy('name').onSnapshot(snapshot => {
   let changes = snapshot.docChanges();
   changes.forEach(change => {
      if(change.type == 'added'){
          renderCafe(change.doc);
      }else if(change.type == 'removed'){
          let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
          cafeList.removeChild(li);
      }
   });
})

//saving data
form.addEventListener('submit', (e)=> {
  e.preventDefault();
  db.collection('list').add({
      name: form.name.value,
      location: form.location.value
  });
  form.name.value = '';
  form.location.value = '';
})