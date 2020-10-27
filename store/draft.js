export const state = () => ({
    draftArticle: []
})

export const mutations = {
    addArticle(state, data) {
        // 可以做判断, 如果不存在完全一样的数据在进行添加
        let isUnique = true
        state.draftArticle.forEach(draft => {
            if (
                draft.title == data.title &&
                draft.content == data.content &&
                draft.choiceCity == data.choiceCity
            ) {
                isUnique = false
            }
        });

        if (isUnique) {
            state.draftArticle.unshift(data)
        }
    },
    removeArticle(state, index) {
        state.draftArticle.splice(index, 1)
    }
}