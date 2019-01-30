import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Demo from './Demo.vue';

Vue.use(ElementUI);

new Vue({
  render: h => h(Demo),
}).$mount('#demo');
