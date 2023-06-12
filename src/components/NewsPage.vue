<template>
  <div class="container my-5">
    <h1>{{ article.title }}</h1>
    <hr>
    <p class="text-muted">{{ article.reporter }} - {{ article.pub_date }}</p>
    <hr>
    <div>{{ article.content }}</div>
    <br>
    <h5>뉴스 요약</h5>
    <div>{{ article.summary }}</div> 
    <br>
    <div style="display: flex;">
      <h5>키워드:</h5>
      <ul>
        <span v-for="(keyword, index) in article.keywords" :key="index"  @click="searchKeyword(keyword.keywordName)">{{ keyword.keywordName }}</span>
      </ul>
    </div>
  </div>
  <div v-if="isAuthenticated">
    <div style="display:flex" class="container">
      <b-form-input v-model="scrapOpinion" placeholder="Enter your opinion"  class="input-box" v-if="!article.scrap_opinion"></b-form-input>
      <div v-else>
        <b-form-input class="input-box" type="textarea" id="scrap_opinion" name="scrap_opinion" v-model="scrapOpinion">
        </b-form-input>
      </div>
      <b-button class="button1" variant="outline-primary" @click="saveScrapOpinion">Save Scrap Opinion</b-button>
      <b-button variant="outline-primary" @click="toggleBookmark" :class="{ 'bookmarked': isBookmarked }">
        {{ isBookmarked ? 'Bookmarked' : 'Bookmark' }}
      </b-button>
    </div>
  </div>

    <div v-if="this.keyword.length!=0" class="container my-5">
      <h5>{{this.keyword}}</h5>
      <hr/>
      <div
      v-for="(newsItem, index) in this.keywordnewsList"
      :key="index"
      class="my-list-group-item"
      :class="{ active: isActiveIndex === index }"
      @mouseenter="isActiveIndex = index"
      @mouseleave="isActiveIndex = null"
      @click="goToNews(newsItem.id)"
    >
      <div class="my-list-group-item-header">
        <span class="my-list-group-item-title" style="font-weight: bold">{{ newsItem.title }}</span>
      </div>
      <span class="my-list-group-item-content">
        {{ newsItem.summary }}
      </span>
    </div>
    <hr />
  </div>
</template>
  


<script>

import axios from "axios";

export default {
  props: {
    newsId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      article: {},
      scrapOpinion: "",
      isBookmarked: false, // 기본값으로 초기화
      keywordnewsList: [],
      keyword: ""
      };
  },

  mounted() {
    this.fetchArticle();
  },

  computed: {
    isAuthenticated() {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      return !!accessToken;
    }
  },

  methods: {
 fetchArticle() {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const apiUrlA = `https://job-brief-mjucapstone.com/api/news/member/${this.newsId}`;
    const apiUrl = `https://job-brief-mjucapstone.com/api/news/${this.newsId}`;
    const apiUrlToUse = this.isAuthenticated ? apiUrlA : apiUrl;
    console.log(apiUrlToUse);

    if (this.isAuthenticated ){
      axios
      .get(apiUrlToUse, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.article = response.data;
        this.isBookmarked = response.data.bookmarked;
        this.scrapOpinion = response.data.scrap_opinion;
        console.log(this.article);
      })
      .catch((error) => {
        console.error(error);
      });
    } else{
      axios
      .get(apiUrlToUse, {
      })
      .then((response) => {
        this.article = response.data;
        console.log(this.article);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },

  toggleBookmark() {
      if (this.isBookmarked) {
        this.removeBookmark();
      } else {
        this.addBookmark();
      }
    },

  saveScrapOpinion() {
      const accessToken = localStorage.getItem("accessToken");
      const scrapOpinionApiUrl = `https://job-brief-mjucapstone.com/api/scrap/new/${this.newsId}`;

      const requestData = {
        opinion: this.scrapOpinion 
      };

      axios
        .post(scrapOpinionApiUrl, requestData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
          },
        })
        .then(response => {
          alert('저장되었습니다!');
          this.article.scrap_opinion = this.scrapOpinion; // scrapOpinion 값을 뷰에 반영
        })
        .catch(error => {
          next('/login');
          alert('해당 기능에 접근 권한이 없습니다. 로그인창으로 넘어갑니다');
        });
  },

    addBookmark() {
      const bookmarkApiUrl = "https://job-brief-mjucapstone.com/api/bookmark/";
      const accessToken = localStorage.getItem('accessToken');

      axios
        .post(bookmarkApiUrl, { newsId: this.article.id }, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then(response => {
          this.isBookmarked = true;
          console.log("북마크 추가 완료");
        })
        .catch(error => {
          next('/login');
          alert('해당 기능에 페이지에 접근 권한이 없습니다. 로그인창으로 넘어갑니다');
        });
    },

    removeBookmark() {
      const bookmarkApiUrl = "https://job-brief-mjucapstone.com/api/bookmark/";
      const accessToken = localStorage.getItem('accessToken');
      axios
        .post(bookmarkApiUrl, { newsId: this.article.id }, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then(response => {
          this.isBookmarked = false;
          console.log("북마크 삭제 완료");
        })
        .catch(error => {
          next('/login');
          alert('해당 기능에 페이지에 접근 권한이 없습니다. 로그인창으로 넘어갑니다');
        });
    },
  searchKeyword(keywordName) {
    const apiUrl =  `https://job-brief-mjucapstone.com/api/keyword/search?keyword=${keywordName}`
    // alert(`Clicked on keyword: ${keywordName}`);
    this.keyword = keywordName;
    axios
        .get(apiUrl)
        .then((response) => {
          this.keywordnewsList = response.data.newsList;
          console.log( this.keywordnewsList );
        })
        .catch((error) => {
          console.error("API 오류:", error);
        });
  },
  goToNews(newsId) {
  console.log(newsId);
  window.location.href = `/newspage/${newsId}`;
}
  },
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: bold;
}

p {
  font-size: 1.25rem;
}

img {
  max-width: 100%;
}

.container {
  max-width: 800px;
}

ul span {
  display: inline-block;
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #f2f2f2;
  color: #333;
  border-radius: 5px;
  font-size: 0.9rem;
}

.input-box {
  width: 480px;
}

.button1 {
  margin-left: 10px;
  margin-right: 10px;
}

.scrap-opinion {
  margin-right: 10px;
}
s
.button-container {
  display: flex;
  align-items: center;
}

.bookmarked {
  background-color: #85b0fa !important;
  color: #ffffff !important;
}
</style>