import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  get,
  set,
  ref,
  update,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword,signInAnonymously,updateEmail,updateProfile  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBhO37eW2-8cWiHjOVs50O4BgcggWVQV0",
  authDomain: "webcoursovaya.firebaseapp.com",
  databaseURL: "https://webcoursovaya-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webcoursovaya",
  storageBucket: "webcoursovaya.appspot.com",
  messagingSenderId: "681497932420",
  appId: "1:681497932420:web:b2bf3b036abd57c2f7c8d1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth()


// Проверка авторизации пользователя
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Пользователь авторизован, получаем его данные из Firestore
        const userRef = ref(database, 'users/' + user.uid);
        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            console.log('Абубек')
            // Заполнение информации о пользователе на странице
            if(userData){
                document.getElementById('username').textContent = userData.username;
            } else{
                
                document.getElementById('editProfileBtn').style.display = 'none';
                document.getElementById('username').textContent = "АНОНИМ";
            }
            if(userData){
                document.getElementById('useremail').textContent = userData.email ;
            } else{
                document.getElementById('useremail').textContent = "АНОНИМ";
            }
           
            
            // Если у пользователя есть URL аватара, устанавливаем его
            if (userData) {
                if(userData.avatarURL){
                document.getElementById('useravatar').src = userData.avatarURL;
                }else{
                    document.getElementById('useravatar').src = 'default_avatar_url'; // URL для стандартного аватара, если у пользователя нет своего
                }
            } else {
                document.getElementById('useravatar').src = 'default_avatar_url'; // URL для стандартного аватара, если у пользователя нет своего
            }
        });
    } else {
        // Пользователь не авторизован, перенаправляем на страницу входа
        window.location.href = '/catalog.html';
    }
});


document.getElementById('editProfileBtn').addEventListener('click', function() {
    document.getElementById('editProfileForm').style.display = 'block';
    // Заполните поля данными из базы данных или текущего профиля
});
document.getElementById('saveChangesBtn').addEventListener('click', async function() {
    const newUsername = document.getElementById('editUsername').value;
    const newEmail = document.getElementById('editEmail').value;
    const newAvatar = document.getElementById('editAvatarInput').files[0];
    // Получите текущего пользователя
    const user = auth.currentUser;

    try {



        // Если выбран новый аватар, загрузите его в Firebase Storage
        if (newAvatar) {
            const storage = getStorage(app);
            const storageReference =  storageRef(storage, `avatars/${user.uid}/${newAvatar.name}`);
            await uploadBytes(storageReference, newAvatar);
            let downloadURL = await getDownloadURL(storageReference);
            await update(ref(database, 'users/' + user.uid), {
                avatarURL: downloadURL
            });
        }
        // Обновите имя пользователя в Firebase Authentication
        await updateProfile(user, {
            displayName: newUsername,
            // photoURL: если у вас есть ссылка на фото профиля, вы можете также обновить ее здесь
        });

        // Обновите адрес электронной почты пользователя в Firebase Authentication
        await updateEmail(user, newEmail);

        // Обновите данные пользователя в базе данных
        await update(ref(database, 'users/' + user.uid), {
            username: newUsername,
            email: newEmail,
            
        });

        alert('Изменения сохранены успешно!');
        location.reload()
        // Обновите отображение данных на странице, если это необходимо
    } catch (error) {
        console.error("Ошибка при сохранении изменений:", error);
        alert('Произошла ошибка при сохранении изменений.');
    }
});