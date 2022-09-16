/**
 * @swagger
 * /users/join:
 *   post:
 *     tags:
 *       - users
 *     name: 회원가입
 *     summary: 회원가입
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 닉네임, 메일, 비밀번호 입력
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_nickname:
 *               type: string
 *             user_mail:
 *               type: string
 *             user_pwd:
 *               type: string
 *           example:
 *               {
 *                 user_nickname : "test",
 *                 user_mail : "test",
 *                 user_pwd : "test",
 *                 phone: "010-1234-1234"
 *               }
 *     responses:
 *       '200':
 *         description: 회원가입 완료
 *       '404':
 *         description: 회원가입 실패
 *
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     name: 로컬 로그인
 *     summary: 로컬 로그인
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_mail
 *         in: formData
 *         required: true
 *         type: string
 *       - name: user_pwd
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 로컬 로그인 완료
 *       '404':
 *         description: 로컬 로그인 실패
 *
 * /users/logout:
 *   get:
 *     tags:
 *       - users
 *     name: 로그아웃
 *     summary: 로그아웃
 *     responses:
 *       '200':
 *         description: 로그아웃 완료
 *       '404':
 *         description: 로그아웃 실패
 *
 * /users:
 *   put:
 *     tags:
 *       - users
 *     name: 회원정보 수정
 *     summary: 회원정보 수정
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 닉네임, 메일 입력
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_nickname:
 *               type: string
 *             user_mail:
 *               type: string
 *           example:
 *               {
 *                 user_nickname : "test",
 *                 user_mail : "test",
 *               }
 *     responses:
 *       '200':
 *         description: 회원정보 수정 완료
 *       '404':
 *         description: 회원정보 수정 실패
 *
 *   delete:
 *     tags:
 *       - users
 *     name: 회원탈퇴
 *     summary: 회원탈퇴
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: 회원탈퇴 완료
 *       '404':
 *         description: 회원탈퇴 실패
 *
 *   get:
 *     tags:
 *       - users
 *     name: 회원 정보를 가져옵니다.
 *     summary: 회원 정보를 가져옵니다.
 *     responses:
 *       '200':
 *         description: Get User
 *       '404':
 *         description: fail
 *
 * /users/{user_mail}:
 *   get:
 *     tags:
 *       - users
 *     name: 메일로 회원 정보를 가져옵니다.
 *     summary: 메일로 회원 정보를 가져옵니다.
 *     parameters:
 *       - name: user_mail
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Get User
 *       '404':
 *         description: fail
 *
 * /users/kakao:
 *   get:
 *     tags:
 *       - users
 *     name: 카카오 로그인 -> 카카오톡 홈페이지 이동
 *     summary: 카카오 로그인 -> 카카오톡 홈페이지 이동
 *     responses:
 *       '200':
 *         description: 카카오 로그인 성공
 *       '404':
 *         description: 카카오 로그인 실패
 *
 * /users/kakao/callback:
 *   get:
 *     tags:
 *       - users
 *     name: 카카오톡 홈페이지에서 로그인하고 콜백받아서 돌아옵니다.
 *     summary: 카카오톡 홈페이지에서 로그인하고 콜백받아서 돌아옵니다.
 *     responses:
 *       '200':
 *         description: Get User
 *       '404':
 *         description: fail
 */
