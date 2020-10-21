export const state = () => ({
    historyList: [

    ]
})

export const mutations = {
    addHistory(state, data) {
        // state.historyList.unshift(data)
        // 先判断是否存在一样的数据，如果不存在在进行添加
        let isUnique = true
        state.historyList.forEach(history => {
            if (
                history.departCity == data.departCity &&
                history.departCode == data.departCode &&
                history.destCity == data.destCity &&
                history.destCode == data.destCode &&
                history.departDate == data.departDate
            ) {
                isUnique = false
            }
        })
        if (isUnique) {
            state.historyList.unshift(data)
        }
    }
}