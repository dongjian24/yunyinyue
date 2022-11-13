import request from '../../utils/request'
let isSend = false
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchTitle: '',
        list: [],
        value: '',
        songs: [],
        historyList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSearch()
        this.getHistory()
    },
    async getSearch() {
        let result = await request('/search/default')
        let list = await request('/search/hot/detail')
        // console.log(list)
        this.setData({
            searchTitle: result.data.showKeyword,
            list: list.data
        })
    },
    getHistory() {
        let historyList = wx.getStorageSync('history')
        if (historyList) {
            this.setData({
                historyList
            })
        }
    },
    clearSearch() {
        this.setData({
            value: '',
            songs: []
        })
    },
    deleteHistory() {
        wx.showModal({
            content: '确认删除历史记录吗',
            complete: (res) => {
                if (res.cancel) {

                }

                if (res.confirm) {
                    this.setData({
                        historyList: []
                    })
                    wx.removeStorageSync('history')
                }
            }
        })

    },
    changeInput(event) {
        this.setData({
            value: event.detail.value.trim()
        })
        if (isSend) {
            return
        }
        this.getSearchTitle()
        isSend = true
        setTimeout(() => {

            isSend = false
        }, 300);

    },
    async getSearchTitle() {
        if (!this.data.value) {
            this.setData({
                songs: []
            })
            return
        }
        let {
            value,
            historyList
        } = this.data
        let result = await request('/search', {
            keywords: value,
            limit: 10
        })
        // console.log(result)
        this.setData({
            songs: result.result.songs
        })
        if (historyList.indexOf(value) !== -1) {
            historyList.splice(historyList.indexOf(value), 1)
        }
        historyList.unshift(value)
        this.setData({
            historyList
        })
        wx.setStorageSync('history', historyList)
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