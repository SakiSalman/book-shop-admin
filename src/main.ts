import { createApp } from 'vue';
import App from './App.vue';
import { ref } from 'vue';
import './styles/main.css'
const app = createApp(App);

/* Configure Sweet alert */
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

app.use(VueSweetalert2);
/* Configure Sweet alert */

/* Configure the Host URL and Server URL */
import server from '../config/server.json';

const hostURL = ref('');
const serverURL = ref('');

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    hostURL.value = server.LocalHost.HOST_URL;
    serverURL.value = server.LocalHost.SERVER_URL;
} else {
    hostURL.value = server.prod.HOST_URL;
    serverURL.value = server.prod.SERVER_URL;
}

app.provide('hostURL', hostURL.value);
app.provide('serverURL', serverURL.value);
/* Configure the Host URL and Server URL */

/* Configure Vue Router */
import router from './router';

app.use(router);
/* Configure Vue Router */



app.mount('#app');
