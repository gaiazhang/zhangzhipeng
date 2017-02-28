import 'whatwg-fetch'  // 可以引入fetch来进行Ajax

export function itemsHasErrored(bool) {  //加载失败 loading状态
		return {
			type: 'ITEMS_HAS_ERRORED',
			hasErrored: bool
		};
}

export function itemsIsLoading(bool) { //加载成功 loading状态
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) { //数据加载成功 状态
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData (url) { //url数据接口加载功能
		return (dispatch) => {
				dispatch(itemsIsLoading(true)); //触发 loading 的actions
				fetch(url)
		            .then((response) => {
		                if (!response.ok) {
		                    throw Error(response.statusText);
		                }

		                dispatch(itemsIsLoading(false));

		                return response;
		            })
		            .then((response) => response.json())
		            .then((items) => dispatch(itemsFetchDataSuccess(items)))
		            .catch((e) => {
		            	dispatch(itemsHasErrored(true))
		            	console.log(e.message)
		            });	

		}
}