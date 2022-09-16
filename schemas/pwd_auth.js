/**
 * @swagger
 * /pwdAuth/find/password:
 *   post:
 *     tags:
 *       - pwdAuth
 *     name: 비밀번호 찾기(변경)
 *     summary: 비밀번호 찾기(변경)
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 입력한 메일이 DB에 없으면 "The mail is incorrect." 에러 뜸
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                   "user_mail" : "mojaeya@gmail.com"
 *               }
 *     responses:
 *       '200':
 *         description: 비밀번호 찾기 신청(이메일로 url 전송) 완료
 *       '404':
 *         description: 비밀번호 찾기 신청(이메일로 url 전송)실패
 *
 * /pwdAuth/reset/password/{token}:
 *   post:
 *     tags:
 *       - pwdAuth
 *     name: 새로운 비밀번호 설정
 *     summary: 새로운 비밀번호 설정
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 새로운 비밀번호 설정 유효기간 10분!
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                   "user_pwd" : "1234"
 *               }
 *     responses:
 *       '200':
 *         description: 새로운 비밀번호 설정 완료
 *       '404':
 *         description: 새로운 비밀번호 설정 실패
 */
