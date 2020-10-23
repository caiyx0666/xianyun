export const state = () => ({
    historyList: []
})

export const mutations = {
    addHistory(state, data) {
        // 可以做判断, 如果不存在完全一样的数据在进行添加
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
        });

        if (isUnique) {
            state.historyList.unshift(data)
        }
    }
}