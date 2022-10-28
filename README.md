# 원티드 프리온보딩 프론트엔드 3팀 - Assignment #1

[사전 과제](https://github.com/walking-sunset/selection-task)로 구현한 Todo 앱에 대한 **Best Practice**

> [조은지](https://github.com/Joeunji0119/)(팀장)
> [김창희](https://github.com/PiperChang/) [문지원](https://github.com/moonkorea00/) [박정민](https://github.com/ono212/) [이상민](https://github.com/dltkdals224/) [이지원](https://github.com/365support/) [조수진](https://github.com/suzz-in/) [고영훈](https://github.com/YeonghunKO/)

📆 프로젝트 기간 : 2022년 10월 26일 ~ 2022년 10월 27일

<br />

## 📚 **배포 주소**

📌 [https://todoapp365.netlify.app](https://todoapp365.netlify.app)

> 테스트 계정 <br/>
> 아이디 : test00@test.com 비밀번호 : password!@

<br />

## 🔑 기술 스택 및 사용 라이브러리

<img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26?&style=flat&logo=HTML5&logoColor=white"/><img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6?&style=flat&logo=CSS3&logoColor=white"/><img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E?&style=flat&logo=JavaScript&logoColor=white"/><img alt="React" src ="https://img.shields.io/badge/React-61DAFB?&style=flat&logo=React&logoColor=white"/><img alt="Axios" src ="https://img.shields.io/badge/-Axios-5A29E4?&style=flat&logo=Axios&logoColor=white"/><img alt="React Router Dom" src ="https://img.shields.io/badge/React_Router_DOM-CA4245?&style=flat&logo=ReactRouter&logoColor=white"/>

<img alt="Emotion" src ="https://img.shields.io/badge/Emotion-512BD4?&style=flat&logoColor=white"/><img alt="React-Icons" src ="https://img.shields.io/badge/React_Icons-FF3366?&style=flat&logoColor=white"/><img alt="react-toastify" src ="https://img.shields.io/badge/react_toastify-0ABF53?&style=flat&logoColor=white"/>

<img alt="Git" src ="https://img.shields.io/badge/Git-F05032?&style=flat&logo=Git&logoColor=white"/><img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717?&style=flat&logo=GitHub&logoColor=white"/><img alt="Notion" src ="https://img.shields.io/badge/Notion-000000?&style=flat&logo=Notion&logoColor=white"/>

<br />

## 📖 목차

- [기능 시연 GIF](#-기능-시연-gif)
- [Best Practice 선정 이유](#-best-practice-채택-기준)
- [리팩토링](#-리팩토링)
- [폴더 구조](#-폴더-구조)
- [팀 코드 컨벤션](#-팀-코드-컨벤션)
- [프로젝트 설치 및 실행](#-프로젝트-설치-및-실행)

<br />

## 🌠 기능 시연 GIF

### 로그인 , 회원가입

<img src="https://user-images.githubusercontent.com/86206374/196597041-76df2fad-5b60-4d06-b9d7-d161e55f964c.gif" width="500" height="450"/>

### Todo List

<img src="https://user-images.githubusercontent.com/86206374/196597578-733c4e83-6490-4539-b98b-66ce709d7b53.gif" width="500" height="450"/>

### 성능 최적화

<img src="https://user-images.githubusercontent.com/86206374/196598915-73372383-cccb-414a-b16b-78a9f165ffab.gif" width="500" height="450"/>

<br />

## 👍 Best Practice 채택 기준

라이브 코드리뷰로 각자 구현한 코드에 대한 피드백 및 리팩토링 후 Best Practice를 채택했습니다.

- 불필요한 리렌더링 방지로 퍼포먼스 최적화 - useRef, useCallback, useMemo, memo
- 공용 인스턴스 기반 비동기 통신 함수 관리
- 비동기 통신 후 정합성을 고려한 낙관적 업데이트
- 재사용되는 코드는 커스텀 훅으로 분리해서 로직 최소화
- 직관적인 폴더구조
- sourcemap 제거로 내부코드 난독화, 빌드시 메모리 부족 이슈 해결

<br />

## 🔨 리팩토링

- [ ] React Suspense + dynamic import로 lazy loading

- 변경을 하는 부분에서 suspense를 Route 전체를 감싸주어야 하는지, Todo 컴포넌트만 감싸줘야하는지 고민을 했습니다.
  오히려 lazy loading 시 더 느려질 수 있음을 고려하여, Todo 컴포넌트에만 suspense를 적용시켰습니다.

```javascript
const Todo = lazy(() => import("./pages/Todo"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      <Route
        path="/todo"
        element={
          <Suspense fallback={<div css={mainContainer}>...로딩중</div>}>
            <Todo />
          </Suspense>
        }
      />
    </Routes>
  );
}
```

<br />

- [ ] useAuth hook으로 사용자 리다이렉트 처리

- 토큰에 다른 값이 들어갔을 때를 방지하기 위해서 토큰이 맞는지 확인하는 과정입니다. <br/>
  토큰이 맞는지 확인하는 api가 없기 때문에 토큰이 필요한 api에 요청하고 결과에 따라서 처리했습니다.

```javascript
const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      getTodoApi()
        .then((res) => {
          navigate("/todo");
        })
        .catch((err) => {
          navigate("/");
        });
    };
    getData();
  }, []);

  return;
};
```

<br />

- [ ] 컴포넌트 style 관련 디렉토리 개선

- 상태값을 받아와 사용하는 css 가 태그 안에 존재해 보기 힘든 부분이 있어 <br/> emotion/styled를 통해 추출하고 css 파일을 분리해서 확장 가능성이 좋게 수정했습니다.

```js
// TodoItem.jsx
<todoItemStyle.CheckBox isCompleted={list.isCompleted}>
  {list.isCompleted && <MdDone />}
</todoItemStyle.CheckBox>
```

```javascript
export const CheckBox = styled.div`
  border: ${({ isCompleted }) => (isCompleted ? ` 1px solid ${COLOR.White100}` : "")};
`;
```

<br />

- [ ] useValidatedEmail/useValidatedPassword 함수에서 중복되는 로직을 useValidate hook으로 병합

- `useValidate` 커스텀 훅을 사용하여 이메일과 비밀번호의 유효성 검사를 해주었습니다.<br/> 각각 이메일과 비밀번호의 유효성 검사를 할 때 로직을 재사용할 수 있도록 `type`을 인자로 받아 사용할 수 있도록 훅으로 분리했습니다.

> 참고 파일: [useValidate.js](https://github.com/pre-onboarding-frontend-7-team-3/bestTodoApp/blob/main/src/hooks/useValidate.js)

<br />

- [ ] 낙관적 업데이트 context API로 개선

> #### 리팩토링 전

- TodoList 업데이트를 하는 함수가 여러 폴더에 있었습니다.
- `context api` + `useReducer`를 이용해서 업데이트함수를 `todoItem.jsx`로 모았습니다.
  - 한 곳에서 관리하기 때문에 유지보수가 편해졌습니다.
  - props drlling을 하지 않아도 됩니다.

```javascript
// todoList.jsx
const TodoList = () => {
  const todoData = useContext(todoContext);
  const dispatch = useContext(dispatchContext);

  return (
    <ul css={todoWrapper}>
      {todoData?.map((list, id) => (
        <TodoItem key={list.id} list={list} />
      ))}
    </ul>
  );
};

// todoItem.jsx
const TodoItem = ({ list }) => {
  const dispatch = useContext(dispatchContext);

  const handleTodoUpdate = useCallback(
    content => {
      updateTodoApi(content.id, content.todo, content.isCompleted)
        .then(res => {
          dispatch({ type: 'EDIT', todo: res.data });
        })
        .catch(err => {
          console.log('주 에러 : ', err);
        });
    },
    [list, content]
  );
...
}
```

<br />

- [ ] 시멘틱한 마크업

<br />

## 📦 폴더 구조

```
📦 src
├── 📂 api
├── 📂 component
│   ├── 📂 auth
│   │    ├── 📄 Login
│   │    └── 📄 SignUP
│   ├── 📂 todo
│   │    ├── 📄 TodoHeader
│   │    ├── 📄 TodoCreate
│   │    ├── 📄 TodoList
│   │    └── 📄 TodoItem
├── 📂 hooks
├── 📂 pages
│   ├── 📄 auth
│   └── 📄 todo
└── 📂 utils

```

<br />

## 👨‍👨‍👧‍👧 팀 코드 컨벤션

- [ ] git commit message 컨벤션

| 커밋명   | 내용                                        |
| -------- | ------------------------------------------- |
| Feat     | 파일, 폴더, 새로운 기능 추가                |
| Fix      | 버그 수정                                   |
| Docs     | 제품 코드 수정 없음                         |
| Style    | 코드 형식, 정렬, 주석 등의 변경             |
| Refactor | 코드 리팩토링                               |
| Test     | 테스트 코드 추가                            |
| Chore    | 환경설정, 빌드 업무, 패키지 매니저 설정등.. |
| Hotfix   | 치명적이거나 급한 버그 수정                 |

- [ ] branch 컨벤션

| 브랜치명 | 내용                         |
| -------- | ---------------------------- |
| feature  | 파일, 폴더, 새로운 기능 추가 |
| fix      | 버그 수정                    |
| docs     | 제품 코드 수정 없음          |
| refactor | 코드 리팩토링                |
| hotfix   | 치명적이거나 급한 버그 수정  |

<br />

## 👩‍💻 프로젝트 설치 및 실행

1. root 경로에 .env 파일 생성

```
REACT_APP_API_URL=https://pre-onboarding-selection-task.shop
```

2. 프로젝트 패키지 설치

```
npm install
```

3. 프로젝트 실행

```
npm start
```

test
