import request from '../../../utils/request'
import PubSub from 'pubsub-js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        list: [],
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo) {
            wx.showToast({
                title: '请登录',
                icon: 'none',
                success: () => {
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                }
            })
        }
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })
        this.getList()
        //订阅来自songDetail的消息
        PubSub.subscribe('getType', (_, type) => {
            let {
                list,
                index
            } = this.data
            if (type == 'prev') {
                (index == 0) && (index = list.length)
                index -= 1
            } else {
                (index == list.length-1) && (index = -1)
                index += 1
            }
            this.setData({
                index
            })
            let id = list[index].id
            PubSub.publish('getId',id)
        })

    },
    async getList() {
        let result = await request('/recommend/songs')
        // console.log(result)
        this.setData({
            list: result.data.dailySongs
        })
    },
    toDetail(event) {
        let {
            song,
            index
        } = event.currentTarget.dataset
        this.setData({
            index
        })


        // console.log(index)
        wx.navigateTo({
            url: '/songPackage/pages/songDetail/songDetail?id=' + song.id,
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