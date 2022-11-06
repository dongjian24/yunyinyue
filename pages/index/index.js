// pages/index/index.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banners: [],
        personalized: [],
        list: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let resultB = await request('/banner', { type: 2 })
        this.setData(
            { banners: resultB.banners }
        )
        let resultR = await request('/personalized', { limit: 10 })
        // console.log(resultR)
        this.setData(
            { personalized: resultR.result }
        )
        let index = 0;
        let resultArr = []
        while (index < 5) {
            let resultL = await request('/top/list', { idx: index++ })
            let listItem = {
                name: resultL.playlist.name,
                items: resultL.playlist.tracks.slice(0, 3)
            }
            resultArr.push(listItem)
            //不需要五次请求全部完成
            this.setData(
                { list: resultArr }
            )
        }

        // console.log(resultArr)
        //长时间白屏 体验差
        // this.setData(
        //     { list: resultArr }
        // )

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