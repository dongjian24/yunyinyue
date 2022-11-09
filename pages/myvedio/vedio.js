// pages/myvedio/vedio.js
import request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoList: [],
        flag: '',
        videoGroup: [],
        videoId: '',
        videoUpdateTime: [],
        isTriggered: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getVideoList()
        this.getVideoGroup(this.data.flag)
    },
    async getVideoList() {
        let result = await request('/video/group/list')
        // console.log(result)
        this.setData({
            videoList: result.data.slice(0, 14),
            flag: result.data[0].id
        })
    },
    changeNav(event) {
        // let flag = event.currentTarget.id
        let flag = event.currentTarget.dataset.id

        this.setData({
            flag,
            videoGroup: []
        })
        wx.showLoading({
            title: '正在加载',
        })
        this.getVideoGroup(this.data.flag)
    },
    handlePlay(event) {
        let vid = event.currentTarget.id
        //this.vid !== vid && this.videoContext && this.videoContext.stop()
        //this.vid = vid
        this.videoContext = wx.createVideoContext(vid)
        this.setData({
            videoId: vid
        })
        let {
            videoUpdateTime
        } = this.data
        let videoItem = videoUpdateTime.find(item => {
            item.id == event.detail.currentTime
        })
        if (videoItem) {
            this.videoContext.seek(videoUpdateTime.time)
        }
        this.videoContext.play()
        // console.log(vid)
    },
    async getVideoGroup(flag) {
        if (!flag) {
            return
        }
        let result = await request('/video/group', {
            id: flag
        })
        // console.log(result)
        wx.hideLoading()
        let index = 0
        let list = result.datas.map(item => {
            item.id = index++
            return item
        })
        this.setData({
            videoGroup: list,
            isTriggered: false
        })
    },
    handleUpdateTime(event) {
        console.log(event)
        let videoObj = {
            id: event.currentTarget.id,
            time: event.detail.currentTime
        }
        let {
            videoUpdateTime
        } = this.data
        let videoItem = videoUpdateTime.find(item => {
            item.id == event.detail.currentTime
        })
        if (videoItem) {
            videoItem.time = videoObj.time
        } else {
            videoUpdateTime.push(videoObj)
        }
        this.setData({
            videoUpdateTime
        })
    },
    handleRefresher() {
        this.getVideoGroup(this.data.flag)
    },
    handleTolower() {
        let newVideoList = [{
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_FAE6C58EA2AFC0F4FAAAD0D926D8402E",
                    "coverUrl": "https://p1.music.126.net/uvUqDqKZrYNT29Ul3o_zGw==/109951163574243730.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "迈克尔·杰克逊这段表演太帅了，每次看都让人热血沸腾",
                    "description": "帅到窒息！迈克尔·杰克逊《They Don't Care About Us》震撼现场，每次看都让人热血沸腾！",
                    "commentCount": 735,
                    "shareCount": 1475,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 46678509
                        },
                        {
                            "resolution": 480,
                            "size": 80279992
                        },
                        {
                            "resolution": 720,
                            "size": 99680765
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 340000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 340100,
                        "birthday": -2209017600000,
                        "userId": 479954154,
                        "userType": 207,
                        "nickname": "音乐诊疗室",
                        "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 18499283139231828,
                        "backgroundImgId": 1364493978647983,
                        "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "音乐资讯达人"
                        },
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "18499283139231828",
                        "backgroundImgIdStr": "1364493978647983"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 9102,
                            "name": "演唱会",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1921911340_I6UgkDrF.webp?wsSecret=b982578f1ca53226d02c9104315975e6&wsTime=1667918189",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "They Don't Care About Us",
                        "id": 1698421,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 38853,
                            "name": "Michael Jackson",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 95,
                        "st": 0,
                        "rt": "600902000006888009",
                        "fee": 8,
                        "v": 51,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 172259,
                            "name": "HIStory: Past, Present and Future, Book I",
                            "picUrl": "http://p4.music.126.net/GtZLLolNwCn07Ke-HZxX1Q==/109951165994661423.jpg",
                            "tns": [],
                            "pic_str": "109951165994661423",
                            "pic": 109951165994661420
                        },
                        "dt": 284212,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 11368533,
                            "vd": -38248
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 6821137,
                            "vd": -35773
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 4547439,
                            "vd": -34348
                        },
                        "a": null,
                        "cd": "2",
                        "no": 2,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "cp": 7001,
                        "mv": 307053,
                        "rurl": null,
                        "mst": 9,
                        "rtype": 0,
                        "publishTime": 1194883200000,
                        "privilege": {
                            "id": 1698421,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "FAE6C58EA2AFC0F4FAAAD0D926D8402E",
                    "durationms": 233546,
                    "playTime": 1556533,
                    "praisedCount": 8584,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_BADB69C523F5A5762C7183A0471DC279",
                    "coverUrl": "https://p1.music.126.net/Ne1H715FuIPlgyqB2fDI2Q==/109951163707642944.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "唱功太了不起了！！",
                    "description": "",
                    "commentCount": 512,
                    "shareCount": 1417,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 12748310
                        },
                        {
                            "resolution": 480,
                            "size": 22188825
                        },
                        {
                            "resolution": 720,
                            "size": 31041154
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 510000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 510100,
                        "birthday": -2209017600000,
                        "userId": 1676816624,
                        "userType": 0,
                        "nickname": "聆听往事如风",
                        "signature": "",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951165647004060,
                        "backgroundImgId": 109951162868126480,
                        "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951165647004069",
                        "backgroundImgIdStr": "109951162868126486"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 4101,
                            "name": "娱乐",
                            "alg": null
                        },
                        {
                            "id": 3101,
                            "name": "综艺",
                            "alg": null
                        },
                        {
                            "id": 75122,
                            "name": "欧美综艺",
                            "alg": null
                        },
                        {
                            "id": 94106,
                            "name": "选秀节目",
                            "alg": null
                        },
                        {
                            "id": 76108,
                            "name": "综艺片段",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2168770943_TMFt2wFA.webp?wsSecret=da618b119792187f7a12f6e6b698a798&wsTime=1667918189",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "Who's Loving You",
                        "id": 4338174,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 129526,
                            "name": "Jackson 5",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 25,
                        "st": 0,
                        "rt": "600902000005244277",
                        "fee": 1,
                        "v": 17,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 438089,
                            "name": "Gold",
                            "picUrl": "http://p4.music.126.net/38ZhU37XmTaLV0J5_ZdGoA==/903798558080750.jpg",
                            "tns": [],
                            "pic": 903798558080750
                        },
                        "dt": 240533,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 9623554,
                            "vd": -77123
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5774150,
                            "vd": -74592
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3849448,
                            "vd": -72655
                        },
                        "a": null,
                        "cd": "1",
                        "no": 2,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "cp": 7003,
                        "mv": 14306006,
                        "rurl": null,
                        "mst": 9,
                        "rtype": 0,
                        "publishTime": 1109606400007,
                        "privilege": {
                            "id": 4338174,
                            "fee": 1,
                            "payed": 0,
                            "st": 0,
                            "pl": 0,
                            "dl": 0,
                            "sp": 0,
                            "cp": 0,
                            "subp": 0,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 0,
                            "toast": false,
                            "flag": 260,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "BADB69C523F5A5762C7183A0471DC279",
                    "durationms": 130239,
                    "playTime": 2167170,
                    "praisedCount": 8671,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_59C09B29C2AEB0D3EC31D1FDD7E9404B",
                    "coverUrl": "https://p1.music.126.net/H-gGzXoSCWzMGl7sBVMz4A==/109951163376317437.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "巅峰期的“浪子”嗓子太好了，一首《谁明浪子心》超好听",
                    "description": "巅峰时期的“浪子”嗓子太好了，王杰一首《谁明浪子心》唱得比CD还好听！",
                    "commentCount": 500,
                    "shareCount": 832,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 21773554
                        },
                        {
                            "resolution": 480,
                            "size": 35599112
                        },
                        {
                            "resolution": 720,
                            "size": 50410196
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 340000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 340100,
                        "birthday": -2209017600000,
                        "userId": 479954154,
                        "userType": 207,
                        "nickname": "音乐诊疗室",
                        "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 18499283139231828,
                        "backgroundImgId": 1364493978647983,
                        "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "音乐资讯达人"
                        },
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "18499283139231828",
                        "backgroundImgIdStr": "1364493978647983"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57105,
                            "name": "粤语现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1720419473_SQgKzACF.webp?wsSecret=051be12e1480a10f3d52a0217aed50af&wsTime=1667918189",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": [
                        108
                    ],
                    "relateSong": [{
                        "name": "谁明浪子心",
                        "id": 158655,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 5358,
                            "name": "王杰",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [
                            "电视剧《还我本色》主题曲"
                        ],
                        "pop": 100,
                        "st": 0,
                        "rt": "600902000005325662",
                        "fee": 1,
                        "v": 42,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 15941,
                            "name": "谁明浪子心",
                            "picUrl": "http://p3.music.126.net/FpXrSX0FHUQFG2l47mlF5w==/109951167350877138.jpg",
                            "tns": [],
                            "pic_str": "109951167350877138",
                            "pic": 109951167350877140
                        },
                        "dt": 301960,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 12081154,
                            "vd": 5447
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 7248710,
                            "vd": 8034
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 4832488,
                            "vd": 9793
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "cp": 7002,
                        "mv": 0,
                        "rurl": null,
                        "mst": 9,
                        "rtype": 0,
                        "publishTime": 623174400000,
                        "privilege": {
                            "id": 158655,
                            "fee": 1,
                            "payed": 0,
                            "st": 0,
                            "pl": 0,
                            "dl": 0,
                            "sp": 0,
                            "cp": 0,
                            "subp": 0,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 0,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "59C09B29C2AEB0D3EC31D1FDD7E9404B",
                    "durationms": 295702,
                    "playTime": 617381,
                    "praisedCount": 3387,
                    "praised": false,
                    "subscribed": false
                }
            }
        ]
        let videoGroup = this.data.videoGroup
        videoGroup.push(...newVideoList)
        this.setData({
            videoGroup
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})