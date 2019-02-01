<template>
  <div v-if="error" class="error">{{error}}</div>
  <div v-else class="feed">
    <h1 v-if="name">{{name}}</h1>
    <h1 v-else>{{feed.title}}</h1>
    <div v-if="loading" class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div class="articles-container">
      <Article
        v-for="(article, index) of getArticles()"
        v-bind:key="index"
        v-bind:article="article"
      />
    </div>
  </div>
</template>

<script>
import Article from "./Article.vue";
import RSSParser from "rss-parser";

export default {
  name: "Feed",
  components: {
    Article
  },
  props: {
    feedUrl: String,
    name: String,
    limit: Number,
    loadMore: Boolean
  },
  data() {
    return {
      loading: true,
      error: "",
      feed: {}
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    feedUrl() {
      this.fetchData();
    },
    limit(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getArticles();
      }
    }
  },
  methods: {
    async fetchData() {
      this.error = "";
      this.loading = true;
      this.feed = {};
      try {
        const data = await fetch(this.feedUrl);
        if (data.ok) {
          const text = await data.text();
          const parser = new RSSParser();
          parser.parseString(text, (err, parsed) => {
            this.loading = false;
            if (err) {
              this.error = `Error occured while parsing RSS Feed ${err.toString()}`;
            } else {
              this.feed = parsed;
            }
          });
        } else {
          this.error = "Error occured while fetching the feed";
          this.loading = false;
        }
      } catch (e) {
        if (e.toString() === "TypeError: Failed to fetch") {
          this.error = "Error due to CORS policy";
        } else {
          this.error = e.toString();
        }
        this.loading = false;
      }
    },
    getArticles() {
      if (this.feed.items && this.feed.items) {
        return this.feed.items.slice(0, this.limit);
      }
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 5px;
  font-size: 20px;
}
.feed {
  text-align: left;
}
a {
  color: #42b983;
}
/* CSS Spinner */
.spinner {
  margin: 40px auto 0;
  width: 150px;
  text-align: center;
}

.error {
  color: red;
}

.spinner > div {
  width: 18px;
  height: 18px;
  /* background-color: #ff641b; */
  background-color: #42b983;
  background-color: #777;
  margin-right: 10px;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
