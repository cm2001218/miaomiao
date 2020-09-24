<template>
  <div class="movie_body">
    <Loading v-if="isLoading"></Loading>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="200"
      infinite-scroll-immediate-check="false"
    >
      <li v-for="(data, index) in movieList" :key="index" @click="handleToDetail(data.filmId)">
        <div class="pic_show">
          <img :src="data.poster" />
        </div>
        <div class="info_list">
          <h2>{{ data.name }}</h2>
          <p>
            Grades:
            <span class="grade">{{ data.grade }}</span>
          </p>
          <p>Actors: {{ data.actors | filterActors }}</p>
          <p>Runtime:{{ data.runtime }}minutes</p>
        </div>
        <div class="btn_mall">Tickets</div>
      </li>
    </ul>
    <div v-show="isShow" class="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  name: "Nowplaying",
  data() {
    return {
      movieList: [],
      preCityId: -1,
      pageNum: 1,
      total: 0,
      isShow: false,
      isLoading: false,
    };
  },
  filters: {
    filterActors(list) {
      if (!list) {
        return;
      }
      return list
        .map((item) => {
          if (item) {
            return item.name;
          }
        })
        .join(",");
    },
  },
  activated() {
    let cityId = this.$store.state.city.id;
    let cityName = this.$store.state.city.name;
    console.log(cityId, cityName);
    console.log(this.preCityId);
    if (cityId === this.preCityId) {
      return;
    }
    this.isLoading = true;
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=4271989`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      console.log(res.data);
      this.movieList = res.data.data.films;
      this.isLoading = false;
      this.preCityId = cityId;
      this.total = res.data.data.total;
    });
  },
  methods: {
    loadMore() {
      if (this.movieList.length === this.total) {
        this.isShow = false;
        return;
      }
      this.loading = true;
      this.isShow = true;
      this.axios({
        url: `https://m.maizuo.com/gateway?cityId=${
          this.preCityId
        }&pageNum=${++this.pageNum}&pageSize=10&type=1&k=4271989`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        if (res.data.msg === "ok") {
          this.movieList = [...this.movieList, ...res.data.data.films];
          this.loading = false;
          this.isShow = false;
          console.log(this.movieList);
        }
      });
    },
    handleToDetail(filmId) {
      console.log("click");
      this.$router.push("/movie/detail/" + filmId);
      // this.$router.push("/cinema");
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "Loading...";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        // if (this.movieList.length === this.total) {
        //   this.pullDownMsg = "Load all already!";
        //   setTimeout(() => {
        //     this.pullDownMsg = "";
        //   }, 2000);
        //   return;
        // }
        // this.pageNum++;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body .loading {
  padding: 10px;
  font-size: 20px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 5;
  padding: 0;
  font-size: 1rem;
  border: none;
}
</style>
