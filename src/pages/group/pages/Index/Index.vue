<template>
  <div id="app">
    <div class="big-border">
      <div class="head" :style="{'background-image': `url(${gpHomeHeader.coverImage})`}">
        <div class="return">
          <div class="re-left"><img src="./images/share_icon_return@2x.png" style="width: 35px;"/></div>
          <div class="re-right"><img src="./images/icon_flock_people.png" style="width: 20px"/><span v-text="gpHomeHeader.noticeNum"></span></div>
        </div>
        <div class="user-name" v-text="gpHomeHeader.gpName"></div>
        <div class="photo"><img :src="gpHomeHeader.logo"/></div>
        <div class="type">公开社群</div>
      </div>
      <div class="navigative">
        <div class="navigation">
          <div class="na-icon">
            <img src="./images/mine_icon_win@2x.png"/>
            <p>邀请加群</p>
          </div>
          <div class="na-icon">
            <img src="./images/mine_icon_location@2x.png"/>
            <p>位置</p>
          </div>
          <div class="na-icon">
            <img src="./images/mine_icon_introduce@2x.png"/>
            <p>介绍</p>
          </div>
          <div class="na-icon">
            <img src="./images/icon_share_n@2x.png"/>
            <p>分享</p>
          </div>
          <div class="na-icon">
            <img src="./images/mine_community_management@2x.png"/>
            <p>管理</p>
          </div>
        </div>
        <div class="navigation">
          <div class="message">
            <img src="./images/mine_icon_release_n@2x.png"/>
            <p>发布内容</p>
          </div>

          <div class="message">
            <img src="./images/mine_icon_chatroom_n@2x.png"/>
            <p v-text="gpHomeHeader.chatRoomNum"></p>
          </div>

          <div class="message">
            <img src="./images/mine_icon_liveroom_n@2x.png"/>
            <p v-text="gpHomeHeader.vedioRoomNum"></p>
          </div>
        </div>
        <div class="cut-off"></div>
        <div class="cut">
          <div class="label-cut">
            <div class="label"><span class="active" data-index="0">动态</span></div>
            <div class="label"><span class="active" data-index="1">视频</span></div>
            <div class="label"><span class="active" data-index="2">图片</span></div>
            <div class="label"><span class="active" data-index="3">文章</span></div>
          </div>
        </div>
        <template v-for="i in data">
          <div class="">
            <div class="theme">
              <div class="touxiang">
                <img  :src="i.photo" />
              </div>
              <div class="name">
                <span v-text="i.nickName"></span>
              </div>
              <div class="ty-label">
                <div class="ty">
                  <!--<mt-badge size="small" v-for="label in i.label" v-text="label"></mt-badge>-->
                  <span v-for="label in i.label" v-text="label"></span>
                </div>
              </div>
              <div  class="time">
                <span style="color: #b7b7b7">{{ i.createTime|transformTime }}</span>
              </div>
            </div>
            <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" width="100%" height="209px"
                   :poster="i.videopg" data-setup="{}">
              <source :src="i.videoFile" type="video/mp4">
            </video>
            <div class="matter">
              <div class="byline" v-text="i.title"></div>
              <div class="by-matter" v-text="i.content"></div>
            </div>
            <div class="comment">
              <div class="bg-comment">
                <div class="zan">
                  <img src="./images/icon_like_n@2x.png"/>
                  <span v-text="i.thumbCount"></span>
                </div>
                <div class="information">
                  <img src="./images/icon_review_n@2x.png"/>
                  <span v-text="i.commentCount"></span>
                </div>
                <div class="tupian">
                  <img src="./images/icon_collect_n@2x.png"/>
                  <span v-text="i.shareCount"></span>
                </div>
              </div>
              <div class="share">
                <img src="./images/icon_share_n@2x.png"/>
              </div>
            </div>
            <!--<div class="discuss">-->
            <!--<div>-->
            <!--<img src="../static/images/136609241591974054.png"/>-->
            <!--<span class="username">李玉刚</span>-->
            <!--<span>回复了</span>-->
            <!--<span class="reply">3条回复</span>-->
            <!--</div>-->
            <!--<div>-->
            <!--<span class="all">全部展开</span>-->
            <!--</div>-->
            <!--</div>-->
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
    data() {
      return {
        data: [],
        gpHomeHeader: {}
      }
    },
    methods: {
      fetchDatas() {
        let _this = this;
        let userId = this.$route.query.userId;
        let gpId = this.$route.query.gpId;
//      this.$http.get('/web/gp/gpHomePage.do?userId=139&gpId=201').then(function(body) {
        this.$http.get('/web/gp/gpHomePage.do?userId='+userId+'&gpId='+gpId+'').then(function(body) {
          _this.gpHomeHeader.coverImage = `http://imageg.myeyed.cn/${body.data.result.gpHomeHeader.coverImage}`;
          _this.gpHomeHeader.logo = `http://imageg.myeyed.cn/${body.data.result.gpHomeHeader.logo}`;
          _this.gpHomeHeader.gpName = `${body.data.result.gpHomeHeader.gpName}`;
          _this.gpHomeHeader.chatRoomNum = `${body.data.result.gpHomeHeader.chatRoomNum}个聊天室`;
          _this.gpHomeHeader.vedioRoomNum = `${body.data.result.gpHomeHeader.vedioRoomNum}个直播室`;
          _this.gpHomeHeader.noticeNum = `${body.data.result.gpHomeHeader.noticeNum}`;
          body.data.result.listGpVedio.map(function(item) {
            item.videoFile = `http://videop.myeyed.cn/${item.videoFile}`;
//          item.label = `#${item.label}`;
            item.photo = `http://imagep.myeyed.cn/${item.photo}`;
            console.log(item.photo);
            item.videopg = `${item.videoFile.replace('.mp4','.png')}`;
            let newLabel = item.label.split(",");
            for(let i = 0;i<newLabel.length;i++) {
              newLabel[i] = `#${newLabel[i]}`;
            }
            item.label = newLabel;
          })
          _this.data = body.data.result.listGpVedio;
        })
//      this.data = [{name: "啦啦啦"},{name: "哈哈哈"},{name: "呀呀呀"}]
      }
    },
    created() {
      this.fetchDatas();
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
    height: 235px;
    /*background:url("../static/images/136609241591974054.png") no-repeat;*/
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 82px;
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
    font-size: 21px;
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
    top: 117px;
  }
  .photo img{
    width:100%;
  }
  .type{
    color: #777777;
    text-align: center;
    padding-top: 206px;
    font-size: 16px;
  }
  .navigation{
    display: flex;
    border-top:solid 1px  #ececec;
    height: 92px;
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
    width: 30px;
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
  .cut{
    margin-top: 5px ;
    background: #777777;
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
    border-top: 1px solid #f7f7f7;
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
    display: flex;
    flex:1;
    position: absolute;
    top: 52px;
    left: 92px;
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
    margin-left: 15px;
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
    height: 15px;
    background: #ececec;
  }
  .comment img{
    width: 25px;
    height: 25px;
  }
  .navigative{
    margin: 5px 0;
  }
  .ty-label{
    display: flex;
    width: 200px;
  }
  .ty span{
    color: rebeccapurple;
    margin-right: 2px;
    text-align: center;
    width: 59px;
    border-radius: 5px;
    border: 1px solid #ececec;
  }
</style>
