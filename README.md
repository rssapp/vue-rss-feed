# vue-rss-feed
A simple component to embed beautiful RSS feeds with Vuejs

## Demo
![](vue-rss-feed-demo.gif)


[demo](https://rssapp.github.io/vue-rss-feed/)

## Install

```bash
npm i vue-rss-feed
```

## Usage
Import VueRssFeed in your component

```js
import VueRssFeed from "../VueRssFeed.vue";
...
export default {
  name: "Demo",
  components: {
    VueRssFeed
  },
  data() {
    return {
      feedUrl: "https://rss.app/feeds/hmsyAr3PyniBpmOd.xml",
      name: "",
      limit: 5,
    };
  },
};
```

Then use it in your template

```HTML
<template>
 <VueRssFeed :feedUrl="feedUrl" :name="name" :limit="limit"/>
</template>
```

## Props


| name    | type   | default | description                       |
| ------- | ------ | ------- | --------------------------------- |
| feedUrl | String |         | RSS Feed URL                      |
| limit   | Number | 5       | Number of items to render         |
| Name    | String |         | Pass a name to replace feed title |

## Note

Due to CORS policy some RSS feeds can't be loaded in the browser.
You can load RSS feeds from your own server to get around this.


## License

MIT
