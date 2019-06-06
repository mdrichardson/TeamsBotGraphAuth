import * as config from 'config';
import {App} from './app';

console.log(config);  

const app = new App(config);
app.init();
app.listen();