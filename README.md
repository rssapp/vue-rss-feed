# vue-rss-feed
A simple componenet to embed beautiful RSS feeds with Vuejs

## Demo
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


| name            | type                             | default    | description                                                            |
| --------------- | -------------------------------- | ---------- | ---------------------------------------------------------------------- |
| feedUrl           | String                           |        | RSS Feed URL                                                           |
| limit          | Number                           | 5      | Number of items to render                                                          |
| Name           | String                          |        | Pass a name to show instead of feed title                                                     |


