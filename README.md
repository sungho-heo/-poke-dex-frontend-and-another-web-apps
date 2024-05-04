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
