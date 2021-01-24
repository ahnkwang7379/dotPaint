<h1 align="center">Dot Art</h1>

<p align="center">
  <img src="./frontend/screenshots/jellyppi.gif" width="216px"/>
</p>


## Div를 이용해 도트를 찍어보자
Div와 CSS를 이용해 도트를 찍는 앱입니다.
CSS의 box-shadow와 keyframes를 이용해 도트 그림으로 만들 수 있습니다.

귀여운 젤리가 그려진 데모 사이트 [직접 해보러 가기](https://ahnkwang7379.github.io/dotArt/) :pencil2: 
<p align="center"> 
  <img src="./frontend/screenshots/jellyppi.png" width="700px"/> 
</p>

간단한 도트 툴 지원과 레이어 나누기 합치기, 프레임의 순서를 바꾸거나 개인용 색상 팔레트를 만드는 것도 가능합니다. 작업에 편의를 더해줄 각종 단축키도 지원합니다.

그리고 자신의 작업물을 png나 gif 또는 sprite 형식으로 다운받을 수 있습니다. 심지어 웹사이트에서 사용 가능한 CSS 코드로 뽑아낼 수 있죠.
애니메이션 효과는 interval을 조절해 각 프레임 별 비중을 다르게 줄 수 있습니다.

그 외에도 localStorage를 이용해 저장과 불러오기가 가능하며, 작업물을 .dotart파일로 저장하여 다른 곳에서 import해 작업을 이어나갈 수 있습니다



## 설치
frontend 폴더에서
```
yarn install
```

## 실행
frontend 폴더에서
```
yarn start
```

## 기술 스택

- [react](https://facebook.github.io/react/)
- [redux](http://redux.js.org/)
- [redux-actions](https://redux-actions.js.org/)
- [style-components](https://styled-components.com/)
- [immer](https://immerjs.github.io/immer/docs/introduction)
