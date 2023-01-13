
## 라이브러리 및 프로젝트 특징

- Typescript
- Styled-components
- Nextjs
- React-query
- Recoil/Redux
- Free design pattern (Feature Folders recommended) [참고](http://robinwieruch.de/react-folder-structure)
  - 특징이 비슷한 컴포넌트(specific feature related components)를 일반 UI 컴포넌트와 따로 분리하는 구조
    = 재사용 가능한 컴포넌트(e.g. Button)와 특정 기능 관련 컴포넌트(e.g. Message)를 분리
  - feature 컴포넌트에는 재사용 컴포넌트가 다시 사용될 수 있으며 필요하다면 service 관련 도메인 로직도 추가


## 과제 범위

   - 표기되어야 하는 정보
     - [x] 고객명(user_name) : 고객ID 를 참조하여 실제 이름으로 보여져야 합니다.
       - 고객명을 누를 경우 사용자 상세화면으로 이동합니다.
     - [x] 브로커명(broker_name) : 예시) OO증권, `brokers.json` 를 참조하여 실제 이름으로 보여져야 합니다.
     - [x] 계좌번호(number) : 앞 뒤 각각 두글자를 제외하고 나머지는 글자수에 맞게 `*` 글자로 마스킹 처리가 필요합니다.
     - [x] 계좌상태(status) : 예시) 운용중, `accountStatus.json` 를 참조하여 실제 이름으로 보여져야 합니다.
     - [x] 계좌명(name) : 계좌명입니다.
     - [x] 평가금액(assets) : 예시) 123,123,123
     - [x] 입금금액(payments) : 예시) 123,123,123
     - [x] 계좌활성화여부(is_active) : 계좌 활성화 여부
     - [x] 계좌개설일(created_at) :
   - 구현되어야 하는 기능
     - [ ] 목록에서는 브로커명, 계좌 활성화 여부, 계좌 상태를 필터링 할 수 있어야 합니다.
     - [ ] 리스트 페이지에서는 검색이 가능해야 합니다.
       - `json-server` 의 Full-text Search API 를 사용하여 구현합니다.
       - 예시 : GET [http://localhost:3000/accounts?q=South](http://localhost:3000/accounts?q=South)
     - [x] 페이지네이션이 되어야 합니다.
       - `json-server` 의 Paginate API 를 사용하여 구현합니다.
       - 예시 : GET [http://localhost:3000/accounts?\_page=2&\_limit=20](http://localhost:3000/accounts?%5C%5C_page=2&%5C%5C_limit=20)

