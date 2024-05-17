# First

## Greetings

### typescript use React.FC 타입 지정은 사용해도 되긴하나 defaultProps를 사용할때 인식을 못하기 때문에 사용하지 않는게 편하다고 생각한다. 불필요하게 코드 길이도 늘어나기도 하고.

## Counter

### Counter를 통해서 Generics에 대한것을 알게됨. Generics는 여러가지 타입을 사용하는 경우에 쓰는 문법인데, 데이터의 타입이 명확하지 않은 경우에 사용하게되며 예시로 number가 들어가야하는지 array.length인지 확실하지 않은경우가 있음. 처음에 any타입과 많이 유사해서 같은 동작을 하는줄 알았는데 명확한 차이점이 있다. 데이터 타입의 반환정보를 알고있느냐 모르냐의 차이인데 이게 typescript에서 타입을 지정해주고 명확한 타입의 값을 받는게 중요하기 떄문에 알고있는게 개발하는데 많은 도움을 준다.

## MyForm

### MyForm을 통해서 typescript에서 Form 이벤트의 작동방식과 Event의 타입을 확인하는 방법을 알게되었음. event의 타입은 자신이 사용하는 event에 임의로 함수를 넣어서 거기에 마우스 커서를 위에 올리면 어떤 type인지 확인이 가능하기에 any로 타입을 작성할 필요없다.

## useReducer

### useReducer는 각 상태를 스위치하게되는 경우 많이 사용하게되는 문법으로 boolean 타입이면 true false 성별이면 남성 여성 이런식의 타입인 값을 사용하게될때 유용하게 사용을 할듯하다. 텍스트 값이나 숫자 값에는 별로인듯하다.

## SampleContext

### useReducer를 처음 사용한 ReducerSample을 더 사용하기 편리하고 관리하기 편하게 작성하는 것이다. Context안에 상태를 조회시 그리고 새로운 액션을 dispatch 해야하는경우 자동완성이 되어서 개발 생산성을 많이 높여준다.

## Redux

### CounterContainer => Redux를 사용해서 Counter기능 웹을 구현 그냥 Counter 를 일일히 type설정하고 interface를 설정할떄보다 생산성이 빨라짐. 각 모듈에 맞춰서 관리하다보니 코드 가독성도 좋아짐.

## Counter

### Counter를 제작하는데 typesafe-actions 라이브러리를 사용해서 리펙토링 또한 진행을 하는중 리듀서를 사용해서 제작하였음. todo또한 Reducer를 사용해서 제작함. pullrequset에서 확인하면서 변경점 및 차이를 보면 좋을듯함.

#### 메서드 체이닝 방식을 사용중에 왜 사용하는지 아직모르나 하나가 실행되면 사슬처럼 연결되서 실행되는 방식이라 체이닝이라 하는듯하다. 사용해본 결과 불필요한 타입 작성을 줄여주고 개발하는 시간이 줄어들어서 리팩토링 필요한 경우 사용하면 좋은듯하다. 가독성은 조금 안좋지만.

## Todo

### 똑같이 typesafe-actions를 사용해서 리펙토링을 진행하였음. counter에 비해서 줄어든것은 큰게 없는것 같지만 확실히 많은 코드를 작성한것을 줄이는데 좋은듯함. 필요하다면 사용하는게 좋을듯함.

### todos폴더를 생성 todos.ts 모듈파일 코드길이가 길어서 각각 하나의 기능을 하는 todos폴더에 reducer,types,actions파일등을 만들어서 모듈화함. 가독성이 더 좋아졌다. index.ts는 해당 폴더의 모듈등을 기본적으로 읽어오게끔 default모듈 파일역할인것 같다. 더 조사해봐야함.

## gihub

### github api를 사용하면서 thunk에 대해서 middleware 사용하는데 전체적으로 Types,counter 설계와 비슷하나 middleware인 thunk를 사용해서 구현중입니다.

## redux-thunk

### 나쁘지 않은 미들웨어 라이브러리이나 현재 redux-tookit으로 변경중이며 redux-thunk에 사용되는 것은 거의 권장 하지 않는다고한다.

## redux-saga

### reudux-thunk보다 쉬운 방법인듯하다. saga를 사용하는것은 나쁜 방법은 아니나. 현재 github action을 작성한 모듈에서 undifinded로 했던것을 any로 변경해서 모든 타입을 했으나, saga를 사용하기위해서는 타입을 미리 지정을 해줘야해서 이래저래 다른 api를 불러오게 된다면 재사용성에서 좋지않은 리펙토링인듯하다. 좀더 saga에 알아봐야하겠지만.
