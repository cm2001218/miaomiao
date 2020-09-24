<template>
  <div>
    <!-- <Loading v-if="isLoading" /> -->
    <div class="city_hot">
      <h2>Hot Cities</h2>
      <ul>
        <li
          v-for="item in hotList"
          :key="item.cityId"
          @click="handleToCity(item.name, item.cityId)"
        >{{ item.name }}</li>
      </ul>
    </div>
    <mt-index-list ref="mylist">
      <mt-index-section :index="data.index" v-for="data in datalist" :key="data.index">
        <div
          v-for="city in data.list"
          :key="city.cityId"
          @click="handleToCity(city.name, city.cityId)"
        >
          <mt-cell :title="city.name"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
// import axios from "axios";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      datalist: [],
      hotList: [],
    };
  },

  mounted() {
    Indicator.open({
      text: "Loading...",
      spinnerType: "fading-circle",
    });
    // this.$refs.mylist.$el.style.height = document.documentElement.clientHeight - 350 + "px";
    // console.log(this.$refs.mylist.$el.style.height);
    this.axios({
      url: "https://m.maizuo.com/gateway?k=9360655",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1599886170284962490155009","bc":"210300"}',
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.datalist = this.handleList(res.data.data.cities);
      this.$nextTick(() => {
        Indicator.close();
      });
    });
  },
  methods: {
    // handleClick(id) {
    //   console.log(id);
    //   localStorage.setItem("cityId", id);
    //   this.$router.push("/cinema");
    // },
    handleToCity(name, id) {
      console.log("hot");
      this.$store.commit("city/CITY_INFO", {
        name,
        id,
      });
      window.localStorage.setItem("nowName", name);
      window.localStorage.setItem("nowId", id);
      this.$router.push("/movie/nowplaying");
    },
    handleList(list) {
      let firstLetter = [];
      let uniqueFirstLetter = [];
      let temp = [];
      let datalist = [];
      firstLetter = list.map((item) => item.pinyin.substring(0, 1));
      for (let i = 0; i < firstLetter.length; i++) {
        if (uniqueFirstLetter.indexOf(firstLetter[i]) === -1) {
          uniqueFirstLetter.push(firstLetter[i]);
        }
      }
      uniqueFirstLetter = uniqueFirstLetter
        .sort()
        .map((item) => item.toUpperCase());
      for (let i = 0; i < uniqueFirstLetter.length; i++) {
        temp = list.filter(
          (item) =>
            item.pinyin.substring(0, 1).toUpperCase() === uniqueFirstLetter[i]
        );
        datalist.push({
          index: uniqueFirstLetter[i],
          list: [...temp],
        });
      }
      this.hotList = list.filter((item) => item.isHot === 1);
      console.log(datalist);
      console.log(this.hotList);
      return datalist;
    },
  },
};
</script>
<style lang="scss" scoped>
.city_hot {
  margin-top: 20px;
}
.city_hot h2 {
  margin-top: 40px;
  padding-left: 15px;
  line-height: 35px;
  font-size: 18px;
  background: #f0f0f0;
  font-weight: normal;
  text-align: center;
}
.city_hot ul {
  margin-top: 0;
  margin-bottom: 10px;
}
.city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
</style>
