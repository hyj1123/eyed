<template>
  <div id="app">
    <div class="big-border">
      <div class="head" :style="{'background-image': `url(${personal.backgroundImage})`}">
        <div class="photo"><img :src="personal.logo"/></div>
        <div class="type" v-text="personal.nickName"></div>
      </div>
      <!--<button @click="test">测试</button>-->
      <div class="navigative">
        <div class="navigation">
          <div class="na-icon">
            <img src="./images/mine_icon_win@2x.png"/>
            <p>添加好友</p>
          </div>
          <div class="na-icon">
            <img src="./images/mine_icon_location@2x.png" />
            <p>即时通讯</p>
          </div>
          <div class="na-icon">
            <img src="./images/mine_icon_introduce@2x.png"/>
            <p>分享</p>
          </div>
          <div class="na-icon">
            <img src="./images/icon_share_n@2x.png"/>
            <p>更多</p>
          </div>
        </div>
        <div class="matters">
          <div class="ma-icon">
            <img :src="personal.logo" style="width: 40px;height: 40px;border-radius: 50%;margin-left: 16px"/>
            <span style="margin-left: 10px">分享新鲜事</span>
            <img src="./images/personal_shoot_n@2x.png" style="width: 40px;height: 40px;position: absolute;right: 46px "/>
            <img src="./images/personal_article_n@2x.png" style="width: 40px;height: 40px;position: absolute;right: 0"/>
          </div>
        </div>
        <div class="signature">个性签名</div>
        <div class="cut-off"></div>
        <div class="personal">
          <div class="creation">
            <img src="./images/mine_personal_focus@2x.png"/>
            我创建的社群（<span v-text="personal.createNum"></span>）
          </div>
          <div class="creation">
            <img src="./images/mine_icon_add@2x.png"/>
            我加入的社群（<span v-text="personal.joinNum"></span>）
          </div>
          <div class="creation">
            <img src="./images/mine_icon_city@2x.png"/>
            未设置
          </div>
          <div class="creation">
            <img src="./images/mine_icon_label@2x.png"/>
            <div v-if="personal.newLabel.length" class="bglabel">
              <span v-for="i in personal.newLabel" v-text="i" class="morelabel"></span>
            </div>
            <div v-else>
              <span>未设置标签，快去设置一个吧！</span>
            </div>
          </div>
        </div>
        <template v-for="j in data">
          <div class="">
            <div class="theme">
              <div class="touxiang">
                <img  :src="personal.logo" />
              </div>
              <div class="name">
                <span v-text="j.nickName"></span>
              </div>
              <div  class="time">
                <span style="color: #b7b7b7">{{ j.publishDate|transformTime }}</span>
              </div>
            </div>
            <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" width="100%" height="209px"
                   :poster="j.videopg" data-setup="{}">
              <source :src="j.contentPath" type="video/mp4">
            </video>
            <div class="matter">
              <div class="byline" v-text="j.title"></div>
              <div class="by-matter" v-text="j.content"></div>
            </div>
            <div class="comment">
              <div class="bg-comment">
                <div class="zan">
                  <img src="./images/icon_like_n@2x.png"/>
                  <span v-text="j.commentsCount"></span>
                </div>
                <div class="tupian">
                  <img src="./images/icon_collect_n@2x.png"/>
                  <span v-text="j.thumbCount"></span>
                </div>
              </div>
              <div class="share">
                <img src="./images/icon_share_n@2x.png"/>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        data:[],
        personal:{
          newLabel: []
        }
      }
    },
    methods: {
//    test() {
//      console.log(this.$route.query.aa);
//    },
      personalDatas() {
//      var  getUrlStr = function(name){
//        var userId=getUrlStr("userId");
//        var anotherUserId=getUrlStr("anotherUserId");
//        let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
//        if(reg.test(window.location.href)){
//          return unescape(RegExp.$2.replace(/\+/g," "))
//        }
//        return undefined
//      }
//      let  userId = this.$route.query.userId ;
//      let  anotherUserId = this.$route.query.anotherUserId ;
//      var userId = getQueryString("userId");
//      var anotherUserId = getQueryString("anotherUserId");
//      var url = window.location.host;
//      function getQueryString(name) {
//        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//        var r = window.location.search.substr(1).match(reg);
//        if (r != null)
//          return decodeURIComponent(r[2]);
//        return null;
//      }
        let _this = this;
//      this.$http.get('/app/mine/selectUserByShare.do?userId=137&anotherUserId=227').then(function(body) {
        this.$http.get('/app/app/mine/selectUserByShare.do?userId="+userId+"&anotherUserId="+anotherUserId').then(function(body) {
          _this.personal.backgroundImage = `http://imagep.myeyed.cn/${body.data.result.backgroundImage}`;
          _this.personal.logo = `http://imagep.myeyed.cn/${body.data.result.logo}`;
          _this.personal.createNum = `${body.data.result.createNum}`;
          _this.personal.joinNum = `${body.data.result.joinNum}`;
          _this.personal.nickName = `${body.data.result.nickName}`;
          let newLabel = body.data.result.abilityLabel.split(",");
          for(let i = 0;i<newLabel.length;i++) {
            newLabel[i] = `#${newLabel[i]}`;
//          console.log(newLabel[i]);
          }
          _this.personal.newLabel = newLabel;
          console.log(newLabel);
//          item.label = newLabel;
//        _this.gpHomeHeader.chatRoomNum = `${body.data.result.gpHomeHeader.chatRoomNum}个聊天室`;
//        _this.gpHomeHeader.vedioRoomNum = `${body.data.result.gpHomeHeader.vedioRoomNum}个直播室`;
//        _this.gpHomeHeader.noticeNum = `${body.data.result.gpHomeHeader.noticeNum}`;
          body.data.result.personTimeFlowResps.map(function(item) {
//          console.log(item);
            item.contentPath = `http://videop.myeyed.cn/${item.contentPath}`;
//          item.label = `#${item.label}`;
            item.videopg = `${item.contentPath.replace('.mp4','.png')}`;
//          let newLabel = item.label.split(",");
//          for(let i = 0;i<newLabel.length;i++) {
//            newLabel[i] = `#${newLabel[i]}`;
//          }
//          item.label = newLabel;
          })
          _this.data = body.data.result.personTimeFlowResps;
        })
//      this.data = [{name: "啦啦啦"},{name: "哈哈哈"},{name: "呀呀呀"}]
      }
    },
    created() {
      this.personalDatas();
    }
  }
</script>

<style>
  *{
    padding:0;
    margin: 0;
  }
  .big-border{
    width: 100%;
  }
  .head{
    width: 100%;
    height: 287px;
    /*background:url("./images/136609241591974054.png") no-repeat;*/
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 114px;
  }
  .video-js {
    width: 95% !important;
    margin: 0 auto;
  }
  .re-left{
    display: inline-block;
    float: left;
  }
  .re-right{
    float: right;
    height: 30px;
    background: #e01f54;
    border-radius: 20px;
    width: 72px;
    margin-right: 13px;
    margin-top: 5px;
  }
  .re-right img{
    vertical-align: text-bottom;
    margin-top: 5px;
    text-align: center;
    margin-left: 7px;
  }
  .re-right span{
    font-size: 20px;
    color: #ffffff;
    margin-left: 2px;
  }
  .user-name{
    color: #ffffff;
    font-size: 26px;
    padding-top: 33px;
    text-align: center;
    padding-left: 82px;
  }
  .photo{
    position: absolute;
    width: 154px;
    height: 154px;
    left: 50%;
    margin-left: -77px;
    top: 205px;
  }
  .photo img{
    width:100%;
    border-radius: 50%;
    border: 2px solid #ffffff;
  }
  .type{
    text-align: center;
    padding-top: 366px;
    font-size: 16px;
  }
  .navigation{
    display: flex;
    border-top:solid 1px  #ececec;
    border-bottom:solid 1px #ececec;
    height: 74px;
    font-size: 14px;
  }
  .na-icon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;
    font-size: 14px;
  }
  .message{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;
  }
  .na-icon img{
    width: 25px;
  }
  .na-icon p{
    padding: 8px 0;
  }
  .message p{
    padding-top: 9px;
  }
  .message img{
    width: 45px;
  }
  .label{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
  .label-cut{
    display: flex;
    margin-top: 5px;
    height: 20px;
    background: #ffffff;
    margin-bottom: 14px;
    font-size: 17px;
    color: #575757;
  }
  .bg-active{
    border-bottom: solid 2px red;
  }
  *{
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-tap-highlight-color: transparent;
  }
  input {
    -webkit-user-select: auto;
  }

  .theme{
    position: relative;
    height: 80px;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 18px;
    border-top: 10px solid #ececec;
  }
  .touxiang{
    overflow: hidden;
    padding-top: 22px;
    padding-left: 10px;
  }
  .touxiang img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .name{
    position: absolute;
    top:22px;
    left: 92px;
  }
  .ty{
    border: 1px solid #ececec;
    border-radius: 28px;
    position: absolute;
    top: 52px;
    left: 92px;
    width: 70px;
    color: #b5a6ff;
    text-align: center;
  }
  .time{
    position:absolute;
    top: 20px;
    right: 12px;
  }
  .comment{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 25px;
    border-top:solid 1px #ececec;
  }
  .comment > div:first-child {
    display: flex;
  }
  .comment span{
    margin-left: 5px;
    font-size: 16px;
  }
  .zan{
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    margin-top: 10px ;
    margin-left: 15px;
    height: 20px;
    background: #ffffff;
  }
  .information{
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    margin-top: 10px ;
    margin-left: 15px;
    height: 20px;
    background: #ffffff;
  }
  .tupian{
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    margin-top: 10px ;
    margin-left: 50px;
    height: 20px;
    background: #ffffff;
  }
  .share{
    margin-top: 10px ;
    margin-right: 15px;
    height: 20px;
    background: #ffffff;
  }
  .matter{
    color: #282828;
    margin: 14px 16px;
  }
  .discuss{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*border: solid 1px red;*/
    border-radius: 5px;
    height: 62px;
    width: 95%;
    margin: 0 auto;
    background-color: #f7f7f7;
  }
  .discuss span{
    font-size:14px;
  }
  .discuss > div:first-child {
    display: flex;
    align-items: center;
  }
  .bg-comment span{
    padding:0 5px;
    margin-top: 6px;
  }
  .bg-comment img{
    margin-top: 5px;
  }
  .discuss img{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    padding-left: 5px;
    vertical-align: text-bottom;
    text-align: center;
  }
  .my-video-dimensions {
    width: 95% !important;
    margin: 0 auto;
  }
  .navigation p{
    color: #b7b7b7;
    margin-right: 5px;
  }
  .all{
    color: #0096ff;
    margin-right: 5px;
  }
  .reply{
    color:#b7b7b7;
    margin-left: 8px;
  }
  .username{
    margin-left: 10px;
  }
  .byline{
    font-size: 18px;
  }
  .by-matter{
    font-size: 16px;
    margin-top: 7px;
  }
  .cut-off{
    height: 10px;
    background: #ececec;
  }
  .comment img{
    width: 25px;
    height: 25px;
  }
  .navigative{
    margin: 5px 0;
  }
  .signature{
    padding:23px 20px;
  }
  .matters{
    height: 65px;
    border-bottom:1px solid #ececec;
    display:flex ;
    /*flex-direction: column;*/
    /*align-items: center;*/
    width: 100%;
  }
  .ma-icon{
    display: flex;
    align-items: center;
  }
  .creation{
    display: flex;
    align-items:center;
  }
  .creation img{
    width: 20px;
    margin-right: 12px;
    padding: 10px;
  }
  .morelabel{
    border: 1px solid red;
    border-radius: 5px;
    padding: 3px;
    margin: 2px;
  }
  .bglabel{
    display: flex;
    flex-wrap: wrap;
  }

</style>
