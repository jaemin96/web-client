# Ducks Pattern

## 기본적인 구조
```javascript
/** 
 * 1. 상태관리로직을 담당하는 reducer(module)들을 포함하는 modules 폴더
 * 2. rootReducer를 포함하는 index
 */ 
./src/redux
└── modules
    └── module1
    └── module2
    └── index
```

### Action (type)
* ducks 구조에서는 action type 정의 시 접두사를 포함  
```javascript
// ./src/redux/modules/module
const ACTION1 = 'module/ACTION1'
```

### Action Creator
* type을 포함한 액션생성함수는 반드시 export 하여야 함
```javascript
// ./src/redux/modules/module
export const action1 = () => ({type: ACTION1});
```

### Reducer
* reducer는 반드시 export default 해줘야 함
```javascript
// ./src/redux/modules/module
export default reducer1 = (state, action) => {
    switch () {
        case TYPE: 
            return {
                ...state
            };
        default:
            return state; 
    }
}
```