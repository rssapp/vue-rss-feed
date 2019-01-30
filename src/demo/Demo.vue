<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <a href="https://rss.app" class="nav-left">
            <img width="30" height="30" alt="rss" src="../assets/logo.png">
            <div>RSS.app</div>
          </a>
        </el-col>
        <el-col :span="8">
          <div class="center">
            <h1>vue-rss-feed demo</h1>
          </div>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12">
          <div class="preview-vue-rss-feed">
            <VueRssFeed :feedUrl="feedUrl" :name="name" :limit="limit" :loadMore="loadMore"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="margin: 20px;"></div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="rssFeedForm"
            ref="rssFeedForm"
            @submit.native.prevent
          >
            <el-form-item label="Enter RSS Feed URL">
              <el-input placeholder="Enter RSS feed URL" v-model="rssFeedForm.feedUrl"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('rssFeedForm')">Submit</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import VueRssFeed from "../VueRssFeed.vue";

const PIXALS_FROM_BOTTOM = 200;

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
      loadMore: false,
      rssFeedForm: {
        feedUrl: "https://rss.app/feeds/hmsyAr3PyniBpmOd.xml"
      }
    };
  },
  mounted() {
    this.scrollEvent = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - PIXALS_FROM_BOTTOM
      ) {
        this.increaseLimit();
      }
    });
  },
  destroyed() {
    if (this.scrollEvent) {
      window.removeEventListener(this.scrollEvent);
    }
  },
  methods: {
    submitForm() {
      if (this.rssFeedForm.feedUrl) {
        this.feedUrl = this.rssFeedForm.feedUrl;
        // Reset limit
        this.limit = 5;
      }
    },
    increaseLimit(loadMore = 5) {
      this.limit += loadMore;
    }
  },
  watch: {
    getFeedUrl() {
      return this.feedUrl;
    }
  }
};
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  padding-top: 10px;
  height: 50px !important;
  border-bottom: 1px solid #eee;
}

.nav-left {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.el-button,
.el-button:focus {
  background-color: #ff641b;
  border-color: #ff641b;
}
.el-button:hover {
  background-color: #ff641b;
  border-color: #ff641b;
  opacity: 0.9;
}

.el-header h1 {
  margin: 0;
  font-weight: 400;
}

.center {
  text-align: center;
}

.nav-left img {
  margin-right: 5px;
}
.el-main {
  margin: auto;
  padding-top: 50px;
  max-width: 1300px;
  width: 100%;
  color: #2c3e50;
}

.el-col-12 {
  padding: 0 20px;
}
.el-form-item {
  margin-top: 30px;
}

.el-form--label-top .el-form-item__label {
  font-size: 20px;
  /* font-weight: bold; */
  color: #2c3e50;
  padding-bottom: 0;
}
</style>
