import request from '../../../utils/request'

import PubSub, {
    publish
} from 'pubsub-js'
import moment from 'moment'
const appInstance = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        song: {},
        id: '',
        link: '',
        now: '00:00',
        end: '00:00',
        currentWidth: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        // console.log(options)
        let id = options.id
        this.setData({
            id
        })
        this.getSong(id)

        //判断当前页面是否在播放
        if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId == id) {
            this.setData({
                isPlay: true
            })
        }

        this.manage = wx.getBackgroundAudioManager()
        this.manage.onPlay(() => {
            this.changePlay(true)
            appInstance.globalData.musicId = id
        })
        this.manage.onPause(() => {
            this.changePlay(false)
        })
        this.manage.onStop(() => {
            this.changePlay(false)
        })
        this.manage.onTimeUpdate(() => {
            // console.log(this.manage.currentTime,this.manage.duration)
            let now = moment(this.manage.currentTime * 1000).format('mm:ss')
            let currentWidth = this.manage.currentTime / this.manage.duration * 450
            this.setData({
                now,
                currentWidth
            })

        })
        this.manage.onEnded(() => {
            this.manage.stop()

            PubSub.publish('getType', 'next')
            PubSub.subscribe('getId', (_, id) => {
                this.setData({
                    id,
                    isPlay: true
                })
                // console.log(id)
                this.getSong(id)
                this.musicControl(this.data.isPlay)
                PubSub.unsubscribe('getId')
                this.setData({
                    currentWidth: 0
                })
            })

        })
    },
    async getSong(id) {
        let result = await request('/song/detail', {
            ids: id
        })
        let end = moment(result.songs[0].dt).format('mm:ss')
        this.setData({
            song: result.songs[0],
            end
        })
        wx.setNavigationBarTitle({
            title: this.data.song.name,
        })
    },
    changePlay(isPlay) {
        this.setData({
            isPlay
        })
        appInstance.globalData.isMusicPlay = isPlay
    },
    play() {
        let isPlay = !this.data.isPlay
        let link = this.data.link
        this.musicControl(isPlay, link)
    },
    async musicControl(isPlay, link) {
        // this.setData({
        //     isPlay
        // })

        if (isPlay) {
            if (!link) {
                link = await request('/song/url', {
                    id: this.data.id
                })
                // console.log(link)
                this.setData({
                    link
                })
            }
            //创建控制音乐播放的实例
            this.manage.src = link.data[0].url
            this.manage.title = this.data.song.name
        } else {
            this.manage.pause()
        }
    },
    handleSwitch(event) {
        let type = event.currentTarget.id
        // console.log(type)
        this.manage.stop()
        PubSub.publish('getType', type)
        PubSub.subscribe('getId', (_, id) => {
            this.setData({
                id,
                isPlay: true
            })
            // console.log(id)
            this.getSong(id)
            this.musicControl(this.data.isPlay)
            PubSub.unsubscribe('getId')
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