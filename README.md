# Window 98 Todo-list
윈도우 98 테마 디자인의 투두리스트 프로젝트
<br />
<br /> 
<img width="500" alt="스크린샷 2024-09-22 오후 9 34 23" src="https://github.com/user-attachments/assets/c393163e-f959-4c1f-98f3-06e391411ddb">
<br />
<br />
<br />
<br />
## Use Skills
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![js](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
<br />
![js](https://img.shields.io/badge/JSON%20Server-640D5F)
![js](https://img.shields.io/badge/React%20Query-D91656)
![js](https://img.shields.io/badge/Axios-384B70)
![js](https://img.shields.io/badge/Zustand-FF6600)
![js](https://img.shields.io/badge/Dayjs-6439FF)
![js](https://img.shields.io/badge/React%20Hook%20Form-6EC207)
![js](https://img.shields.io/badge/Zod-C96868)
<br />
<br />
<br />
<br />
## How To Start?
1. 첫번째 터미널에 `yarn build` 명령어 실행시 **eslint + build + JSON server start** 명령어가 동시에 실행됩니다.
2. 새로운 두번째 터미널에 `yarn start` 명령어로 프로젝트를 실행합니다.
3. [http://localhost:3001/](http://localhost:3001/) 경로로 브라우저를 실행합니다.
   <br />
   <br />
   <br />
   <br />
## 0. Apps
  <img width="251" alt="스크린샷 2024-09-22 오후 10 09 39" src="https://github.com/user-attachments/assets/790649e0-e498-467e-af9f-72f3f3b8fc6c"> <br />
- **휴지통** : 삭제된 리스트들이 담긴 페이지 <br />
- **Internet** : [MCM-JS DOCS](https://mcm-js.site/) 페이지 <br />
- **Github** : 현재 Repository 페이지 <br />
- **Todo-List** : 등록한 리스트 조회, 등록, 삭제, 수정 페이지 <br />
  <br />
  <br />
  <br />
  <br />
## 1-1. Todo-List 홈
**Todo-List** 아이콘 및 제목을 클릭하면 리스트 관련 페이지로 이동합니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 25 00" src="https://github.com/user-attachments/assets/0c35e242-03db-4f63-b3ad-1710b30b798f">
  <br />
  <br />
  <br />
  <br />
## 1-2. Todo-List 등록
오른쪽 상단의 **New List**를 클릭해 등록창을 실행할 수 있습니다. <br />
제목과 내용 입력 후, 등록 버튼을 클릭하면 새로운 리스트를 등록할 수 있습니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 27 45" src="https://github.com/user-attachments/assets/a97acbf9-7892-4d16-90fb-120e8f2b6271">
  <br />
  <br />
  <br />
  <br />
## 1-3. Todo-List 조회
새롭게 등록된 리스트가 있다면, **등록순**으로 리스트가 조회됩니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 30 09" src="https://github.com/user-attachments/assets/f3feef0e-fcdd-4e78-8553-2d224538521f">
  <br />
  <br />
  <br />
  <br />
## 1-4-1. Todo-List 수정
리스트의 오른쪽에 있는 **수정** 버튼을 클릭하면 제목 및 내용 수정창이 실행됩니다. <br />
제목과 내용 수정 후, 수정 버튼을 클릭하면 변경된 내용으로 리스트가 수정됩니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 35 00" src="https://github.com/user-attachments/assets/62d488c0-aead-422f-bfab-f586def7af70">
  <br />
  <br />
  <br />
  <br />
## 1-4-2. Todo-List 수정 시 이탈 감지
기존의 내용과 **변경된 내용이 있는 상태**에서, 우측 상단의 닫기 버튼을 클릭하면 이탈 확인창이 새롭게 실행됩니다. <br />
수정창을 종료하려면 **확인** 버튼을 클릭해 수정창을 종료시킬 수 있습니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 39 43" src="https://github.com/user-attachments/assets/efeafcdd-8e9c-495f-8a8a-b12a55d231a7">
  <br />
  <br />
  <br />
  <br />
## 1-5. Todo-List 완료 체크
조회된 리스트의 체크박스를 클릭하면 **완료 상태**를 toggle 할 수 있습니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 43 32" src="https://github.com/user-attachments/assets/3e0b950b-1bd0-4961-a423-a775b3fca22b">
  <br />
  <br />
  <br />
  <br />
## 1-6. Todo-List 상세 페이지
조회된 리스트의 **제목 영역**을 클릭하면, 리스트의 상세 페이지로 이동할 수 있습니다. <br />
상세 페이지에서도 동일하게 수정 및 삭제 기능을 제공합니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 45 31" src="https://github.com/user-attachments/assets/56711fda-3ee0-4a83-bcf0-7c6a590ef291">
  <br />
  <br />
  <br />
  <br />
## 1-7. Todo-List 삭제
리스트 우측의 **삭제 버튼**을 클릭하면, 삭제 여부에 관한 확인창이 실행됩니다. <br />
확인창의 **확인** 버튼을 클릭하면, 리스트가 삭제됩니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 48 01" src="https://github.com/user-attachments/assets/30933bab-d565-42de-966e-045c1a16fa71">
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
## 2-1. 휴지통 홈
**휴지통** 페이지에서는 삭제된 리스트들만 조회할 수 있습니다. <br />
조회된 삭제 리스트는 다시 **Todo-List** 페이지로 복원하거나, 완전히 삭제할 수 있습니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 51 01" src="https://github.com/user-attachments/assets/647ee5d6-3785-499f-8aa2-49625eb020c5">
  <br />
  <br />
  <br />
  <br />
## 2-2. 삭제 리스트 체크
복원 및 비우기 기능을 사용하기 위해 **상단의 체크박스** 및 각각의 리스트의 체크박스를 선택합니다. <br />
상단의 체크박스를 클릭하면 **전체 리스트를 선택하거나 해제**할 수 있습니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 53 14" src="https://github.com/user-attachments/assets/f1cbf064-1b59-4e72-98a3-bd5bd62b4d9f">
  <br />
  <br />
  <br />
  <br />
## 2-3. 삭제 리스트 복원
복원할 삭제 리스트들을 체크한 후, 오른쪽 상단의 **선택 복원** 버튼을 클릭하면 복원 여부 확인창이 실행됩니다. <br />
확인 버튼을 클릭하면, 해당 리스트들을 모두 **Todo-List** 페이지로 이동시킬 수 있습니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 10 58 27" src="https://github.com/user-attachments/assets/3b7b849d-90ca-4669-a3d8-808ffb4472df">
<img width="500" alt="스크린샷 2024-09-22 오후 11 00 04" src="https://github.com/user-attachments/assets/8e9e7408-d651-40cd-89a2-54fd923549e6">
  <br />
  <br />
  <br />
  <br />
## 2-4. 삭제 리스트 비우기
비우기를 실행할 리스트들을 체크한 후, 오른쪽 상단의 **선택 비우기** 버튼을 클릭하면 비우기 여부 확인창이 실행됩니다. <br />
확인 버튼을 클릭하면, 해당 리스트들이 **완전히 삭제** 됩니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 11 01 53" src="https://github.com/user-attachments/assets/1dad05a1-d311-4b15-97f6-d699f5a2a673">
<img width="500" alt="스크린샷 2024-09-22 오후 11 02 21" src="https://github.com/user-attachments/assets/f3c8d35d-2386-465b-bc4d-6b912143379d">
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
## 3. 에러 처리 페이지
유효하지 않는 페이지이거나(**404**) **API 에러 발생시**, 블루스크린 테마의 오류 화면이 실행됩니다. <br />
블루스크린 화면을 클릭하면 홈 화면으로 이동합니다. <br /> <br />
<img width="500" alt="스크린샷 2024-09-22 오후 11 03 47" src="https://github.com/user-attachments/assets/82fc97f4-b20e-4f65-8a21-fd9de830d1c0">




