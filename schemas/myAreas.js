/**
 * @swagger
 * /myAreas:
 *   post:
 *     tags:
 *       - myAreas
 *     name: 동네를 등록합니다.
 *     summary: 동네를 등록합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 동네 검색에서 동네명 클릭하면 등록
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             area_id:
 *               type: number
 *           example:
 *               {
 *                 area_id : "test"
 *               }
 *     responses:
 *       '200':
 *         description: 동네등록 완료
 *       '404':
 *         description: 동네등록 실패
 *
 * /myAreas/{user_id}:
 *   get:
 *     tags:
 *       - myAreas
 *     name: user_id로 회원 동네 검색
 *     summary: user_id로 회원 동네 검색
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: 등록한 동네 가져오기 완료
 *       '404':
 *         description: 등록한 동네 가져오기 실패
 */
